import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  
  /* CSS Variables */
  :root {
    /* Colors */
    --background: ${({ theme }) => theme.background};
    --background-rgb: ${({ theme }) => theme.background.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')};
    --text-color: ${({ theme }) => theme.text};
    --text-secondary: ${({ theme }) => theme.text}cc;
    --primary-color: ${({ theme }) => theme.primaryColor};
    --primary-color-rgb: ${({ theme }) => theme.primaryColorRgb};
    --secondary-color: ${({ theme }) => theme.secondaryColor};
    --secondary-color-rgb: ${({ theme }) => theme.secondaryColorRgb};
    --accent-color: ${({ theme }) => theme.accentColor};
    --accent-color-rgb: ${({ theme }) => theme.accentColorRgb};
    --card-bg: ${({ theme }) => theme.cardBg};
    --card-bg-rgb: ${({ theme }) => theme.cardBgRgb};
    --border-color: ${({ theme }) => theme.borderColor};
    --navbar-bg: ${({ theme }) => theme.navbarBg};
    --error-color: ${({ theme }) => theme.errorColor};
    --error-color-rgb: ${({ theme }) => theme.errorColorRgb};
    --success-color: ${({ theme }) => theme.successColor};
    --success-color-rgb: ${({ theme }) => theme.successColorRgb};
    
    /* Typography */
    --main-font: 'Poppins', sans-serif;
    --heading-font: 'Space Grotesk', sans-serif;
    --mono-font: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.1);
    
    /* Card effects */
    --card-border-radius: 12px;
    --card-hover-transform: translateY(-8px);
    --card-hover-transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    /* Button styles */
    --button-border-radius: 8px;
    --button-padding: 0.8rem 2rem;
    --button-font-weight: 600;
    
    /* Section spacing */
    --section-spacing: 100px;
    --container-padding: 1.5rem;
    
    /* Container sizes */
    --container-max-width: 1200px;
  }

  /* Global Reset & Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 16px;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) var(--background);
  }
  
  body {
    font-family: var(--main-font);
    background-color: var(--background);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  h2 {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  h3 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--secondary-color);
    }
  }
  
  button, .button {
    cursor: pointer;
    font-family: var(--main-font);
    border: none;
    background: none;
    outline: none;
    transition: all 0.3s ease;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  code {
    font-family: var(--mono-font);
    background-color: rgba(var(--card-bg-rgb), 0.5);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }
  
  /* Container & Section Styles */
  .container {
    width: 100%;
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  section {
    padding: var(--section-spacing) 0;
    position: relative;
  }
  
  .section-heading {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      margin: 1rem auto 0;
      border-radius: 2px;
    }
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(var(--background-rgb), 0.8);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(var(--primary-color), var(--secondary-color));
    border-radius: 4px;
    
    &:hover {
      background: var(--secondary-color);
    }
  }
  
  /* Selection Style */
  ::selection {
    background-color: var(--primary-color);
    color: white;
  }
  
  /* Utility Classes */
  .text-primary {
    color: var(--primary-color);
  }
  
  .text-secondary {
    color: var(--secondary-color);
  }
  
  .text-accent {
    color: var(--accent-color);
  }
  
  .bg-primary {
    background-color: var(--primary-color);
  }
  
  .bg-secondary {
    background-color: var(--secondary-color);
  }
  
  .flex {
    display: flex;
  }
  
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  
  .grid {
    display: grid;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  .mb-5 { margin-bottom: 3rem; }
  
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mt-5 { margin-top: 3rem; }
  
  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }
  .p-5 { padding: 3rem; }
  
  /* Card Styles */
  .card {
    background-color: var(--card-bg);
    border-radius: var(--card-border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    transition: var(--card-hover-transition);
    border: 1px solid rgba(var(--border-color), 0.1);
    
    &:hover {
      transform: var(--card-hover-transform);
      box-shadow: var(--shadow-lg);
      border-color: rgba(var(--primary-color-rgb), 0.2);
    }
  }
  
  /* Button Styles */
  .btn {
    display: inline-block;
    padding: var(--button-padding);
    font-weight: var(--button-font-weight);
    text-align: center;
    border-radius: var(--button-border-radius);
    transition: all 0.3s ease;
    
    &.btn-primary {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      box-shadow: 0 4px 10px rgba(var(--primary-color-rgb), 0.3);
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(var(--primary-color-rgb), 0.4);
      }
    }
    
    &.btn-outline {
      background: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      
      &:hover {
        background-color: rgba(var(--primary-color-rgb), 0.1);
        transform: translateY(-3px);
      }
    }
  }
  
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  /* Text Gradients */
  .gradient-text {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }
  
  /* Glassy Effect */
  .glass {
    background: rgba(var(--card-bg-rgb), 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--border-color), 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  /* Animation Classes */
  .fade-in {
    animation: fadeIn 1s ease forwards;
  }
  
  .slide-up {
    animation: slideUp 1s ease forwards;
  }
  
  .slide-left {
    animation: slideInLeft 1s ease forwards;
  }
  
  .slide-right {
    animation: slideInRight 1s ease forwards;
  }
  
  .floating {
    animation: float 3s ease-in-out infinite;
  }
  
  .pulsing {
    animation: pulse 2s ease-in-out infinite;
  }
  
  /* Media Queries */
  @media (max-width: 992px) {
    :root {
      --section-spacing: 80px;
    }
  }
  
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    :root {
      --section-spacing: 60px;
      --container-padding: 1rem;
    }
  }
  
  @media (max-width: 576px) {
    :root {
      --section-spacing: 50px;
    }
  }
`;

export default GlobalStyles; 