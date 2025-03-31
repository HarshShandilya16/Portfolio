import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const BackgroundParticles = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  // Motion values for performance optimization
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 25 });
  
  // Enhanced particle properties
  const particleCount = theme.background.startsWith('#12') ? 70 : 50; // Fewer particles in light mode for elegance
  const particleMinSize = theme.background.startsWith('#12') ? 1 : 1.2;
  const particleMaxSize = theme.background.startsWith('#12') ? 3 : 2.5;
  const particleMinSpeed = 0.04;
  const particleMaxSpeed = 0.15; // Even slower for more elegant movement
  const particleOpacity = theme.background.startsWith('#12') ? 0.6 : 0.25; // More subtle in light mode
  const connectionDistance = theme.background.startsWith('#12') ? 100 : 90; // Reduced for cleaner look
  const connectionOpacity = theme.background.startsWith('#12') ? 0.15 : 0.05; // More subtle connections in light mode
  const mouseRadius = 180;
  const attractForce = theme.background.startsWith('#12') ? 0.08 : 0.06;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let hue = 0;
    let animationFrameId;
    
    // Set canvas size with device pixel ratio for better rendering
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      const pixelRatio = window.devicePixelRatio || 1;
      
      canvas.width = innerWidth * pixelRatio;
      canvas.height = innerHeight * pixelRatio;
      
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
      
      setDimensions({ width: innerWidth, height: innerHeight });
      
      // Recreate particles when canvas is resized
      createParticles();
    };
    
    // Create particles
    const createParticles = () => {
      particles = [];
      const { innerWidth, innerHeight } = window;
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (particleMaxSize - particleMinSize) + particleMinSize;
        const speed = Math.random() * (particleMaxSpeed - particleMinSpeed) + particleMinSpeed;
        const x = Math.random() * innerWidth;
        const y = Math.random() * innerHeight;
        const directionX = (Math.random() - 0.5) * speed;
        const directionY = (Math.random() - 0.5) * speed;
        const baseSize = size;
        const angle = Math.random() * 360; // Initial angle for rotation
        const angularSpeed = (Math.random() - 0.5) * 0.008; // Slower rotation for elegance
        const hue = Math.random() * 15 - 7.5; // Smaller hue variation for consistency
        
        particles.push({
          x,
          y,
          directionX,
          directionY,
          size,
          baseSize,
          speed,
          angle,
          angularSpeed,
          hue
        });
      }
    };
    
    // Get particle color with glow effect
    const getParticleColor = (size, baseSize) => {
      const isDarkMode = theme.background.startsWith('#12'); // Check if theme is dark
      const alpha = (size / baseSize) * particleOpacity;
      
      // Extract RGB from theme color for variation
      let primaryColor = isDarkMode ? '#64dfdf' : '#5e60ce';
      if (theme.primary) {
        primaryColor = theme.primary;
      }
      
      // Create a gradient for the particle
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, `${primaryColor}${isDarkMode ? 'ee' : '99'}`); // Adjust transparency for light mode
      gradient.addColorStop(1, `${primaryColor}00`); // Transparent at edge
      
      return gradient;
    };
    
    // Get connection line color
    const getConnectionColor = (distance, maxDistance) => {
      const isDarkMode = theme.background.startsWith('#12');
      const alpha = Math.pow(1 - (distance / maxDistance), 1.5); // More exponential falloff
      
      return isDarkMode
        ? `rgba(100, 223, 223, ${alpha * connectionOpacity})`
        : `rgba(94, 96, 206, ${alpha * connectionOpacity * 0.8})`; // Even more subtle in light mode
    };
    
    // Draw a single particle with gradient
    const drawParticle = (particle) => {
      const { x, y, size, baseSize, angle } = particle;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Set particle fill color with gradient
      ctx.fillStyle = getParticleColor(size, baseSize);
      
      // Draw the particle
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add subtle glow effect - reduced for light mode
      ctx.shadowColor = theme.primary || (theme.background.startsWith('#12') ? '#64dfdf' : '#5e60ce');
      ctx.shadowBlur = theme.background.startsWith('#12') ? size * 1.2 : size * 0.8;
      ctx.fill();
      
      ctx.restore();
    };
    
    // Connect particles with lines if they are close enough
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const particleA = particles[a];
          const particleB = particles[b];
          
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Set line color based on distance
            ctx.strokeStyle = getConnectionColor(distance, connectionDistance);
            
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Handle mouse interaction with particles
    const handleMouseInteraction = () => {
      if (mousePosition.x === null || mousePosition.y === null) return;
      
      const mx = smoothMouseX.get();
      const my = smoothMouseY.get();
      
      particles.forEach(particle => {
        // Calculate distance between mouse and particle
        const dx = particle.x - mx;
        const dy = particle.y - my;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          // Apply attraction force
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          
          // Push/pull particles from mouse
          particle.x += Math.cos(angle) * force * attractForce;
          particle.y += Math.sin(angle) * force * attractForce;
          
          // Increase size and opacity when near mouse
          particle.size = particle.baseSize * (1 + force * 0.25);
        } else {
          // Return to base size when away from mouse
          particle.size = particle.baseSize + Math.sin(Date.now() * 0.003 + particle.baseSize) * 0.2;
        }
      });
    };
    
    // Animation loop
    const animate = (timestamp) => {
      if (!previousTimeRef.current) {
        previousTimeRef.current = timestamp;
      }
      
      // Request next frame first to avoid jank
      requestRef.current = requestAnimationFrame(animate);
      
      // Calculate time difference
      const deltaTime = timestamp - previousTimeRef.current;
      previousTimeRef.current = timestamp;
      
      // Only update at 30fps equivalent for performance
      if (deltaTime < 1000 / 30) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.directionX;
        particle.y += particle.directionY;
        
        // Update angle for rotation
        particle.angle += particle.angularSpeed;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.directionX *= -1;
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.directionY *= -1;
        }
        
        // Draw particle
        drawParticle(particle);
      });
      
      // Connect particles
      connectParticles();
      
      // Handle mouse interaction
      handleMouseInteraction();
      
      // Subtle parallax effect on mouse movement
      if (mousePosition.x !== null && particles.length > 0) {
        const parallaxStrength = 0.03; // Reduced for subtlety
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const offsetX = (mousePosition.x - centerX) * parallaxStrength;
        const offsetY = (mousePosition.y - centerY) * parallaxStrength;
        
        // Apply subtle parallax to some particles
        particles.forEach((particle, index) => {
          if (index % 3 === 0) { // Only affect every 3rd particle for performance
            particle.x += offsetX * 0.002;
            particle.y += offsetY * 0.002;
          }
        });
      }
    };
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    
    // Set up canvas and listeners
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);
  
  return (
    <ParticleCanvas ref={canvasRef} />
  );
};

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  filter: ${props => props.theme.background.startsWith('#12') 
    ? 'contrast(1.1) brightness(1.05)'
    : 'contrast(0.92) brightness(1.03)'};
  opacity: ${props => props.theme.background.startsWith('#12') ? 1 : 0.65};
  mix-blend-mode: ${props => props.theme.background.startsWith('#12') ? 'normal' : 'multiply'};
`;

export default BackgroundParticles; 