import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  DatePicker,
  Alert,
  Spin,
  Empty,
  Statistic,
} from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import moment from "moment";
import Analytics from "../components/Analytics";
import { useApiWithMessage } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import ErrorAlert from "../components/common/ErrorAlert";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./TransactionsPage.css";

const { RangePicker } = DatePicker;
const { Search } = Input;

// Constants
const VIEW_TYPES = {
  TABLE: "table",
  ANALYTICS: "analytics",
};

const FREQUENCY_OPTIONS = [
  { value: "7", label: "LAST 1 Week" },
  { value: "30", label: "LAST 1 Month" },
  { value: "365", label: "LAST 1 Year" },
  { value: "custom", label: "Custom" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "ALL" },
  { value: "Income", label: "INCOME" },
  { value: "Expense", label: "EXPENSE" },
];

const TRANSACTION_CATEGORIES = [
  "Income in Salary",
  "Income in Part Time",
  "Income in Project",
  "Income in Freelancing",
  "Income in Tip",
  "Expense in Stationary",
  "Expense in Food",
  "Expense in Movie",
  "Expense in Bills",
  "Expense in Medical",
  "Expense in Fees",
  "Expense in TAX",
];

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [frequency, setFrequency] = useState("365");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState(VIEW_TYPES.TABLE);
  const [editable, setEditable] = useState(null);
  const [transactionError, setTransactionError] = useState(null);
  const [form] = Form.useForm();

  const { request, loading } = useApiWithMessage();

  // Get all transactions - must be defined first
  const getAllTransactions = useCallback(async () => {
    setTransactionError(null);
    const result = await request(
      {
        url: "/api/v1/transections/get-transection",
        method: "POST",
        data: {
          frequency,
          selectedDate,
          type,
        },
        requiresAuth: true,
      },
      {
        showSuccess: false,
        showError: false,
      }
    );

    if (result.error) {
      setTransactionError(result.error);
      return;
    }

    if (result.data?.transactions) {
      setAllTransection(result.data.transactions);
      setFilteredTransactions(result.data.transactions);
      setSearchValue(""); // Clear search when data is refreshed
    }
  }, [frequency, selectedDate, type, request]);

  // Fetch transactions when filters change
  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, selectedDate, type]);

  // Delete handler - must be defined before columns
  const deleteTransaction = useCallback(
    async (record) => {
      const result = await request(
        {
          url: `/api/v1/transections/delete-transection/${record.transactionId}`,
          method: "POST",
          data: {},
          requiresAuth: true,
        },
        {
          successMessage: "Transaction deleted successfully",
          errorMessage: "Unable to delete transaction",
        }
      );

      if (!result.error) {
        getAllTransactions();
      }
    },
    [request, getAllTransactions]
  );

  const handleDelete = useCallback(
    (record) => {
      Modal.confirm({
        title: "Are you sure you want to delete this transaction?",
        okText: "Delete",
        okType: "danger",
        onOk: () => deleteTransaction(record),
      });
    },
    [deleteTransaction]
  );

  // Table columns
  const columns = useMemo(() => [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => (
        <span style={{ fontWeight: 600, color: '#6b7280' }}>
          {index + 1}
        </span>
      ),
      width: 70,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span className="date-cell">
          {moment(text).format("MMM DD, YYYY")}
        </span>
      ),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <div className={`amount-cell ${record.type.toLowerCase()}`}>
          {record.type === "Income" ? "+" : "-"}
          ₹{parseFloat(amount).toLocaleString("en-IN")}
        </div>
      ),
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span className={`transaction-type-badge ${type.toLowerCase()}`}>
          {type === 'Income' ? <RiseOutlined /> : <FallOutlined />}
          {type}
        </span>
      ),
      filters: [
        { text: 'Income', value: 'Income' },
        { text: 'Expense', value: 'Expense' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="category-badge">
          {category}
        </span>
      ),
    },
    {
      title: "Reference",
      dataIndex: "refrence",
      key: "refrence",
      render: (text) => (
        <span style={{ color: '#374151', fontWeight: 500 }}>
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          {text || '-'}
        </span>
      ),
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: 'right',
      width: 120,
      render: (text, record) => (
        <div className="actions-cell">
          <div
            className="action-icon edit"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            title="Edit"
          >
            <EditOutlined />
          </div>
          <div
            className="action-icon delete"
            onClick={() => {
              handleDelete(record);
            }}
            title="Delete"
          >
            <DeleteOutlined />
          </div>
        </div>
      ),
    },
  ], [handleDelete, setEditable, setShowModal]);

  // Update form values when editable changes
  useEffect(() => {
    if (showModal && editable) {
      // Format date for input field (YYYY-MM-DD)
      const formattedDate = editable.date 
        ? moment(editable.date).format('YYYY-MM-DD')
        : '';
      
      form.setFieldsValue({
        ...editable,
        date: formattedDate,
      });
    } else if (showModal && !editable) {
      form.resetFields();
    }
  }, [editable, showModal, form]);

  // Form handling
  const handleSubmit = useCallback(
    async (values) => {
      const isEdit = !!editable;
      const url = isEdit
        ? `/api/v1/transections/edit-transection/${editable.transactionId}`
        : "/api/v1/transections/add-transection";

      const result = await request(
        {
          url,
          method: "POST",
          data: values,
          requiresAuth: true,
        },
        {
          successMessage: `Transaction ${isEdit ? "updated" : "added"} successfully`,
          errorMessage: "Please fill all fields correctly",
        }
      );

      if (!result.error) {
        setShowModal(false);
        setEditable(null);
        form.resetFields();
        getAllTransactions();
      }
    },
    [editable, request, form, getAllTransactions]
  );

  // Search handler - Note: This should ideally work with backend, but keeping as is for now
  const onSearch = useCallback(
    (value) => {
      setSearchValue(value);
      if (!value) {
        setFilteredTransactions(allTransection);
        return;
      }

      const searchLower = value.toLowerCase();
      const filteredData = allTransection.filter((transaction) =>
        Object.values(transaction).some((field) =>
          field?.toString().toLowerCase().includes(searchLower)
        )
      );

      setFilteredTransactions(filteredData);
    },
    [allTransection]
  );

  // Export to excel
  const exportToExcel = useCallback(() => {
    setTransactionError(null);
    if (filteredTransactions.length === 0) {
      setTransactionError("No data available to export.");
      message.warning("No transactions to export");
      return;
    }

    try {
      const exportData = filteredTransactions.map((transaction, index) => ({
        "S.No": index + 1,
        "Date (yyyy-mm-dd)": moment(transaction.date).format("YYYY-MM-DD"),
        "Amount (₹)": transaction.amount,
        Type: transaction.type,
        Category: transaction.category,
        Reference: transaction.refrence,
        Description: transaction.description || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      const currentDate = moment().format("DD-MM-YYYY");
      saveAs(data, `Transactions(${currentDate}).xlsx`);
      message.success("Excel file downloaded successfully");
    } catch (error) {
      setTransactionError("Failed to export data");
      message.error("Failed to export data");
    }
  }, [allTransection]);

  return (
    <>
      <Layout>
        <div className="transactions-page">
          {/* Header Section */}
          <div className="transactions-header">
            <div className="header-content">
              <h1 className="transactions-title">Transactions Manager</h1>
              <p className="transactions-subtitle">
                Track and manage all your financial transactions
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card-mini total">
              <div className="stat-label">
                <UnorderedListOutlined />
                Total Transactions
              </div>
              <div className="stat-value">{filteredTransactions.length}</div>
              <div className="stat-change">
                {allTransection.length} total records
              </div>
            </div>
            <div className="stat-card-mini income">
              <div className="stat-label">
                <RiseOutlined />
                Total Income
              </div>
              <div className="stat-value">
                ₹
                {filteredTransactions
                  .filter((t) => t.type === "Income")
                  .reduce((acc, t) => acc + parseFloat(t.amount), 0)
                  .toLocaleString()}
              </div>
              <div className="stat-change positive">
                {filteredTransactions.filter((t) => t.type === "Income").length}{" "}
                transactions
              </div>
            </div>
            <div className="stat-card-mini expense">
              <div className="stat-label">
                <FallOutlined />
                Total Expense
              </div>
              <div className="stat-value">
                ₹
                {filteredTransactions
                  .filter((t) => t.type === "Expense")
                  .reduce((acc, t) => acc + parseFloat(t.amount), 0)
                  .toLocaleString()}
              </div>
              <div className="stat-change negative">
                {filteredTransactions.filter((t) => t.type === "Expense").length}{" "}
                transactions
              </div>
            </div>
            <div className="stat-card-mini balance">
              <div className="stat-label">
                <WalletOutlined />
                Net Balance
              </div>
              <div className="stat-value">
                ₹
                {(
                  filteredTransactions
                    .filter((t) => t.type === "Income")
                    .reduce((acc, t) => acc + parseFloat(t.amount), 0) -
                  filteredTransactions
                    .filter((t) => t.type === "Expense")
                    .reduce((acc, t) => acc + parseFloat(t.amount), 0)
                ).toLocaleString()}
              </div>
            </div>
          </div>

          <ErrorAlert error={transactionError} onClose={() => setTransactionError(null)} />

          {/* Filters Section */}
          <div className="filters-container">
            <div className="filters-row">
              <div className="filter-group">
                <label className="filter-label">
                  <FilterOutlined /> Frequency
                </label>
                <Select
                  value={frequency}
                  onChange={setFrequency}
                >
                  {FREQUENCY_OPTIONS.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                {frequency === "custom" && (
                  <RangePicker
                    value={selectedDate}
                    onChange={(values) => setSelectedate(values)}
                    style={{ marginTop: '0.5rem' }}
                  />
                )}
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <FilterOutlined /> Type
                </label>
                <Select
                  value={type}
                  onChange={setType}
                >
                  {TYPE_OPTIONS.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <SearchOutlined /> Search
                </label>
                <Input.Search
                  placeholder="Search transactions..."
                  allowClear
                  value={searchValue}
                  onChange={(e) => onSearch(e.target.value)}
                  onSearch={onSearch}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">View</label>
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewData === VIEW_TYPES.TABLE ? 'active' : ''}`}
                    onClick={() => setViewData(VIEW_TYPES.TABLE)}
                    title="Table View"
                  >
                    <UnorderedListOutlined />
                  </button>
                  <button
                    className={`view-btn ${viewData === VIEW_TYPES.ANALYTICS ? 'active' : ''}`}
                    onClick={() => setViewData(VIEW_TYPES.ANALYTICS)}
                    title="Analytics View"
                  >
                    <AreaChartOutlined />
                  </button>
                </div>
              </div>
            </div>

            <div className="actions-row">
              <button
                className="action-btn primary"
                onClick={() => {
                  setEditable(null);
                  form.resetFields();
                  setShowModal(true);
                }}
              >
                <PlusOutlined /> Add New Transaction
              </button>
              <button
                className="action-btn secondary"
                onClick={exportToExcel}
              >
                <ExportOutlined /> Export to Excel
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="table-container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <Spin size="large" tip="Loading transactions..." />
              </div>
            ) : viewData === VIEW_TYPES.TABLE ? (
              filteredTransactions.length === 0 ? (
                <div className="empty-state-container">
                  <div className="empty-state-icon">📊</div>
                  <h3 className="empty-state-title">No Transactions Found</h3>
                  <p className="empty-state-text">
                    {searchValue
                      ? "No transactions match your search criteria"
                      : "Start by adding your first transaction"}
                  </p>
                  {!searchValue && (
                    <button
                      className="action-btn primary"
                      onClick={() => {
                        setEditable(null);
                        form.resetFields();
                        setShowModal(true);
                      }}
                    >
                      <PlusOutlined /> Add Your First Transaction
                    </button>
                  )}
                </div>
              ) : (
                <Table 
                  columns={columns} 
                  dataSource={filteredTransactions}
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => (
                      <span style={{ fontWeight: 600, color: '#374151' }}>
                        Total {total} transactions
                      </span>
                    ),
                    pageSizeOptions: ['5', '10', '20', '50'],
                  }}
                  rowKey="transactionId"
                  className="modern-table"
                  scroll={{ x: true }}
                />
              )
            ) : (
              <Analytics allTransection={filteredTransactions} />
            )}
          </div>

          {/* Modal */}
          <Modal
            title={editable ? "Edit Transaction" : "Add New Transaction"}
            open={showModal}
            onCancel={() => {
              setShowModal(false);
              setEditable(null);
              form.resetFields();
            }}
            destroyOnClose={true}
            footer={null}
            width={600}
            className="transaction-modal"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item 
                label="Amount" 
                name="amount"
                rules={[{ required: true, message: 'Please enter amount!' }]}
              >
                <Input 
                  type="number" 
                  placeholder="Enter amount"
                  prefix="₹"
                />
              </Form.Item>
              <Form.Item 
                label="Type" 
                name="type"
                rules={[{ required: true, message: 'Please select type!' }]}
              >
                <Select placeholder="Select type">
                  <Select.Option value="Income">Income</Select.Option>
                  <Select.Option value="Expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select placeholder="Select category">
                  {TRANSACTION_CATEGORIES.map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item 
                label="Date" 
                name="date"
                rules={[{ required: true, message: 'Please select date!' }]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item 
                label="Reference" 
                name="refrence"
                rules={[{ required: true, message: 'Please enter reference!' }]}
              >
                <Input type="text" placeholder="Enter reference" />
              </Form.Item>
              <Form.Item 
                label="Description" 
                name="description"
                rules={[{ required: true, message: 'Please enter description!' }]}
              >
                <Input.TextArea 
                  rows={3}
                  placeholder="Enter description"
                />
              </Form.Item>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-btn cancel"
                  onClick={() => {
                    setShowModal(false);
                    setEditable(null);
                    form.resetFields();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editable ? 'Update' : 'Save')}
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
