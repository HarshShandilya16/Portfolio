import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);

  useEffect(() => {
    // Add cursor class to body
    document.body.classList.add('custom-cursor');

    const addEventListeners = () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], select').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = () => {
    setClicked(true);
  };

  const handleMouseUp = () => {
    setClicked(false);
  };

  const handleMouseLeave = () => {
    setHidden(true);
  };

  const handleMouseEnter = () => {
    setHidden(false);
  };

  const variants = {
    default: {
      opacity: 1,
      height: 16,
      width: 16,
      x: position.x - 8,
      y: position.y - 8,
      backgroundColor: 'var(--primary-color)',
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 30,
        stiffness: 400,
      },
    },
    clicked: {
      opacity: 0.8,
      height: 14,
      width: 14,
      x: position.x - 7,
      y: position.y - 7,
      backgroundColor: 'var(--secondary-color)',
    },
    hovered: {
      opacity: 0.8,
      height: 30,
      width: 30,
      x: position.x - 15,
      y: position.y - 15,
      backgroundColor: 'transparent',
      border: '2px solid var(--primary-color)',
    },
    hidden: {
      opacity: 0,
    },
  };

  const outerVariants = {
    default: {
      opacity: 0.3,
      height: 32,
      width: 32,
      x: position.x - 16,
      y: position.y - 16,
      borderColor: 'var(--primary-color)',
      transition: {
        type: 'spring',
        mass: 0.8,
        damping: 40,
        stiffness: 300,
      },
    },
    clicked: {
      opacity: 0.4,
      height: 36,
      width: 36,
      x: position.x - 18,
      y: position.y - 18,
      borderColor: 'var(--secondary-color)',
    },
    hovered: {
      opacity: 0.5,
      height: 60,
      width: 60,
      x: position.x - 30,
      y: position.y - 30,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      <CursorOuter
        ref={cursorOuterRef}
        variants={outerVariants}
        animate={
          hidden 
            ? 'hidden' 
            : clicked 
              ? 'clicked' 
              : linkHovered 
                ? 'hovered' 
                : 'default'
        }
      />
      <CursorDot
        ref={cursorRef}
        variants={variants}
        animate={
          hidden 
            ? 'hidden' 
            : clicked 
              ? 'clicked' 
              : linkHovered 
                ? 'hovered' 
                : 'default'
        }
      />
    </>
  );
};

const CursorDot = styled(motion.div)`
  z-index: 999999;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform;
  contain: layout style size;
`;

const CursorOuter = styled(motion.div)`
  z-index: 999998;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform;
  border: 1px solid var(--primary-color);
  contain: layout style size;
`;

export default MouseFollower; 