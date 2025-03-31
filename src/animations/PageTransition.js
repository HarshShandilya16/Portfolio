import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';

const PageTransition = ({ children, location }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Subtle entrance animation for the entire page
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.opacity = "1";
      document.body.style.transition = "opacity 0.5s ease";
    }, 50);
  }, [location]);
  
  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll || 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track cursor position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.97,
      filter: 'blur(5px)'
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)'
    },
    out: {
      opacity: 0,
      y: -30,
      scale: 0.97,
      filter: 'blur(5px)'
    }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    duration: 0.6
  };
  
  const progressBarWidth = `${scrollProgress * 100}%`;

  return (
    <>
      <ProgressIndicator>
        <ProgressBar width={progressBarWidth} />
      </ProgressIndicator>
      
      <PageCursor 
        style={{
          left: `${cursorPosition.x * 100}%`,
          top: `${cursorPosition.y * 100}%`
        }}
      />
      
      <AnimatePresence mode="wait">
        <TransitionContainer
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
          
          <GradientCorners cursorX={cursorPosition.x} cursorY={cursorPosition.y}>
            <Corner className="top-left" />
            <Corner className="top-right" />
            <Corner className="bottom-left" />
            <Corner className="bottom-right" />
          </GradientCorners>
        </TransitionContainer>
      </AnimatePresence>
    </>
  );
};

const ProgressIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(var(--background-rgb), 0.2);
  z-index: 9999;
  backdrop-filter: blur(5px);
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.width};
  background: linear-gradient(to right, 
    var(--primary-color), 
    var(--secondary-color), 
    var(--accent-color),
    var(--primary-color)
  );
  background-size: 300% 100%;
  animation: gradient 3s ease infinite;
  box-shadow: 0 0 15px rgba(var(--primary-color-rgb), 0.7);
  transition: width 0.2s ease-out;
  
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
`;

const PageCursor = styled.div`
  position: fixed;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.03) 0%,
    rgba(var(--secondary-color-rgb), 0.02) 40%,
    rgba(var(--background-rgb), 0) 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: -1;
  opacity: 0.7;
  filter: blur(20px);
  transition: transform 0.1s ease-out;
`;

const TransitionContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  will-change: opacity, transform;
  overflow: hidden;
`;

const GradientCorners = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Corner = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  transition: all 0.5s ease;
  
  &.top-left {
    top: 0;
    left: 0;
    background: radial-gradient(circle at top left, 
      rgba(var(--primary-color-rgb), 0.18) 0%, 
      rgba(var(--background-rgb), 0) 70%
    );
    filter: blur(20px);
    transform: scale(1.05);
  }
  
  &.top-right {
    top: 0;
    right: 0;
    background: radial-gradient(circle at top right, 
      rgba(var(--secondary-color-rgb), 0.18) 0%, 
      rgba(var(--background-rgb), 0) 70%
    );
    filter: blur(20px);
    animation: breathe 8s ease-in-out infinite alternate;
  }
  
  &.bottom-left {
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at bottom left, 
      rgba(var(--accent-color-rgb), 0.18) 0%, 
      rgba(var(--background-rgb), 0) 70%
    );
    filter: blur(20px);
    animation: breathe 7s ease-in-out infinite alternate-reverse;
  }
  
  &.bottom-right {
    bottom: 0;
    right: 0;
    background: radial-gradient(circle at bottom right, 
      rgba(var(--primary-color-rgb), 0.18) 0%, 
      rgba(var(--background-rgb), 0) 70%
    );
    filter: blur(20px);
    transform: scale(1.05);
  }
  
  @keyframes breathe {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.3);
      opacity: 1;
    }
  }
`;

export default PageTransition; 