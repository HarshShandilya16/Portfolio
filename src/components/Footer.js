import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledFooter>
      <FooterGlow />
      <div className="container">
        <FooterContent>
          <FooterTop>
            <FooterLogoSection>
              <FooterLogo>HS</FooterLogo>
              <FooterTagline>
                Creating digital experiences with passion
              </FooterTagline>
            </FooterLogoSection>
            
            <FooterNav>
              <FooterNavColumn>
                <FooterNavTitle>Navigation</FooterNavTitle>
                <FooterLink href="#home">Home</FooterLink>
                <FooterLink href="#about">About</FooterLink>
                <FooterLink href="#skills">Skills</FooterLink>
              </FooterNavColumn>
              <FooterNavColumn>
                <FooterNavTitle>Portfolio</FooterNavTitle>
                <FooterLink href="#projects">Projects</FooterLink>
                <FooterLink href="#certifications">Certifications</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
              </FooterNavColumn>
            </FooterNav>
            
            <FooterContact>
              <FooterNavTitle>Connect</FooterNavTitle>
              <SocialLinks>
                <SocialLink
                  href="https://www.linkedin.com/in/harsh-shandilya-b63b87358"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{ y: -5, backgroundColor: '#0077B5', color: '#fff' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiLinkedin />
                </SocialLink>
                <SocialLink
                  href="https://github.com/HarshShandilya16"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  whileHover={{ y: -5, backgroundColor: '#333', color: '#fff' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGithub />
                </SocialLink>
                <SocialLink
                  href="mailto:harshshandilya1605@gmail.com"
                  aria-label="Email"
                  whileHover={{ y: -5, backgroundColor: '#EA4335', color: '#fff' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiMail />
                </SocialLink>
              </SocialLinks>
              <ContactInfo>harshshandilya1605@gmail.com</ContactInfo>
            </FooterContact>
          </FooterTop>
          
          <FooterDivider 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <FooterBottom>
            <Copyright>
              &copy; {currentYear} Harsh Shandilya. All rights reserved.
            </Copyright>
            <FooterMadeWith>
              Made with <FiHeart style={{ color: 'var(--primary-color)' }} /> and modern web technologies
            </FooterMadeWith>
            <ScrollTopButton
              onClick={scrollToTop}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(var(--primary-color-rgb), 0.5)' }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FiArrowUp />
            </ScrollTopButton>
          </FooterBottom>
        </FooterContent>
      </div>
    </StyledFooter>
  );
};

const FooterGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(var(--primary-color-rgb), 0),
    rgba(var(--primary-color-rgb), 0.5),
    rgba(var(--secondary-color-rgb), 0.5),
    rgba(var(--primary-color-rgb), 0)
  );
  z-index: 1;
`;

const StyledFooter = styled.footer`
  background-color: var(--card-bg);
  padding: 5rem 0 2rem;
  position: relative;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.05);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to top, rgba(var(--background-rgb), 0), rgba(var(--primary-color-rgb), 0.02));
    pointer-events: none;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterLogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogo = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  box-shadow: 0 4px 15px rgba(var(--primary-color-rgb), 0.3);
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;

const FooterTagline = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  font-size: 1rem;
  max-width: 250px;
`;

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-column: span 2;
  }
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const FooterNavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterNavTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
  
  &:before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 992px) {
    grid-column: 2;
    grid-row: 1;
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

const ContactInfo = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  font-size: 0.9rem;
`;

const FooterLink = styled.a`
  color: var(--text-color);
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: var(--primary-color);
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  color: var(--text-color);
  background-color: rgba(var(--border-color-rgb), 0.3);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FooterDivider = styled(motion.div)`
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(var(--border-color-rgb), 0),
    rgba(var(--border-color-rgb), 0.5),
    rgba(var(--border-color-rgb), 0)
  );
  margin: 3rem 0 2rem;
  transform-origin: left;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.9rem;
`;

const FooterMadeWith = styled.p`
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScrollTopButton = styled(motion.button)`
  background: linear-gradient(
    to right bottom,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
  font-size: 1.2rem;
`;

export default Footer; 