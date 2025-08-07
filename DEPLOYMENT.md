# ConvertFlix Deployment Guide

## 🚀 Complete Deployment Instructions

### 📋 Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- Vercel/Render account
- Gmail account for email notifications

### 🔧 Backend Setup

#### 1. **MongoDB Atlas Setup**
- Create MongoDB Atlas cluster
- Database URI: `mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
- Network Access: Allow all IPs (0.0.0.0/0)

#### 2. **Email Configuration**
- Enable 2-factor authentication on Gmail
- Generate App Password
- Update `backend/config.env`:
  ```env
  EMAIL_PASS=your_gmail_app_password
  ```

#### 3. **Local Backend Setup**
```bash
cd backend
npm install
npm run init-admin  # Creates default admin user
npm run dev
```

#### 4. **Backend Deployment**

**Option A: Render (Recommended)**
1. Connect GitHub repository to Render
2. Create new Web Service
3. Set environment variables in Render dashboard
4. Deploy automatically

**Option B: Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Set environment variables in Vercel dashboard

### 🎨 Frontend Setup

#### 1. **Local Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

#### 2. **Frontend Deployment**

**Option A: Vercel (Recommended)**
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically

**Option B: Netlify**
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically

### 🔐 Admin Panel Access

#### Default Admin Credentials:
- **Email:** harshbudhauliya882@gmail.com
- **Password:** admin123456
- **Login URL:** `https://your-domain.com/admin/login`

### 📧 Email Setup

#### Gmail App Password Setup:
1. Go to Google Account settings
2. Enable 2-factor authentication
3. Generate App Password
4. Use App Password in `EMAIL_PASS`

### 🌐 Environment Variables

#### Backend (Render/Vercel):
```env
MONGODB_URI=mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=convertflix_super_secret_key_2024_taliyo_technologies
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=harshbudhauliya882@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=harshbudhauliya882@gmail.com
ADMIN_PASSWORD=admin123456
NODE_ENV=production
PORT=10000
```

#### Frontend (Vercel/Netlify):
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_APP_NAME=ConvertFlix
```

### 🔄 Deployment Steps

#### Step 1: Backend Deployment
1. Push code to GitHub
2. Connect to Render/Vercel
3. Set environment variables
4. Deploy backend
5. Get backend URL

#### Step 2: Frontend Deployment
1. Update API URL in frontend
2. Connect to Vercel/Netlify
3. Deploy frontend
4. Get frontend URL

#### Step 3: Final Configuration
1. Update CORS settings in backend
2. Test all functionality
3. Set up custom domain (optional)

### 🧪 Testing Checklist

- [ ] Contact form submission
- [ ] Email notifications
- [ ] Admin login
- [ ] File upload and conversion
- [ ] File download
- [ ] Auto-cleanup (24 hours)
- [ ] Admin panel functionality

### 📊 Monitoring

#### Backend Health Check:
```
GET https://your-backend-url.com/api/health
```

#### Admin Dashboard:
```
https://your-frontend-url.com/admin/login
```

### 🔧 Troubleshooting

#### Common Issues:
1. **CORS Error:** Update CORS_ORIGIN in backend
2. **Email Not Working:** Check Gmail App Password
3. **MongoDB Connection:** Verify network access
4. **File Upload Failed:** Check file size limits

#### Debug Commands:
```bash
# Backend logs
npm run dev

# Check admin user
npm run init-admin

# Test email
curl -X POST http://localhost:5000/api/contact/submit
```

### 🚀 Production Checklist

- [ ] Environment variables set
- [ ] Email notifications working
- [ ] File upload/convert working
- [ ] Admin panel accessible
- [ ] Auto-cleanup working
- [ ] SSL certificates active
- [ ] Custom domain configured
- [ ] Analytics tracking setup

### 📞 Support

For deployment issues:
- Check Render/Vercel logs
- Verify environment variables
- Test locally first
- Contact: harshbudhauliya882@gmail.com

---

**Made with ❤️ by Taliyo Technologies**
