import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import { FaCode, FaDatabase, FaServer, FaTools, FaChevronRight } from 'react-icons/fa';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isInView, setIsInView] = useState(false);
  
  // For tab indicator animation
  const tabIndicatorX = useMotionValue(0);
  const tabIndicatorWidth = useMotionValue(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const skillsData = {
    languages: [
      { name: 'C++', level: 90, color: '#00599C' },
      { name: 'C', level: 85, color: '#283593' },
      { name: 'Java', level: 80, color: '#f89820' },
      { name: 'Python', level: 75, color: '#306998' },
      { name: 'JavaScript', level: 85, color: '#F0DB4F' },
      { name: 'HTML/CSS', level: 90, color: '#E34F26' },
    ],
    frontend: [
      { name: 'React', level: 85, color: '#61DAFB' },
      { name: 'Tailwind CSS', level: 80, color: '#38B2AC' },
      { name: 'Bootstrap', level: 85, color: '#7952B3' },
      { name: 'jQuery', level: 75, color: '#0769AD' },
      { name: 'Responsive Design', level: 90, color: '#FF6B6B' },
      { name: 'CSS3 Animations', level: 80, color: '#FF9A8B' },
    ],
    backend: [
      { name: 'Node.js', level: 75, color: '#68A063' },
      { name: 'Express.js', level: 70, color: '#000000' },
      { name: 'PHP', level: 80, color: '#8993BE' },
      { name: 'RESTful APIs', level: 85, color: '#FF6B6B' },
      { name: 'Session Management', level: 75, color: '#7952B3' },
      { name: 'Computer Networks', level: 80, color: '#0078D7' },
    ],
    database: [
      { name: 'MySQL', level: 85, color: '#4479A1' },
      { name: 'MongoDB', level: 80, color: '#4DB33D' },
      { name: 'Database Design', level: 75, color: '#FF9A8B' },
      { name: 'SQL Queries', level: 85, color: '#FF6B6B' },
      { name: 'Data Modeling', level: 70, color: '#38B2AC' },
      { name: 'CRUD Operations', level: 90, color: '#7952B3' },
    ],
    tools: [
      { name: 'Git & GitHub', level: 90, color: '#F05032' },
      { name: 'AWS Services', level: 75, color: '#FF9900' },
      { name: 'Numpy', level: 65, color: '#4DABCF' },
      { name: 'Scikit-Learn', level: 60, color: '#F89939' },
      { name: 'DSA', level: 85, color: '#0078D7' },
      { name: 'Problem Solving', level: 90, color: '#FF6B6B' },
    ],
  };

  const tabs = [
    { id: 'languages', label: 'Languages', icon: <FaCode /> },
    { id: 'frontend', label: 'Frontend', icon: <FaCode /> },
    { id: 'backend', label: 'Backend', icon: <FaServer /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> },
    { id: 'tools', label: 'Tools & DSA', icon: <FaTools /> },
  ];

  // Update tab indicator position when active tab changes
  useEffect(() => {
    const activeTabElement = document.getElementById(`tab-${activeTab}`);
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      tabIndicatorX.set(offsetLeft);
      tabIndicatorWidth.set(offsetWidth);
    }
  }, [activeTab, tabIndicatorX, tabIndicatorWidth]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <StyledSkills id="skills">
      <BackgroundGlow isVisible={isInView} />
      
      <div className="container">
        <ScrollReveal>
          <SectionHeader>
            <SectionTitle>
              My Skills
            </SectionTitle>
            <SectionSubtitle>
              Technologies & tools I work with
            </SectionSubtitle>
          </SectionHeader>
        </ScrollReveal>

        <SkillsContent>
          <ScrollReveal direction="left" delay={0.2}>
            <SkillsTabs>
              <TabIndicator 
                style={{ 
                  x: tabIndicatorX,
                  width: tabIndicatorWidth
                }} 
              />
              {tabs.map((tab) => (
                <SkillsTab
                  id={`tab-${tab.id}`}
                  key={tab.id}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <TabIcon>{tab.icon}</TabIcon>
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <ActiveIndicator><FaChevronRight /></ActiveIndicator>}
                </SkillsTab>
              ))}
            </SkillsTabs>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ width: '100%' }}
            >
              <SkillsBars
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {skillsData[activeTab].map((skill, index) => (
                  <SkillItem 
                    key={skill.name}
                    variants={skillVariants}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <SkillInfo>
                      <SkillName>{skill.name}</SkillName>
                      <SkillPercentage>{skill.level}%</SkillPercentage>
                    </SkillInfo>
                    <SkillBarContainer>
                      <SkillBar
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      >
                        <SkillProgress 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.1 * index,
                            ease: [0.43, 0.13, 0.23, 0.96]
                          }}
                          level={skill.level}
                          color={skill.color}
                          isHovered={hoveredSkill === skill.name}
                        />
                      </SkillBar>
                      <SkillHighlight 
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: hoveredSkill === skill.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </SkillBarContainer>
                  </SkillItem>
                ))}
              </SkillsBars>
            </motion.div>
          </AnimatePresence>
        </SkillsContent>
        
        <ScrollReveal direction="up" delay={0.5}>
          <SkillTags>
            <SkillTagTitle>Certifications & Additional Technologies:</SkillTagTitle>
            <TagsContainer>
              {[
                'Intel Unnati Training Program', 'AWS Cloud Services', 'AICTE Virtual Internship',
                'Web Development', 'Full Stack Development', 'Data Structures', 'Algorithms',
                'GitHub', 'Node.js', 'Express.js', 'Database Design', 'System Design',
                'React', 'MongoDB', 'Cloud Computing', 'Version Control'
              ].map((tag, index) => (
                <SkillTag 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.05 * index,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    color: "#fff",
                    background: "var(--primary-color)",
                    y: -5
                  }}
                >
                  {tag}
                </SkillTag>
              ))}
            </TagsContainer>
          </SkillTags>
        </ScrollReveal>
      </div>
    </StyledSkills>
  );
};

