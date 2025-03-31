import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import BackgroundParticles from '../animations/BackgroundParticles';

// Text typing animation
const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Slightly faster typing speed
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  
  return (
    <>
      {displayText}
      {currentIndex < text.length && <BlinkingCursor>|</BlinkingCursor>}
    </>
  );
};

// Replace the InteractiveParticleGame with CodeBubbleGame
const CodeBubbleGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [popupValue, setPopupValue] = useState("+1");
  const [popupColor, setPopupColor] = useState("var(--primary-color)");
  
  const gameRef = useRef(null);
  const timerRef = useRef(null);
  const bubblesRef = useRef([]);
  const initialized = useRef(false);
  
  // Tech skills to showcase
  const techSkills = [
    { name: "HTML", color: "#e34c26", points: 1 },
    { name: "CSS", color: "#264de4", points: 1 },
    { name: "JS", color: "#f0db4f", points: 1 },
    { name: "React", color: "#61dafb", points: 2 },
    { name: "Node", color: "#3c873a", points: 2 },
    { name: "PHP", color: "#8993be", points: 2 },
    { name: "SQL", color: "#f29111", points: 2 },
    { name: "API", color: "#00adef", points: 3 },
    { name: "Git", color: "#f34f29", points: 3 },
    { name: "Vue", color: "#42b883", points: 3 }
  ];
  
  // Non-tech traps (clicking these loses points)
  const trapItems = [
    { name: "BUG", color: "#ff4757", points: -1 },
    { name: "ERROR", color: "#ff6b81", points: -1 },
    { name: "CRASH", color: "#ff6348", points: -1 },
    { name: "404", color: "#ff7f50", points: -1 }
  ];
  
  // Initialize game
  useEffect(() => {
    if (!initialized.current && gameRef.current) {
      initialized.current = true;
      resetGame();
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  // Create a new bubble
  const createBubble = () => {
    if (!gameRef.current || !isActive) return null;
    
    const container = gameRef.current.getBoundingClientRect();
    const size = 30 + Math.floor(Math.random() * 30);
    
    // 25% chance to create a trap bubble
    const isTrap = Math.random() < 0.25;
    const itemSet = isTrap ? trapItems : techSkills;
    const skill = itemSet[Math.floor(Math.random() * itemSet.length)];
    
    // Safety margins to keep bubbles fully inside the container
    const maxX = container.width - size;
    const maxY = container.height - size;
    
    return {
      id: `bubble-${Date.now()}-${Math.random()}`,
      x: 20 + Math.random() * maxX,
      y: 20 + Math.random() * maxY,
      size,
      speed: 0.5 + Math.random() * 1,
      skill,
      isTrap,
      direction: Math.random() * Math.PI * 2, // Random direction in radians
      rotation: Math.random() * 20 - 10, // Random rotation for variety
      scale: 0, // Start small
      opacity: 0, // Start transparent
    };
  };
  
  // Add new bubbles occasionally
  useEffect(() => {
    if (!isActive) return;
    
    const spawnBubble = () => {
      setBubbles(prev => {
        // Limit max bubbles for performance
        if (prev.length >= 8) {
          return prev;
        }
        
        const newBubble = createBubble();
        return newBubble ? [...prev, newBubble] : prev;
      });
      
      // Schedule next bubble
      timerRef.current = setTimeout(spawnBubble, 600 + Math.random() * 1000);
    };
    
    timerRef.current = setTimeout(spawnBubble, 800);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive]);
  
  // Animation loop
  useEffect(() => {
    bubblesRef.current = bubbles;
    
    const animateBubbles = () => {
      if (!gameRef.current) return;
      
      const container = gameRef.current.getBoundingClientRect();
      
      // Update bubble positions
      setBubbles(prev => 
        prev.map(bubble => {
          // Animate entrance
          let scale = bubble.scale;
          let opacity = bubble.opacity;
          
          if (scale < 1) {
            scale = Math.min(1, scale + 0.05);
          }
          
          if (opacity < 1) {
            opacity = Math.min(1, opacity + 0.05);
          }
          
          // Move bubble
          let x = bubble.x + Math.cos(bubble.direction) * bubble.speed;
          let y = bubble.y + Math.sin(bubble.direction) * bubble.speed;
          let direction = bubble.direction;
          
          // Bounce off edges
          if (x <= 0 || x >= container.width - bubble.size) {
            direction = Math.PI - direction;
            x = Math.max(0, Math.min(container.width - bubble.size, x));
          }
          
          if (y <= 0 || y >= container.height - bubble.size) {
            direction = -direction;
            y = Math.max(0, Math.min(container.height - bubble.size, y));
          }
          
          return {
            ...bubble,
            x,
            y,
            direction,
            scale,
            opacity
          };
        })
      );
      
      requestRef.current = requestAnimationFrame(animateBubbles);
    };
    
    const requestRef = { current: requestAnimationFrame(animateBubbles) };
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [bubbles]);
  
  // Handle bubble clicks
  const handleBubbleClick = (e, bubbleId, bubblePoints, position, isTrap) => {
    e.stopPropagation();
    
    // Set popup value and color based on bubble type
    setPopupValue(bubblePoints > 0 ? `+${bubblePoints}` : bubblePoints.toString());
    setPopupColor(isTrap ? "#ff4757" : "var(--primary-color)");
    
    // Update score with bubble points
    setScore(prevScore => {
      const newScore = prevScore + bubblePoints;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return Math.max(0, newScore); // Don't allow negative scores
    });
    
    // Remove the clicked bubble
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    
    // Show score popup
    setPopupPosition(position);
    setShowScorePopup(true);
    setTimeout(() => setShowScorePopup(false), 800);
    
    // Create pop effect
    createPopEffect(position, isTrap);
  };
  
  // Create pop effect (small particles)
  const createPopEffect = (position, isTrap) => {
    const particleColor = isTrap ? 
      (idx) => `hsl(${0 + (idx * 5)}, 80%, 60%)` : // Red hues for traps
      (idx) => `hsl(${180 + (idx * 30)}, 80%, 60%)`; // Blues/greens for tech
    
    const newParticles = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return {
        id: `pop-${Date.now()}-${i}`,
        x: position.x,
        y: position.y,
        size: 3 + Math.random() * 4,
        vx: Math.cos(angle) * (1 + Math.random()),
        vy: Math.sin(angle) * (1 + Math.random()),
        color: particleColor(i),
        lifetime: 20 + Math.floor(Math.random() * 20)
      };
    });
    
    setPopEffects(prev => [...prev, ...newParticles]);
  };
  
  // Pop effect state
  const [popEffects, setPopEffects] = useState([]);
  
  // Update pop effects
  useEffect(() => {
    if (popEffects.length === 0) return;
    
    const updateEffects = () => {
      setPopEffects(prev => 
        prev
          .filter(p => p.lifetime > 0)
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            lifetime: p.lifetime - 1,
            vx: p.vx * 0.95,
            vy: p.vy * 0.95
          }))
      );
    };
    
    const interval = setInterval(updateEffects, 16);
    return () => clearInterval(interval);
  }, [popEffects.length]);
  
  // Reset game
  const resetGame = () => {
    setScore(0);
    setBubbles([]);
    setPopEffects([]);
    setIsActive(true);
    
    // Clear any timers
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Create initial bubbles
    const initialBubbles = [];
    for (let i = 0; i < 5; i++) {
      const bubble = createBubble();
      if (bubble) initialBubbles.push(bubble);
    }
    
    setBubbles(initialBubbles);
  };
  
  return (
    <GameWrapper>
      {/* Score display - now positioned ABOVE the game circle */}
      <ScoreDisplay>
        <CurrentScore>{score}</CurrentScore>
        {highScore > 0 && <HighScore>Best: {highScore}</HighScore>}
      </ScoreDisplay>

      <GameContainer
        ref={gameRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 1.5
        }}
      >
        {/* Game intro overlay */}
        {showIntro && (
          <GameIntro
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowIntro(false)}
          >
            <IntroTitle>Code Bubble Pop!</IntroTitle>
            <IntroText>Click tech bubbles to earn points. Avoid bugs and errors!</IntroText>
            <RulesList>
              <RuleItem>Tech bubbles: +1 to +3 points</RuleItem>
              <RuleItem>Error bubbles: -1 point</RuleItem>
            </RulesList>
            <StartButton>Start</StartButton>
          </GameIntro>
        )}
        
        {/* Refresh button */}
        <RefreshButton
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary-color-rgb), 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          aria-label="Reset game"
        >
          <RefreshIcon />
        </RefreshButton>
        
        {/* Render bubbles */}
        {bubbles.map(bubble => (
          <Bubble
            key={bubble.id}
            style={{
              left: `${bubble.x}px`,
              top: `${bubble.y}px`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: bubble.skill.color,
              transform: `rotate(${bubble.rotation}deg) scale(${bubble.scale})`,
              opacity: bubble.opacity,
              boxShadow: bubble.isTrap ? 
                '0 2px 10px rgba(255,0,0,0.3), inset 0 0 15px rgba(255,100,100,0.3)' : 
                '0 2px 10px rgba(0,0,0,0.2), inset 0 0 15px rgba(255,255,255,0.3)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleBubbleClick(
              e, 
              bubble.id, 
              bubble.skill.points, 
              { x: bubble.x + bubble.size / 2, y: bubble.y + bubble.size / 2 },
              bubble.isTrap
            )}
          >
            <BubbleText>{bubble.skill.name}</BubbleText>
          </Bubble>
        ))}
        
        {/* Render pop effects */}
        {popEffects.map(particle => (
          <PopParticle
            key={particle.id}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.lifetime / 40
            }}
          />
        ))}
        
        {/* Score popup animation */}
        {showScorePopup && (
          <ScorePopup
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -30, scale: 1.5 }}
            transition={{ duration: 0.8 }}
            style={{
              left: popupPosition.x,
              top: popupPosition.y,
              color: popupColor
            }}
          >
            {popupValue}
          </ScorePopup>
        )}
        
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
      </GameContainer>

      {/* Game rules - now positioned BELOW the game circle */}
      <GameRules>
        <RuleText>
          Click tech: +points | Click bugs: -points
        </RuleText>
      </GameRules>
    </GameWrapper>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]); // For parallax background effect
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <StyledHero id="hero" ref={heroRef}>
      <BackgroundParticles />
      <HeroBackgroundGlow 
        style={{ y: bgY }} // Apply parallax effect to background glow
      />
      <HeroBackgroundGradient 
        style={{ y: bgY }} // Apply same parallax effect to gradient
      />
      <HeroCard>
        <HeroContent 
          style={{ y, opacity, scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <TextContent
            style={{
              x: mousePosition.x * -0.5,
              y: mousePosition.y * -0.5
            }}
          >
            <NameTitle 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                type: "spring",
                stiffness: 100 
              }}
            >
              Hi, I'm <HighlightedText>Harsh<br/>Shandilya</HighlightedText>
            </NameTitle>
            <Role 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              <RoleText>Full Stack and PHP Developer</RoleText>
            </Role>
            <Description 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              <TypingAnimation text="I create engaging digital experiences with a focus on performance and user satisfaction." />
            </Description>
            <ButtonContainer 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8 }}
            >
              <PrimaryButton 
                href="#projects"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(var(--primary-color-rgb), 0.7)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonText>View My Work</ButtonText>
                <ButtonGlow />
              </PrimaryButton>
              <SecondaryButton 
                href="#contact"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(var(--card-bg-rgb), 0.9)",
                  borderColor: "var(--primary-color)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonText>Get In Touch</ButtonText>
              </SecondaryButton>
            </ButtonContainer>
          </TextContent>

          <AnimationContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5
            }}
          >
            <CodeBubbleGame />
            <HeroDecorationCircle 
              top="20%" 
              left="20%" 
              size="100px"
              delay={0.1}
              color="rgba(var(--primary-color-rgb), 0.1)"
            />
            <HeroDecorationCircle 
              top="70%" 
              left="10%" 
              size="50px" 
              delay={0.3}
              color="rgba(var(--secondary-color-rgb), 0.15)"
            />
            <HeroDecorationCircle 
              top="20%" 
              right="15%" 
              size="70px" 
              delay={0.2}
              color="rgba(var(--accent-color-rgb), 0.1)"
            />
            <HeroDecorationCircle 
              top="80%" 
              right="20%" 
              size="120px" 
              delay={0.4}
              color="rgba(var(--primary-color-rgb), 0.07)"
            />
          </AnimationContainer>
        </HeroContent>
      </HeroCard>
      <ScrollDown
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 2,
          type: "spring",
          stiffness: 100
        }}
      >
        <ScrollIndicator>
          <ScrollDot />
          <ScrollRing />
        </ScrollIndicator>
        <ScrollArrows>
          <ScrollArrow delay={0} />
          <ScrollArrow delay={0.2} />
        </ScrollArrows>
      </ScrollDown>
    </StyledHero>
  );
};

