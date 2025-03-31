import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import ponggame from './ponggame.png';
import donateBlood from './donate-blood.png';
import pixelDetection from './pixeldetection.png';
import playtimePlanner from './playtime-planner.png';
import nurturingIntellects from './nurturing-intellects.jpg';
import handshake from './handshake.jpg';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const controlsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: controlsRef,
    offset: ["start end", "end start"]
  });
  
  const projectsData = [
    {
      id: 1,
      title: 'KIIT-HUB',
      description: 'KIIT-Hub is a peer-to-peer marketplace for KIIT University students and faculty, enabling easy buying and selling of items within the campus community.',
      image: handshake,
      technologies: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      github: 'https://github.com/HarshShandilya16/KIIT-HUB',
      live: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Donate-Blood',
      description: 'A platform to connect blood donors with recipients in need. Built with PHP for backend functionality.',
      image: donateBlood,
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript' , 'Ajax', 'JQuery', 'Bootstrap', ],
      category: 'web',
      github: 'https://github.com/HarshShandilya16/Donate-Blood',
      live: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Detecting-Pixelated-Image',
      description: 'An AI-based tool for detecting and correcting pixelated images.',
      image: pixelDetection,
      technologies: ['Python', 'Jupyter Notebook', 'Machine Learning', 'TensorFlow', 'Scikit-learn'],
      category: 'ai',
      github: 'https://github.com/HarshShandilya16/Detecting-Pixelated-Image-Correcting-it',
      live: '#'
    },
    {
      id: 4,
      title: 'Pong Game',
      description: 'A classic Pong game recreation using JavaScript.',
      image: ponggame,
      technologies: ['JavaScript', 'HTML', 'CSS'],
      category: 'game',
      github: 'https://github.com/HarshShandilya16/Pong-game',
      live: '#'
    },
    {
      id: 5,
      title: 'PlayTime-Planer',
      description: 'A scheduling application for planning activities and play time.',
      image: playtimePlanner,
      technologies: ['JavaScript', 'HTML', 'CSS', 'DOM Manupulation','JSON'],
      category: 'web',
      github: 'https://github.com/HarshShandilya16/PlayTime-Planer',
      live: '#'
    },
    {
      id: 6,
      title: 'Nurturing-Intellect',
      description: 'Nurturing Intellect aims to provide quality level education and facilitied to the poor and underprivileged children throungh financial support.',
      image: nurturingIntellects,
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      category: 'web',
      github: 'https://github.com/HarshShandilya16/Nurturing-Intellect',
      live: '#',
      featured: true
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'web', label: 'Web' },
    { value: 'ai', label: 'AI' },
    { value: 'game', label: 'Games' },
  ];

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  // Navigation for featured projects
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featuredProjects = projectsData.filter(project => project.featured);
  
  const nextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => 
      prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevFeature = () => {
    setCurrentFeatureIndex((prevIndex) => 
      prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
    );
  };

  return (
    <StyledProjects id="projects" ref={controlsRef}>
      <BackgroundGlow style={{ y: backgroundY }} />
      
      <div className="container">
        <SectionHeader
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <SectionTitle>
            My Projects
          </SectionTitle>
          <SectionSubtitle>
            Check out my recent work
          </SectionSubtitle>
        </SectionHeader>

        <FeaturedProjectsSection>
          <FeaturedNavigation>
            <FeaturedNavButton 
              onClick={prevFeature}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft />
            </FeaturedNavButton>
            
            <FeaturedProgress>
              {featuredProjects.map((_, index) => (
                <FeaturedProgressDot 
                  key={index} 
                  active={index === currentFeatureIndex}
                  onClick={() => setCurrentFeatureIndex(index)}
                />
              ))}
            </FeaturedProgress>
            
            <FeaturedNavButton 
              onClick={nextFeature}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight />
            </FeaturedNavButton>
          </FeaturedNavigation>
          
          <AnimatePresence mode="wait">
            <FeaturedProject 
              key={`featured-${currentFeatureIndex}`}
              project={featuredProjects[currentFeatureIndex]} 
              index={currentFeatureIndex} 
              isEven={currentFeatureIndex % 2 === 0} 
            />
          </AnimatePresence>
        </FeaturedProjectsSection>

        <ProjectFilters
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filters.map((filter, index) => (
            <FilterButton
              key={index}
              isActive={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
              {activeFilter === filter.value && 
                <FilterActiveIndicator layoutId="filterIndicator" />
              }
            </FilterButton>
          ))}
        </ProjectFilters>

        <ProjectGrid
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {filteredProjects.filter(project => !project.featured).map((project, index) => (
              <TiltCard 
                key={project.id} 
                project={project} 
                index={index}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                isHovered={hoveredProject === project.id}
              />
            ))}
          </AnimatePresence>
        </ProjectGrid>

        <ViewAllButton
          href="https://github.com/HarshShandilya16"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            background: "var(--secondary-color)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          View All on GitHub <FiGithub />
        </ViewAllButton>
      </div>
    </StyledProjects>
  );
};

