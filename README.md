# Harsh Shandilya - Personal Portfolio

A modern, interactive portfolio website showcasing my skills, projects, and achievements.

## Features

- Interactive 3D animations using Three.js
- Dark mode and light mode support
- Responsive design for all devices
- Animated UI with smooth transitions using Framer Motion
- Project showcase with filter options
- Contact form with validation
- Certifications display with carousel

## Technologies Used

- React.js
- Three.js and React Three Fiber
- Framer Motion for animations
- Styled Components for styling
- React Icons

## Prerequisites

- Node.js and npm

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/portfolio.git
```

2. Navigate to the project directory:
```bash
cd portfolio
```

3. Install dependencies:
```bash
npm install
```

4. Download the required font for Three.js:
   - Go to [https://github.com/mrdoob/three.js/blob/master/examples/fonts/helvetiker_regular.typeface.json](https://github.com/mrdoob/three.js/blob/master/examples/fonts/helvetiker_regular.typeface.json)
   - Save the raw file content to `public/fonts/helvetiker_regular.typeface.json`

5. Start the development server:
```bash
npm start
```

## Project Structure

- `src/components/` - All React components
- `src/animations/` - Three.js animations
- `src/context/` - Context providers (theme)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions and global styles

## Customization

- Edit project data in the respective component files
- Change colors and theme variables in the `GlobalStyles.js`
- Replace placeholder images with your own in the `public` folder

## Deployment

This project can be deployed on platforms like:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## License

This project is licensed under the MIT License.