const StyledHero = styled.section`
  position: relative;
  min-height: 100vh;
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroBackgroundGlow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.03) 0%,
    rgba(var(--secondary-color-rgb), 0.03) 30%,
    rgba(var(--background-rgb), 0) 70%
  );
  filter: blur(40px);
  z-index: -1;
  opacity: ${props => props.theme?.background?.startsWith('#12') ? 0.8 : 0.4};
  animation: pulse-slow 8s ease-in-out infinite alternate;
  
  @keyframes pulse-slow {
    from {
      transform: translate(-50%, -50%) scale(1);
      opacity: ${props => props.theme?.background?.startsWith('#12') ? 0.8 : 0.4};
    }
    to {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: ${props => props.theme?.background?.startsWith('#12') ? 0.6 : 0.2};
    }
  }
`;

const HeroBackgroundGradient = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(var(--primary-color-rgb), 0.01) 0%,
    rgba(var(--secondary-color-rgb), 0.01) 100%
  );
  z-index: -1;
`;

const HeroCard = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NameTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HighlightedText = styled.span`
  color: var(--primary-color);
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 12px;
    background: linear-gradient(to right, rgba(var(--primary-color-rgb), 0.15), rgba(var(--secondary-color-rgb), 0.15));
    z-index: -1;
    border-radius: 15px;
  }