// Featured Project Component
const FeaturedProject = ({ project, index, isEven }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Smoother spring configuration
  const springConfig = { stiffness: 100, damping: 15 };
  
  useEffect(() => {
    // Setup IntersectionObserver manually
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    // Start observing when component mounts
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    // Cleanup on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <FeaturedProjectCard
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      isEven={isEven}
    >
      <FeaturedProjectImageContainer
        isEven={isEven}
        whileHover={{ 
          y: -5, 
          transition: { 
            type: "spring",
            ...springConfig
          }
        }}
      >
        <FeaturedProjectImage 
          src={project.image} 
          alt={project.title}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <FeaturedProjectOverlay />
      </FeaturedProjectImageContainer>
      
      <FeaturedProjectContent isEven={isEven}>
        <FeaturedProjectOverline variants={itemVariants}>
          Featured Project
        </FeaturedProjectOverline>
        
        <FeaturedProjectTitle variants={itemVariants}>
          {project.title}
        </FeaturedProjectTitle>
        
        <FeaturedProjectDescription variants={itemVariants}>
          {project.description}
        </FeaturedProjectDescription>
        
        <FeaturedTechList variants={itemVariants}>
          {project.technologies.map((tech, i) => (
            <FeaturedTechItem key={i} variants={itemVariants}>
              {tech}
            </FeaturedTechItem>
          ))}
        </FeaturedTechList>
        
        <FeaturedProjectLinks variants={itemVariants}>
          {project.github && (
            <FeaturedProjectLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              whileHover={{ 
                scale: 1.1, 
                color: "var(--primary-color)" 
              }}
              transition={{
                type: "spring",
                ...springConfig
              }}
            >
              <FiGithub />
            </FeaturedProjectLink>
          )}
        </FeaturedProjectLinks>
      </FeaturedProjectContent>
    </FeaturedProjectCard>
  );
};

// Tilt Card Component
const TiltCard = ({ project, index, isHovered, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { stiffness: 150, damping: 20 }; // Reduced stiffness and increased damping

  const controls = useAnimation();
  
  useEffect(() => {
    // Only start animations after component has mounted
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [controls]);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced tilt values by 50% to minimize excessive movement
    const tiltX = ((y - centerY) / centerY) * 5; // Reduced from 10 to 5
    const tiltY = ((x - centerX) / centerX) * 5; // Reduced from 10 to 5
    
    setTiltValues({ x: tiltX, y: tiltY });
  };
  
  const handleMouseEnter = () => {
    // Add hover effects when mouse enters
    onHoverStart && onHoverStart();
  };
  
  const handleMouseLeave = () => {
    // Use a smoother transition when returning to default position
    setTiltValues({ x: 0, y: 0 });
    onHoverEnd && onHoverEnd();
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Slightly longer duration
        ease: "easeOut", // Smoother easing function
        delay: index * 0.1
      }
    },
    hover: { 
      scale: 1.03, // Reduced from 1.05 to 1.03
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        ...springConfig
      }
    }
  };
  
  return (
    <ProjectCard
      ref={cardRef}
      style={{
        transform: `perspective(1000px) rotateX(${tiltValues.y}deg) rotateY(${tiltValues.x}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate={controls}
      exit={{ opacity: 0, y: 20 }}
      layoutId={`project-${project.id}`}
    >
      <ProjectImageContainer>
        <ProjectImage 
          src={project.image} 
          alt={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <ProjectLinks>
          {project.github && (
            <ProjectLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiGithub />
            </ProjectLink>
          )}
        </ProjectLinks>
      </ProjectImageContainer>
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <TechStack>
          <TechStackTitle>
            <FiCode style={{ color: 'var(--primary-color)' }} />
            Technologies
          </TechStackTitle>
          <TechList>
            {project.technologies.map((tech, i) => (
              <TechItem 
                key={i}
                whileHover={{ 
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </TechItem>
            ))}
          </TechList>
        </TechStack>
      </ProjectContent>
    </ProjectCard>
  );
};

const StyledProjects = styled.section`
  background-color: var(--background);
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.08) 0%, rgba(var(--secondary-color-rgb), 0.08) 100%);
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    z-index: -1;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
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

// Featured Projects Section
const FeaturedProjectsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 6rem;
  position: relative;
  
  @media (max-width: 768px) {
    gap: 3rem;
    margin-bottom: 4rem;
  }
`;

const FeaturedProjectCard = styled(motion.div)`
  display: grid;
  grid-template-columns: ${props => props.isEven ? '1fr 1fr' : '1fr 1fr'};
  align-items: center;
  gap: 3rem;
  position: relative;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeaturedProjectImageContainer = styled.div`
  grid-column: ${props => props.isEven ? '1' : '2'};
  grid-row: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
  
  @media (max-width: 992px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const FeaturedProjectImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const FeaturedProjectContent = styled.div`
  grid-column: ${props => props.isEven ? '2' : '1'};
  grid-row: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 992px) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const FeaturedProjectOverline = styled(motion.p)`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const FeaturedProjectTitle = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FeaturedProjectDescription = styled(motion.div)`
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  
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
    border-radius: 0.5rem;
    z-index: -1;
  }
