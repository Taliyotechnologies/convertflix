# ConvertFlix

A modern, fully responsive web application for file compression and conversion built with React + Vite + TypeScript.

## 🚀 Project Overview

ConvertFlix is a frontend-only web application that provides a beautiful, modern interface for file compression and conversion. The project is structured with separate frontend and backend directories for future scalability.

## 📁 Project Structure

```
convertflix/
├── frontend/          # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (Theme)
│   │   ├── styles/        # Global CSS styles
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
├── backend/           # Future backend implementation
│   └── README.md      # Backend documentation
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Custom CSS** - No external UI libraries
- **Local Storage** - Theme persistence and auth simulation

### Backend (Planned)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Sharp** - Image processing
- **FFmpeg** - Video/Audio processing
- **PDF-lib** - PDF manipulation

## ✨ Features

### 🌗 Theme System
- Dark & Light mode toggle
- Persistent theme preference
- Smooth theme transitions

### 🧭 Navigation
- Sticky, responsive navbar
- Dropdown menus for Tools and Company
- Mobile hamburger menu
- Theme toggle integration

### 🏠 Home Page
- Hero section with compelling copy
- Feature highlights
- Tools preview section
- Modern footer

### 🛠 Tools Pages
- **Image Tools** (`/tools/image`)
- **Video Tools** (`/tools/video`)
- **PDF Tools** (`/tools/pdf`)
- **Audio Tools** (`/tools/audio`)

Each tools page includes:
- Drag & drop file upload
- File type validation
- Compression settings
- Mock processing simulation
- Results display
- Download functionality

### 🏢 Company Pages
- **About Us** (`/about`)
- **Contact** (`/contact`)
- **Owner** (`/owner`)
- **Terms of Service** (`/terms`)
- **Privacy Policy** (`/privacy`)

### 🔐 Authentication
- Frontend-only auth simulation
- Login/Signup forms
- Profile dropdown after login
- Token-based session management

### 📱 Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend (Future)
cd backend
npm install
npm run dev
```

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0"
}
```

### Development Dependencies
```json
{
  "@types/react": "^18.0.28",
  "@types/react-dom": "^18.0.11",
  "@typescript-eslint/eslint-plugin": "^5.57.1",
  "@typescript-eslint/parser": "^5.57.1",
  "@vitejs/plugin-react": "^3.1.0",
  "eslint": "^8.38.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.3.4",
  "typescript": "^4.9.3",
  "vite": "^4.2.0"
}
```

## 🎨 Design Features

### Color Scheme
- **Dark Theme**: Deep blues, purples, and grays
- **Light Theme**: Clean whites, light grays, and accents
- **CSS Variables**: Dynamic theme switching

### Typography
- **Google Fonts**: Inter (Modern, clean font)
- **Responsive**: Scales appropriately across devices
- **Hierarchy**: Clear heading and text hierarchy

### Animations
- **Smooth Transitions**: Theme switching, hover effects
- **Loading States**: Spinners and progress indicators
- **Micro-interactions**: Button hover, dropdown animations

## 🔧 Customization

### Adding New Tools
1. Create a new component in `src/pages/tools/`
2. Add routing in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`

### Modifying Themes
1. Edit CSS variables in `src/styles/index.css`
2. Update theme context in `src/contexts/ThemeContext.tsx`

### Styling Components
- Use CSS Modules or global CSS
- Follow BEM methodology for class naming
- Maintain responsive design principles

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel, Netlify, or GitHub Pages
```

### Environment Setup
Create `.env` files for environment variables:
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=ConvertFlix
```

## 🔮 Future Enhancements

### Frontend
- [ ] Real file processing integration
- [ ] Advanced compression options
- [ ] Batch file processing
- [ ] Progress tracking
- [ ] File preview improvements

### Backend
- [ ] RESTful API development
- [ ] File upload handling
- [ ] Processing queue system
- [ ] User authentication
- [ ] File storage integration

### Features
- [ ] Real-time collaboration
- [ ] Advanced file formats
- [ ] Cloud storage integration
- [ ] API rate limiting
- [ ] Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@convertflix.com or create an issue in the repository.

---

**ConvertFlix** - Compress & Convert Any File Instantly