`;

const Role = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RoleText = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.85;
  position: relative;
  margin: 0;
  
  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 60%;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    
    &:before {
      left: -10px;
      display: none;
    }
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-color);
  opacity: 0.75;
  max-width: 540px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 auto;
  }
`;

const BlinkingCursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  padding: 1rem 2rem;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  box-shadow: ${props => props.theme?.background?.startsWith('#12') 
    ? '0 5px 15px rgba(var(--primary-color-rgb), 0.3)'
    : '0 5px 20px rgba(var(--primary-color-rgb), 0.15), 0 0 0 1px rgba(var(--primary-color-rgb), 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.4)'};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme?.background?.startsWith('#12') 
      ? '0 8px 25px rgba(var(--primary-color-rgb), 0.4)'
      : '0 8px 25px rgba(var(--primary-color-rgb), 0.25), 0 0 0 1px rgba(var(--primary-color-rgb), 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.6)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0)
  );
  transform: skewX(-20deg);
  animation: glow 2s infinite linear;
  
  @keyframes glow {
    0% {
      left: -60px;
    }
    100% {
      left: 150%;
    }
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

const SecondaryButton = styled(motion.a)`
  padding: 1rem 2rem;
  background-color: var(--card-bg);
  color: var(--text-color);
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid var(--border-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const AnimationContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroDecorationCircle = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0;
  animation: fadeInBlur 1s forwards ${props => props.delay}s;
  
  @keyframes fadeInBlur {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:after {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    background: ${props => props.theme?.background?.startsWith('#12')
      ? 'radial-gradient(circle at center, rgba(var(--primary-color-rgb), 0.12), transparent 70%)'
      : 'radial-gradient(circle at center, rgba(var(--primary-color-rgb), 0.07), transparent 70%)'};
    border-radius: 50%;
    z-index: -1;
    animation: pulse 4s ease-in-out infinite alternate;
    
    @keyframes pulse {
      from { transform: scale(1); opacity: ${props => props.theme?.background?.startsWith('#12') ? 0.8 : 0.5}; }
      to { transform: scale(1.2); opacity: ${props => props.theme?.background?.startsWith('#12') ? 0.4 : 0.2}; }
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border: 2px solid ${props => props.theme?.background?.startsWith('#12')
      ? 'rgba(var(--primary-color-rgb), 0.15)'
      : 'rgba(var(--primary-color-rgb), 0.1)'};
    border-radius: 50%;
    z-index: -1;
    opacity: 0.7;
    animation: rotate 15s linear infinite;
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }
`;

const LogoBackground = styled(motion.div)`
  position: absolute;
  width: 240px;
  height: 240px;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.08),
    rgba(var(--secondary-color-rgb), 0.05),
    transparent 70%
  );
  border-radius: 50%;
  z-index: -1;
`;

const LogoText = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  filter: drop-shadow(0 0 15px rgba(var(--primary-color-rgb), ${props => props.theme?.background?.startsWith('#12') ? 0.5 : 0.4}));
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: ${props => props.theme?.background?.startsWith('#12') 
      ? 'radial-gradient(circle at center, rgba(var(--primary-color-rgb), 0.15), transparent 70%)'
      : 'radial-gradient(circle at center, rgba(var(--primary-color-rgb), 0.1), transparent 70%)'};
    border-radius: 50%;
    z-index: -1;
    filter: blur(10px);
  }
