import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocalStorage, useToggle, useClipboard } from '../../hooks/useCustomHooks';
import Header1 from '../../components/Layout/Header1';
import Footer from '../../components/Layout/Footer';
import './Settings.css';

const Settings = () => {
  const { 
    theme, 
    toggleTheme, 
    accentColor, 
    setAccentColor, 
    fontSize, 
    setFontSize,
    resetSettings 
  } = useTheme();

  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  const [showAdvanced, toggle] = useToggle(false);
  const { copied, copy } = useClipboard();
  const [selectedColor, setSelectedColor] = useState(accentColor);

  const accentColors = [
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Blue', value: '#3B82F6' }
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setAccentColor(color);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings();
      setNotifications(true);
      setSelectedColor('#06B6D4');
    }
  };

  const shareSettings = () => {
    const settingsCode = btoa(JSON.stringify({
      theme,
      accentColor,
      fontSize,
      notifications
    }));
    copy(settingsCode);
  };

  return (
    <>
      <Header1 />
      <div className="settings-wrapper">
        <div className="settings-container">
          <div className="settings-header">
            <h1 className="settings-title">
              <span className="title-icon">⚙️</span>
              Settings & Preferences
            </h1>
            <p className="settings-subtitle">
              Customize your experience with advanced options
            </p>
          </div>

          <div className="settings-content">
            {/* Appearance Settings */}
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">🎨</span>
                  Appearance
                </h2>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Theme Mode</label>
                  <p className="setting-description">
                    Switch between dark and light themes
                  </p>
                </div>
                <button 
                  onClick={toggleTheme} 
                  className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`}
                >
                  <span className="toggle-icon">
                    {theme === 'dark' ? '🌙' : '☀️'}
                  </span>
                  <span className="toggle-label">
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Accent Color</label>
                  <p className="setting-description">
                    Choose your preferred accent color
                  </p>
                </div>
                <div className="color-picker">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      className={`color-option ${selectedColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColorChange(color.value)}
                      title={color.name}
                    >
                      {selectedColor === color.value && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Font Size</label>
                  <p className="setting-description">
                    Adjust text size for better readability
                  </p>
                </div>
                <div className="font-size-options">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      className={`size-option ${fontSize === size ? 'active' : ''}`}
                      onClick={() => setFontSize(size)}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">🔔</span>
                  Notifications
                </h2>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Enable Notifications</label>
                  <p className="setting-description">
                    Receive updates about your transactions
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="settings-section">
              <div className="section-header clickable" onClick={toggle}>
                <h2 className="section-title">
                  <span className="section-icon">🔧</span>
                  Advanced Settings
                  <span className={`expand-icon ${showAdvanced ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </h2>
              </div>

              {showAdvanced && (
                <div className="advanced-content">
                  <div className="setting-item">
                    <div className="setting-info">
                      <label className="setting-label">Export Settings</label>
                      <p className="setting-description">
                        Share your settings configuration
                      </p>
                    </div>
                    <button 
                      onClick={shareSettings}
                      className="action-button"
                    >
                      {copied ? '✓ Copied!' : '📋 Copy Code'}
                    </button>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <label className="setting-label">Reset Settings</label>
                      <p className="setting-description">
                        Restore all settings to default values
                      </p>
                    </div>
                    <button 
                      onClick={handleReset}
                      className="action-button danger"
                    >
                      🔄 Reset All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="info-card">
              <div className="info-icon">💡</div>
              <div className="info-content">
                <h3>Tip</h3>
                <p>
                  Your preferences are automatically saved and will persist across sessions.
                  Try different combinations to find what works best for you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
