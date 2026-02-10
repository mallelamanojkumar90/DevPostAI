# DevPostAI – GitHub Repository to Social Media Post Generator 🚀

**DevPostAI** is a premium, AI-powered platform designed for Developer Advocates, Technical Content Strategists, and individual builders. It transforms complex engineering work from GitHub repositories into professional, authentic social media content for LinkedIn, Twitter/X, and WhatsApp.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7-646cff.svg)

---

## ✨ Key Features

### 🤖 **AI-Powered Analysis**
- **Deep Repository Analysis**: Parallel fetching of README, package.json, repository metadata, commits, and language breakdown from GitHub API
- **Intelligent Project Type Detection**: Multi-layered categorization using dependency analysis and README parsing
- **Advanced Feature Extraction**: Smart section parsing with markdown cleanup and validation
- **Technical Insights Mining**: Scans for architecture, performance, security, and scalability keywords

### 📱 **Platform-Optimized Content**
- **LinkedIn**: Professional technical updates with features, tech stack, and key learnings
- **Twitter/X**: Concise, engaging posts optimized for developer audiences
- **WhatsApp**: Casual but professional sharing format

### 🎨 **Premium UI/UX**
- **Modern Design System**: State-of-the-art dark mode with glassmorphism effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling with active section indicators
- **Back to Top Button**: Floating button for easy navigation

### 🔒 **Production Ready**
- **GitHub API Authentication**: Supports 5,000 requests/hour with token
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Optimized bundle size and lazy loading

---

## 🛠️ Technical Stack

- **Frontend**: React 19 (Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Fetching**: Axios & GitHub REST API
- **State Management**: React Hooks
- **Build Tool**: Vite 7

---

## 🎯 Use Cases

- 💡 **Open Source Maintainers**: Showcase features and updates to attract contributors
- 💡 **Developer Advocates**: Turn code updates into high-impact technical content
- 💡 **Individual Builders**: Build a professional technical brand effortlessly
- 💡 **Tech Teams**: Share project milestones and achievements

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- GitHub account (for API token)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manojkumar/DevPostAI.git
   cd DevPostAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure GitHub API Token** (Required for Production):
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Get your GitHub Personal Access Token:
   - Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
   - Click **"Generate new token (classic)"**
   - Select scopes: `public_repo` (or `repo` for private repositories)
   - Copy the token and add it to `.env`:
     ```env
     VITE_GITHUB_TOKEN=your_github_token_here
     ```
   
   **Why this is needed:**
   - Unauthenticated: 60 requests/hour ❌
   - Authenticated: 5,000 requests/hour ✅
   
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📖 Usage

1. **Paste GitHub URL**: Enter any public GitHub repository URL
2. **Generate Posts**: Click the "Generate" button
3. **Copy & Share**: Use the copy buttons to grab platform-specific content
4. **Navigate**: Use the navbar to explore "How it Works" and "About" sections

### Example Repositories to Try:
- `https://github.com/facebook/react`
- `https://github.com/vercel/next.js`
- `https://github.com/vitejs/vite`

---

## 🚀 Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub token
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Create new site on [Netlify](https://netlify.com)
3. Add environment variable in Site settings
4. Build command: `npm run build`
5. Publish directory: `dist`

### Render

1. Create new Static Site on [Render](https://render.com)
2. Add environment variable: `VITE_GITHUB_TOKEN`
3. Build command: `npm run build`
4. Publish directory: `dist`

**Important**: Never commit your `.env` file (already in `.gitignore`)

---

## 📁 Project Structure

```
DevPostAI/
├── src/
│   ├── App.jsx              # Main application component
│   ├── index.css            # Global styles and design system
│   ├── main.jsx             # Application entry point
│   └── services/
│       └── github.js        # GitHub API integration
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

---

## 🎨 Features Showcase

### Navigation
- ✅ Smooth scrolling to sections
- ✅ Active section highlighting in navbar
- ✅ Back to top button (appears after 300px scroll)
- ✅ Sticky navigation bar

### UI Components
- ✅ Glass-morphism cards
- ✅ Gradient buttons and text
- ✅ Animated post cards
- ✅ Copy-to-clipboard functionality
- ✅ Loading states and error handling

### Animations
- ✅ Scroll-triggered animations
- ✅ Hover effects on cards and buttons
- ✅ Smooth page transitions
- ✅ Micro-interactions

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GITHUB_TOKEN` | GitHub Personal Access Token | Yes (for production) |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



## 🐛 Troubleshooting

### Issue: API rate limit exceeded
**Solution**: Add your GitHub token to `.env` file

### Issue: Posts not generating
**Solution**: Check if the repository URL is valid and public

### Issue: Copy button not visible
**Solution**: Clear browser cache and reload

---

## 📊 Performance

- ⚡ Fast initial load (< 2s)
- 🎯 Optimized bundle size
- 📱 Mobile-first responsive design
- ♿ Accessible UI components

---

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ No API keys in client-side code
- ✅ GitHub token stored securely
- ✅ HTTPS recommended for production

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev) - UI framework
- [Vite](https://vitejs.dev) - Build tool
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev) - Icon library
- [GitHub API](https://docs.github.com/en/rest) - Repository data

---

## 📧 Contact

Built with ❤️ for the global developer community.

**Project Link**: [https://github.com/Manojkumar/DevPostAI](https://github.com/Manojkumar/DevPostAI)

---

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

---

**Made by developers, for developers** 🚀
