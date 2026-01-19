## 🔒 SECURITY NOTES

### **NEVER commit these files to Git:**
- `.env`
- `.env.local`
- `.env.production.local`

### **Already in .gitignore (verify):**
```
node_modules/
.env
.env.local
.env.production.local
build/
dist/
```

### **Generate Secure JWT Secret:**
```bash
# Use this command to generate a secure random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Gmail App Password Setup:**
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable if not enabled)
3. App Passwords → Generate new
4. Select "Mail" and "Other"
5. Copy the 16-character password
6. Use this in EMAIL_PASS environment variable

### **Brevo API Key:**
1. Sign up at: https://www.brevo.com/
2. Go to SMTP & API → API Keys
3. Create new API key
4. Copy and use in BREVO_COMMON_API_KEY
