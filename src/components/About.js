import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import { FaAward, FaUserGraduate, FaCode, FaBriefcase, FaCertificate } from 'react-icons/fa';
import profileImage from './profile.jpg';

const About = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  
  const personalInfo = [
    { label: 'Name', value: 'Harsh Shandilya' },
    { label: 'Degree', value: 'B.Tech in Computer Science Engineering' },
    { label: 'University', value: 'Kalinga Institute of Industrial Technology' },
    { label: 'Email', value: 'harshshandilya101@gmail.com' },
    { label: 'Location', value: 'Bhubaneswar, India' },
    { label: 'Freelance', value: 'Available' },
  ];

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <StyledAbout id="about" ref={containerRef}>
      <div className="container">
        <ScrollReveal>
          <SectionHeader>
            <SectionTitle>About Me</SectionTitle>
            <SectionSubtitle>My academic and professional journey</SectionSubtitle>
          </SectionHeader>
        </ScrollReveal>

        <AboutContent>
          <ScrollReveal direction="right" delay={0.2} distance={30}>
            <AboutImage>
              <ImageWrapper>
                <motion.img 
                  src={profileImage} 
                  alt="Harsh Shandilya" 
                  style={{ y: parallaxY }}
                />
                <ImageOverlay />
              </ImageWrapper>
              <AboutStats>
                <AboutStat>
                  <StatIcon>
                    <FaUserGraduate />
                  </StatIcon>
                  <StatContent>
                    <StatTitle>Education</StatTitle>
                    <StatText>CGPA 9.01</StatText>
                  </StatContent>
                </AboutStat>
                <AboutStat>
                  <StatIcon>
                    <FaCode />
                  </StatIcon>
                  <StatContent>
                    <StatTitle>Projects</StatTitle>
                    <StatText>5+ Completed</StatText>
                  </StatContent>
                </AboutStat>
                <AboutStat>
                  <StatIcon>
                    <FaCertificate />
                  </StatIcon>
                  <StatContent>
                    <StatTitle>Certifications</StatTitle>
                    <StatText>5+ Earned</StatText>
                  </StatContent>
                </AboutStat>
              </AboutStats>
            </AboutImage>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4} distance={30}>
            <AboutInfo>
              <AboutText>
                <p>
                  Hello! I'm <Highlight>Harsh Shandilya</Highlight>, a dedicated Computer Science Engineering student at KIIT University with a strong passion for web development and software engineering.
                </p>
                <p>
                  I'm currently pursuing my Bachelor's degree with a focus on developing practical skills alongside theoretical knowledge. My academic journey has equipped me with a strong foundation in <Highlight>programming</Highlight>, <Highlight>data structures</Highlight>, and <Highlight>algorithms</Highlight>.
                </p>
                <p>
                  I specialize in full-stack development, working with technologies like <Highlight>React</Highlight>, <Highlight>Node.js</Highlight>, and <Highlight>MongoDB</Highlight>, <Highlight>PHP</Highlight>, <Highlight>MySQL</Highlight>. I enjoy building responsive and dynamic web applications that solve real-world problems.
                </p>
              </AboutText>

              <PersonalInfoGrid>
                {personalInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    custom={index}
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <InfoItem>
                      <InfoLabel>{info.label}:</InfoLabel>
                      <InfoValue>{info.value}</InfoValue>
                    </InfoItem>
                  </motion.div>
                ))}
              </PersonalInfoGrid>

              <AboutDownloadButton 
                href="https://drive.google.com/file/d/1Zk6exmbvGmT4GAFxp-hhKAqUUAat0vkO/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View CV
              </AboutDownloadButton>
            </AboutInfo>
          </ScrollReveal>
        </AboutContent>

        <TimelineSection>
          <ScrollReveal>
            <TimelineTitle>My Journey</TimelineTitle>
          </ScrollReveal>
          
          <Timeline>
            <TimelineProgress />
            
            {[
              {
                year: '2024',
                title: 'Central CoalFields Limited',
                subtitle: 'System Trainee',
                description: 'Developed the "Nurturing Intellects" donation platform using HTML, CSS, JavaScript, SQL and PHP to assist underprivileged children.',
                icon: <FaBriefcase />
              },
              {
                year: '2023',
                title: 'Central Mine Planning and Design Institute',
                subtitle: 'System Trainee',
                description: 'Created an employee registration and login panel using PHP along with the admin panel to manage the registered employees.',
                icon: <FaBriefcase />
              },
              {
                year: '2022',
                title: 'Started B.Tech in CSE',
                subtitle: 'KIIT University, Bhubaneswar',
                description: 'Began studying Computer Science Engineering with a focus on programming and web development technologies.',
                icon: <FaUserGraduate />
              },
              {
                year: '2021',
                title: 'Completed Class XII',
                subtitle: 'Jawahar Vidya Mandir, Shyamali, Ranchi',
                description: 'Achieved 93% in CBSE Class XII examinations.',
                icon: <FaUserGraduate />
              },
              {
                year: '2020',
                title: 'Completed Class X',
                subtitle: 'St. Francis School, Ranchi',
                description: 'Achieved 97% in AISSE Class X examinations.',
                icon: <FaUserGraduate />
              },
            ].map((item, index) => (
              <TimelineItem key={index}>
                <ScrollReveal direction="right" delay={0.2 * index}>
                  <TimelineYear>
                    <YearBadge>{item.year}</YearBadge>
                  </TimelineYear>
                </ScrollReveal>
                
                <TimelineConnector>
                  <TimelineDot>
                    {item.icon}
                  </TimelineDot>
                </TimelineConnector>
                
                <ScrollReveal direction="left" delay={0.1 + (0.2 * index)}>
                  <TimelineContent>
                    <TimelineItemTitle>{item.title}</TimelineItemTitle>
                    <TimelineItemSubtitle>{item.subtitle}</TimelineItemSubtitle>
                    <TimelineItemText>{item.description}</TimelineItemText>
                  </TimelineContent>
                </ScrollReveal>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>
      </div>
    </StyledAbout>
  );
};

const StyledAbout = styled.section`
  background-color: var(--background);
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.03) 0%, rgba(var(--secondary-color-rgb), 0.03) 100%);
    clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);
    z-index: -1;
  }
`;

const SectionHeader = styled.div`
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 50%
  );
`;

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const AboutStat = styled.div`
  background-color: var(--card-bg);
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 1.75rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const StatContent = styled.div``;

const StatTitle = styled.h4`
  font-size: 0.9rem;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;

const StatText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const AboutText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const Highlight = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const PersonalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const AboutDownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  text-decoration: none;
`;

const TimelineSection = styled.div`
  margin-top: 6rem;
  padding: 6rem 0;
  background-color: rgba(var(--card-bg-rgb), 0.5);
`;

const TimelineTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    border-radius: 3px;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineProgress = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: var(--border-color);
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const TimelineYear = styled.div`
  flex: 1;
  text-align: right;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const YearBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  font-weight: 600;
  border-radius: 4px;
`;

const TimelineConnector = styled.div`
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TimelineDot = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 5px rgba(var(--primary-color-rgb), 0.2);
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
  }
`;

const TimelineContent = styled.div`
  background: var(--card-bg);
  border-radius: 1rem;
  padding: 1.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-left: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const TimelineItemTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const TimelineItemSubtitle = styled.h4`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const TimelineItemText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.8;
`;

export default About; 