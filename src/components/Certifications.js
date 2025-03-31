import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import intel from './intel.png';
import udemy from './udemy.png';
import aws from './aws.png';
import aicte from './aicte.webp';
const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const certifications = [
    {
      id: 1,
      title: 'Intel Unnati Industrial Training Program',
      issuer: 'Intel',
      date: 'July 2024',
      description: 'Certification for completing the Intel Unnati Industrial Training Program on Pixel Detection and correction.',
      image: intel,
      credentialLink: 'https://drive.google.com/file/d/1ZiGW4fRqBkw711QggebT3Au8K9mGWNzV/view?usp=sharing',
    },
    {
      id: 2,
      title: 'AWS Cloud Architecture',
      issuer: 'AWS',
      date: 'December 2024',
      description: 'Certification for completing the AWS Cloud Architecture course.AWS Academy Cloud Architecture covers advanced AWS services, architectural best practices, security, and scalability, preparing learners for cloud solution design and AWS certifications.',
      image: aws,
      credentialLink: 'https://drive.google.com/file/d/11QXafZNtsZVUQs_fd9A_pXFfTbpyaqPx/view?usp=drive_link',
    },
    {
      id: 3,
      title: 'AWS Cloud Foundations',
      issuer: 'AWS',
      date: 'November 2024',
      description: 'Certification for completing the AWS Cloud Foundations course.AWS Academy Cloud Foundations covers essential AWS services, core concepts, and foundational skills for cloud computing.',
      image: aws,
      credentialLink: 'https://drive.google.com/file/d/1ZhIzE9OjWrIQD229HNmycPvBeWtRyhCZ/view?usp=sharing',
    },
    {
      id: 4,
      title: 'AICTE Virtual Internship',
      issuer: 'AICTE',
      date: 'December 2024',
      description: 'Completed the AICTE Virtual Internship on CLoud Computing.',
      image: aicte,
      credentialLink: 'https://drive.google.com/file/d/1ZoKABhKXa2d51TKVJU1_DOpUvjqHDXvj/view?usp=sharing',
    },
    {
      id: 5,
      title: 'Snowflake Certfication',
      issuer: 'Udemy',
      date: 'February 2025',
      description: 'Completed the Snowflake Certification course on Udemy.Udemy Snowflake Course covers Snowflake architecture, data warehousing, SQL querying, and performance optimization, building expertise in cloud-based data analytics.',
      image: udemy,
      credentialLink: 'https://drive.google.com/file/d/1OY1jBDisQWrsY5uNqERRRK0Vd1KqVEy_/view?usp=sharing',
    },
  ];

  const nextCertificate = () => {
    setActiveIndex((prev) => (prev === certifications.length - 1 ? 0 : prev + 1));
  };

  const prevCertificate = () => {
    setActiveIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1));
  };

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const slideVariants = {
    hidden: (direction) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? '-100%' : '100%',
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      };
    },
  };

  return (
    <StyledCertifications id="certifications">
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My Certifications
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional development & achievements
          </SectionSubtitle>
        </SectionHeader>

        <CertificationSlider>
          <SliderNavigation>
            <NavButton 
              onClick={prevCertificate}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft />
            </NavButton>
            <NavDots>
              {certifications.map((cert, index) => (
                <NavDot 
                  key={cert.id}
                  isActive={index === activeIndex}
                  onClick={() => goToIndex(index)}
                />
              ))}
            </NavDots>
            <NavButton 
              onClick={nextCertificate}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight />
            </NavButton>
          </SliderNavigation>

          <SliderContent>
            <CertCard
              key={activeIndex}
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <CertImageSection>
                <CertImage 
                  src={certifications[activeIndex].image || 'https://via.placeholder.com/400x300?text=Certificate'} 
                  alt={certifications[activeIndex].title} 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </CertImageSection>
              <CertInfo>
                <CertTitle>{certifications[activeIndex].title}</CertTitle>
                <CertMeta>
                  <CertIssuer>{certifications[activeIndex].issuer}</CertIssuer>
                  <CertDate>{certifications[activeIndex].date}</CertDate>
                </CertMeta>
                <CertDescription>{certifications[activeIndex].description}</CertDescription>
                <ViewCertButton 
                  href={certifications[activeIndex].credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Certificate <FiExternalLink />
                </ViewCertButton>
              </CertInfo>
            </CertCard>
          </SliderContent>
        </CertificationSlider>

        <CertificationGrid
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => (
            <CertGridItem key={cert.id}>
              <CertGridTitle>{cert.title}</CertGridTitle>
              <CertGridIssuer>{cert.issuer}</CertGridIssuer>
            </CertGridItem>
          ))}
        </CertificationGrid>
      </div>
    </StyledCertifications>
  );
};

const StyledCertifications = styled.section`
  background-color: var(--background);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const CertificationSlider = styled.div`
  max-width: 900px;
  margin: 0 auto 4rem;
  position: relative;
`;

const SliderNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const NavButton = styled(motion.button)`
  background-color: var(--card-bg);
  color: var(--primary-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const NavDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--border-color)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    transform: scale(1.2);
  }
`;

const SliderContent = styled.div`
  height: 400px;
  perspective: 1000px;
`;

const CertCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const CertImageSection = styled.div`
  height: 100%;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CertImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CertInfo = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const CertTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const CertMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CertIssuer = styled.span`
  font-weight: 500;
  color: var(--primary-color);
`;

const CertDate = styled.span`
  color: var(--text-color);
  opacity: 0.7;
`;

const CertDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const ViewCertButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const CertificationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const CertGridItem = styled.div`
  padding: 1.5rem;
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CertGridTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const CertGridIssuer = styled.p`
  font-size: 0.9rem;
  color: var(--primary-color);
`;

export default Certifications; 