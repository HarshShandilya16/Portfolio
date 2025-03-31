import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderContent>
        <LogoContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LogoText>HS</LogoText>
          <LogoGlow 
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </LogoContainer>
        
        <LoadingBar
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "220px", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <LoadingProgress
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </LoadingBar>
        
        <LoadingText
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Loading amazing stuff...
        </LoadingText>
      </LoaderContent>
      
      <BackgroundDecoration>
        {[...Array(4)].map((_, i) => (
          <DecorCircle
            key={i}
            size={(i + 1) * 100}
            delay={i * 0.2}
            top={`${25 + (i % 2) * 50}%`}
            left={`${25 + ((i + 1) % 2) * 50}%`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </BackgroundDecoration>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 2;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(var(--primary-color-rgb), 0.4));
`;

const LogoGlow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.2) 0%,
    rgba(var(--primary-color-rgb), 0) 70%
  );
  border-radius: 50%;
  z-index: -1;
`;

const LoadingBar = styled(motion.div)`
  width: 220px;
  height: 3px;
  background-color: rgba(var(--border-color-rgb), 0.3);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  width: 40%;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color),
    var(--accent-color)
  );
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
`;

const LoadingText = styled(motion.p)`
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  letter-spacing: 1px;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const DecorCircle = styled(motion.div)`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  transform: translate(-50%, -50%);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.05) 0%,
    rgba(var(--secondary-color-rgb), 0.05) 50%,
    rgba(var(--background-rgb), 0) 70%
  );
  opacity: 0;
  filter: blur(40px);
  z-index: 1;
  animation: fadeIn 1s forwards ${props => props.delay}s;
  
  @keyframes fadeIn {
    to {
      opacity: 0.3;
    }
  }
`;

export default Loader; 