import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

/**
 * ScrollReveal - A reusable component that animates children when they enter the viewport
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be revealed
 * @param {string} props.direction - The direction from which the element enters ('up', 'down', 'left', 'right')
 * @param {number} props.distance - How far the element moves during animation (in pixels)
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {number} props.duration - Duration of the animation (in seconds)
 * @param {boolean} props.once - Whether the animation should only happen once
 * @param {string} props.type - The type of animation ('fade', 'slide', 'scale', 'rotate')
 * @param {Object} props.style - Additional styles for the container
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.customVariants - Custom animation variants to override defaults
 */
const ScrollReveal = ({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.5,
  once = true,
  type = 'fade',
  style = {},
  className = '',
  customVariants,
  ...props
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once, margin: '-100px 0px' });

  // Calculate the correct transform based on direction
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  // Default animation variants
  const baseVariants = {
    hidden: {
      opacity: type.includes('fade') ? 0 : 1,
      scale: type.includes('scale') ? 0.8 : 1,
      rotate: type.includes('rotate') ? -10 : 0,
      ...getTransform(),
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 80,
        delay,
        duration,
      },
    },
  };

  // Use custom variants if provided, otherwise use default
  const variants = customVariants || baseVariants;

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 