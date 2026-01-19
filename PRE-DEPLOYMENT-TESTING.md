# 🧪 PRE-DEPLOYMENT LOCAL TESTING

## Before deploying, test everything locally to catch errors early

### 1. Environment Setup

Create `.env` file in server folder:
```bash
cd server
# Copy .env.example to .env
cp .env.example .env
# Edit .env with your local values
```

Create `.env` file in client folder:
```bash
cd client
# Add this line:
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

---

### 2. Test Backend Locally

```bash
cd server
npm install
npm start

# Should see:
# Server running on http://localhost:8000
# MongoDB Connected
```

Test endpoints:
```bash
# Health check
curl http://localhost:8000/

# Should return HTML welcome message
```

---

### 3. Test Frontend Locally

```bash
cd client
npm install
npm start

# Should open browser at http://localhost:3000
```

---

### 4. Full Integration Test

With both servers running:

1. **Test Registration**
   - Go to: http://localhost:3000
   - Click "Sign Up"
   - Fill form and submit
   - Check: Registration success message
   - Check: Email received (if email configured)

2. **Test Login**
   - Use registered credentials
   - Check: Redirects to dashboard
   - Check: Token stored in localStorage

3. **Test Dashboard**
   - Check: Analytics cards display
   - Check: No console errors
   - Check: Charts render

4. **Test Transactions**
   - Add new transaction
   - Edit transaction
   - Delete transaction
   - Check: All operations work

5. **Test Profile**
   - Update profile info
   - Change password
   - Check: Updates save correctly

---

### 5. Test Build Process

```bash
# Test frontend build
cd client
npm run build

# Should create build/ folder
# Check for errors

# Test backend start
cd ../server
npm start

# Should start without errors
```

---

### 6. Common Local Testing Issues

| Issue | Solution |
|-------|----------|
| Port 8000 already in use | Kill process: `npx kill-port 8000` |
| Port 3000 already in use | Kill process: `npx kill-port 3000` |
| MongoDB connection failed | Check MONGO_URL in .env |
| CORS error | Check backend is running on port 8000 |
| Module not found | Run `npm install` in both folders |

---

### 7. Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Backend starts without errors
- [ ] Frontend builds without errors
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard loads data
- [ ] Can perform CRUD operations
- [ ] Email verification works (if configured)
- [ ] Password reset works (if configured)
- [ ] No console errors in browser
- [ ] Mobile view works
- [ ] All environment variables documented

---

### 8. Generate Production Build

```bash
# Clean previous builds
cd client
rm -rf build
npm run build

# Should complete without errors
# Check build size (should be < 5MB)

cd ../server
# No build needed for Node.js backend
```

---

### 9. Verify Git Repository

```bash
# Check status
git status

# Should NOT see:
# - .env files
# - node_modules/
# - build/ folder

# If you see them, add to .gitignore
```

---

### 10. Final Validation

```bash
# Check all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main

# Verify on GitHub:
# - All code is pushed
# - .env files are NOT visible
# - README is updated
```

---

## ✅ If All Tests Pass

**You're ready to deploy!**

Follow these guides in order:
1. QUICK-DEPLOY.md (for quick reference)
2. DEPLOYMENT.md (for detailed steps)
3. SECURITY.md (for security checklist)

---

## 🐛 If Tests Fail

1. Check error messages carefully
2. Verify all dependencies installed
3. Check environment variables
4. Review server logs
5. Check browser console
6. Test one feature at a time

Don't deploy until all local tests pass! ✨
