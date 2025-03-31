import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import PageTransition from './animations/PageTransition';
import Loader from './components/Loader';

// Theme configuration
const lightTheme = {
  background: '#f5f8ff',
  'background-rgb': '245, 248, 255',
  text: '#334155',
  'text-rgb': '51, 65, 85',
  primary: '#5e60ce',
  'primary-rgb': '94, 96, 206',
  secondary: '#6930c3',
  'secondary-rgb': '105, 48, 195',
  accent: '#4cc9f0',
  'accent-rgb': '76, 201, 240',
  border: '#e2e8f0',
  'border-rgb': '226, 232, 240',
  card: '#ffffff',
  'card-rgb': '255, 255, 255',
  shadow: '0 4px 20px rgba(94, 96, 206, 0.08)',
};

const darkTheme = {
  background: '#121212',
  'background-rgb': '18, 18, 18',
  text: '#e9ecef',
  'text-rgb': '233, 236, 239',
  primary: '#64dfdf',
  'primary-rgb': '100, 223, 223',
  secondary: '#48bfe3',
  'secondary-rgb': '72, 191, 227',
  accent: '#5e60ce',
  'accent-rgb': '94, 96, 206',
  border: '#2a2a2a',
  'border-rgb': '42, 42, 42',
  card: '#1e1e1e',
  'card-rgb': '30, 30, 30',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
};

const GlobalStyle = createGlobalStyle`
  :root {
    --background: ${props => props.theme.background};
    --background-rgb: ${props => props.theme['background-rgb']};
    --text-color: ${props => props.theme.text};
    --text-color-rgb: ${props => props.theme['text-rgb']};
    --primary-color: ${props => props.theme.primary};
    --primary-color-rgb: ${props => props.theme['primary-rgb']};
    --secondary-color: ${props => props.theme.secondary};
    --secondary-color-rgb: ${props => props.theme['secondary-rgb']};
    --accent-color: ${props => props.theme.accent};
    --accent-color-rgb: ${props => props.theme['accent-rgb']};
    --border-color: ${props => props.theme.border};
    --border-color-rgb: ${props => props.theme['border-rgb']};
    --card-bg: ${props => props.theme.card};
    --card-bg-rgb: ${props => props.theme['card-rgb']};
    --box-shadow: ${props => props.theme.shadow};
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
    background-color: var(--background);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color 0.5s ease, color 0.5s ease;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }
  
  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: all 0.3s ease;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  section {
    padding: 4rem 0;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, 
      ${props => props.theme.primary}, 
      ${props => props.theme.secondary}
    );
    border-radius: 4px;
  }
  
  /* Selection color */
  ::selection {
    background-color: ${props => props.theme.primary};
    color: #fff;
  }
  
  /* Light mode enhancement */
  ${props => !props.theme.background.startsWith('#12') && `
    body {
      background-image: linear-gradient(165deg, #f5f8ff 0%, #eef4ff 50%, #e8f0ff 100%);
    }
    
    .container {
      background-color: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: 1px solid rgba(226, 232, 240, 0.6);
      box-shadow: 0 10px 30px rgba(94, 96, 206, 0.04);
    }
    
    h1, h2, h3 {
      color: #334155;
    }
    
    p {
      color: #475569;
    }
    
    a:hover {
      color: #6930c3;
    }
  `}
`;

// AnimatedRoutes component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <PageTransition location={location}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };
  
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check for preferred color scheme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <AnimatedRoutes />
          <Footer />
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