const BackgroundGlow = styled.div`
  position: absolute;
  width: 60%;
  height: 50%;
  top: 25%;
  left: 20%;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.15) 0%,
    rgba(var(--secondary-color-rgb), 0.1) 30%,
    rgba(var(--background-rgb), 0) 70%
  );
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 1s ease;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
`;

const StyledSkills = styled.section`
  background-color: var(--background);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.07) 0%, rgba(var(--secondary-color-rgb), 0.07) 100%);
    clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
    z-index: -1;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    border-radius: 3px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-top: 1rem;
`;

const SkillsContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillsTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;

const TabIndicator = styled(motion.div)`
  position: absolute;
  left: 0;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(var(--primary-color-rgb), 0.2), 
    rgba(var(--secondary-color-rgb), 0.2),
    rgba(var(--accent-color-rgb), 0.2)
  );
  border-radius: 10px;
  z-index: -1;
  
  @media (max-width: 768px) {
    bottom: 0;
    height: 4px;
    width: 100% !important;
    border-radius: 2px;
  }
`;

const SkillsTab = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isActive ? '0 5px 15px rgba(var(--primary-color-rgb), 0.2)' : '0 4px 10px rgba(0, 0, 0, 0.1)'};
  text-align: left;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, 
      rgba(var(--primary-color-rgb), 0.05), 
      rgba(var(--secondary-color-rgb), 0.05)
    );
    opacity: ${props => props.isActive ? 1 : 0};
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: var(--primary-color);
    
    &:before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    flex: 1 0 auto;
    justify-content: center;
    padding: 0.75rem 1rem;
    max-width: 140px;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 12px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TabIcon = styled.div`
  margin-right: 10px;
  font-size: 1.2rem;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    margin-right: 8px;
    font-size: 1rem;
  }
`;

const SkillsBars = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillName = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-color);
`;

const SkillPercentage = styled.span`
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const SkillBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SkillBar = styled(motion.div)`
  width: 100%;
  height: 12px;
  background-color: var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SkillHighlight = styled(motion.div)`
  position: absolute;
  top: -4px;
  bottom: -4px;
  left: 0;
  right: 0;
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  transform-origin: left;
  box-shadow: 0 0 15px rgba(var(--primary-color-rgb), 0.5);
  pointer-events: none;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${props => 
    props.isHovered 
      ? `linear-gradient(to right, ${props.color}dd, ${props.color})`
      : props.level >= 80 
        ? 'linear-gradient(to right, var(--primary-color), var(--secondary-color))' 
        : props.level >= 60 
          ? 'linear-gradient(to right, var(--secondary-color), #4CAF50)' 
          : 'linear-gradient(to right, #FFA726, #FB8C00)'
  };
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 8px ${props => props.isHovered ? `${props.color}80` : 'rgba(var(--primary-color-rgb), 0.3)'};
  transition: background 0.3s ease, box-shadow 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shine 2s infinite linear;
    display: ${props => props.isHovered ? 'block' : 'none'};
  }
  
  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(1000%);
    }
  }
`;

const SkillTags = styled.div`
  margin-top: 4rem;
  position: relative;
  z-index: 1;
`;

const SkillTagTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const SkillTag = styled(motion.div)`
  padding: 0.6rem 1.2rem;
  background-color: var(--card-bg);
  color: var(--text-color);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--border-color-rgb), 0.2);
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export default Skills; 