`;

const FeaturedTechList = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  list-style: none;
  padding: 0;
`;

const FeaturedTechItem = styled(motion.li)`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.8;
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--primary-color);
  }
`;

const FeaturedProjectLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const FeaturedProjectLink = styled(motion.a)`
  font-size: 1.3rem;
  color: var(--text-color);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

// Regular Project Cards
const ProjectFilters = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: var(--card-bg);
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: ${props => props.isActive ? 'white' : 'var(--primary-color)'};
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  position: relative;
`;

const ProjectImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  
  &:hover {
    img {
      transform: scale(1.1);
    }
    
    div {
      opacity: 1;
    }
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
`;

const ProjectLinks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(var(--primary-color-rgb), 0.7),
    rgba(var(--secondary-color-rgb), 0.7)
  );
  opacity: 0;
  transition: all 0.3s ease;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--background);
    color: var(--secondary-color);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
  position: relative;
  padding-left: 10px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 3px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.9;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  margin-top: auto;
`;

const TechStackTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled(motion.span)`
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  background-color: var(--border-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ViewAllButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  margin: 3rem auto 0;
  max-width: 200px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const BackgroundGlow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 25% 25%,
    rgba(var(--primary-color-rgb), 0.15) 0%,
    rgba(var(--secondary-color-rgb), 0.05) 25%,
    rgba(var(--background-rgb), 0) 50%
  );
  filter: blur(100px);
  opacity: 0.5;
  z-index: -1;
  pointer-events: none;
`;

const FeaturedNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FeaturedNavButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.1);
  }
`;

const FeaturedProgress = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FeaturedProgressDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(var(--primary-color-rgb), 0.5)'};
  }
`;

const FilterActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  border-radius: 4px;
  z-index: -1;
`;

const CardGlow = styled(motion.div)`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.5) 0%,
    rgba(var(--secondary-color-rgb), 0.3) 40%,
    transparent 70%
  );
  filter: blur(40px);
  z-index: -1;
  opacity: 0;
  pointer-events: none;
`;

const FeaturedProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(var(--primary-color-rgb), 0.2),
    rgba(var(--secondary-color-rgb), 0.3)
  );
  z-index: 1;
`;

export default Projects; 