`;

const LogoLetter = styled(motion.span)`
  display: inline-block;
`;

const LogoGlow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.3) 0%,
    rgba(var(--primary-color-rgb), 0) 70%
  );
  border-radius: 50%;
  z-index: -1;
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    div > div:first-child {
      transform: scale(1.1) translateX(-50%);
      background-color: var(--primary-color);
    }
    
    div > div:last-child {
      border-color: var(--primary-color);
      opacity: 0.7;
    }
  }
`;

const ScrollIndicator = styled.div`
  position: relative;
  width: 30px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollDot = styled.div`
  width: 6px;
  height: 6px;
  background-color: var(--text-color);
  border-radius: 50%;
  opacity: 0.7;
  transition: all 0.3s ease;
  animation: scrollMove 1.5s ease-in-out infinite;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  
  @keyframes scrollMove {
    0% {
      transform: translate(-50%, 0);
      opacity: 0.7;
    }
    50% {
      transform: translate(-50%, 15px);
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, 0);
      opacity: 0.7;
    }
  }
`;

const ScrollRing = styled.div`
  width: 24px;
  height: 40px;
  border: 2px solid var(--text-color);
  border-radius: 15px;
  opacity: 0.3;
  transition: all 0.3s ease;
`;

const ScrollArrows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  margin-top: 0.5rem;
`;

const ScrollArrow = styled.div`
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--text-color);
  border-bottom: 2px solid var(--text-color);
  transform: rotate(45deg);
  opacity: 0.5;
  margin-top: -5px;
  animation: fadeInOut 1.5s infinite ${props => props.delay}s;
  
  @keyframes fadeInOut {
    0% { opacity: 0.1; }
    50% { opacity: 0.8; }
    100% { opacity: 0.1; }
  }
`;

// New styled components for the game
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const GameContainer = styled(motion.div)`
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--background-rgb), 0.2) 0%,
    rgba(var(--background-rgb), 0.1) 50%,
    rgba(var(--background-rgb), 0) 100%
  );
  backdrop-filter: blur(4px);
  border: 1px solid rgba(var(--primary-color-rgb), 0.1);
  z-index: 10;
  cursor: pointer;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid rgba(var(--primary-color-rgb), 0.1);
    border-radius: 50%;
    z-index: -1;
    opacity: 0.7;
    animation: rotate 20s linear infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 240px;
    height: 240px;
    background: radial-gradient(
      circle at center,
      rgba(var(--primary-color-rgb), 0.08),
      transparent 70%
    );
    border-radius: 50%;
    z-index: -1;
    animation: pulse 4s ease-in-out infinite alternate;
  }
`;

const Bubble = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2), inset 0 0 15px rgba(255,255,255,0.3);
  user-select: none;
  z-index: 5;
  transition: transform 0.1s ease;
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const BubbleText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
`;

const PopParticle = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: 4;
`;

const ScoreDisplay = styled.div`
  position: relative;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const CurrentScore = styled.div`
  background: linear-gradient(
    to right,
    rgba(var(--primary-color-rgb), 0.7),
    rgba(var(--secondary-color-rgb), 0.7)
  );
  border: 1px solid rgba(var(--primary-color-rgb), 0.3);
  color: white;
  font-weight: bold;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  min-width: 60px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(var(--primary-color-rgb), 0.3);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const HighScore = styled.div`
  margin-top: 5px;
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.8;
`;

const StartButton = styled.button`
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(var(--primary-color-rgb), 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(var(--primary-color-rgb), 0.4);
  }
`;

const RefreshButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(var(--background-rgb), 0.2);
  border: 1px solid rgba(var(--primary-color-rgb), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: background-color 0.3s ease;
  backdrop-filter: blur(4px);
  padding: 0;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.5);
  }
`;

const RefreshIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  border-right-color: transparent;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -3px;
    right: -3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 6px 6px;
    border-color: transparent transparent var(--primary-color) transparent;
  }
`;

const ScorePopup = styled(motion.div)`
  position: absolute;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 0.9rem;
  pointer-events: none;
  text-shadow: 0 0 5px rgba(var(--primary-color-rgb), 0.5);
  transform-origin: center;
  z-index: 10;
`;

const RulesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 15px 0;
  text-align: center;
`;

const RuleItem = styled.li`
  color: var(--text-color);
  font-size: 0.8rem;
  margin-bottom: 5px;
  opacity: 0.8;
`;

const GameRules = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(var(--background-rgb), 0.7);
  padding: 5px 12px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
`;

const RuleText = styled.p`
  color: var(--text-color);
  font-size: 0.7rem;
  margin: 0;
  text-align: center;
  white-space: nowrap;
`;

const GameIntro = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--background-rgb), 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
  backdrop-filter: blur(5px);
  border-radius: 50%;
  cursor: pointer;
`;

const IntroTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.4rem;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.5);
`;

const IntroText = styled.p`
  color: var(--text-color);
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: center;
  max-width: 80%;
`;

export default Hero; 