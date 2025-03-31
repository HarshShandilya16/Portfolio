import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  
  // Remove these variables for the interactive logo particles
  const logoRef = useRef(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  // Handle scroll events to update navbar style
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Close menu when clicking a link
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Check if section is in viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Nav items
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <NavbarContainer scrolled={scrolled}>
      <NavbarGlow />
      <NavbarContent>
        <LogoLink to="/">
          <LogoContainer
            ref={logoRef}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo>HS</Logo>
          </LogoContainer>
        </LogoLink>
        
        <DesktopNav>
          <NavItems>
            {navItems.map((item, index) => (
              <NavItem key={index}>
                <NavLink 
                  href={item.href}
                  isActive={activeSection === item.href.slice(1)}
                  onClick={closeMenu}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <ActiveIndicator 
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                </NavLink>
              </NavItem>
            ))}
          </NavItems>
          
          <ThemeToggle 
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </ThemeToggle>
        </DesktopNav>
        
        <MobileNav>
          <ThemeToggle 
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </ThemeToggle>
          
          <MenuButton 
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </MenuButton>
          
          <MobileMenu 
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: { opacity: 1, y: 0 },
              closed: { opacity: 0, y: -20, pointerEvents: 'none' }
            }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavItems>
              {navItems.map((item, index) => (
                <MobileNavItem 
                  key={index}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 }
                  }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <MobileNavLink 
                    href={item.href}
                    isActive={activeSection === item.href.slice(1)}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </MobileNavLink>
                </MobileNavItem>
              ))}
            </MobileNavItems>
          </MobileMenu>
        </MobileNav>
      </NavbarContent>
    </NavbarContainer>
  );
};

const NavbarGlow = styled.div`
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

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${props => props.scrolled ? '0.75rem 0' : '1.25rem 0'};
  background-color: ${props => 
    props.scrolled 
      ? 'rgba(var(--background-rgb), 0.8)' 
      : 'rgba(var(--background-rgb), 0)'
  };
  backdrop-filter: ${props => props.scrolled ? 'blur(12px)' : 'none'};
  box-shadow: ${props => 
    props.scrolled 
      ? '0 5px 20px rgba(0, 0, 0, 0.15)' 
      : 'none'
  };
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: ${props => 
    props.scrolled 
      ? '1px solid rgba(var(--border-color-rgb), 0.1)' 
      : 'none'
  };
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  z-index: 1001;
  position: relative;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  width: 40px;
  height: 40px;
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
  overflow: visible;
  isolation: isolate;
  
  &:after {
    content: '';
    position: absolute;
    inset: -10px;
    background: radial-gradient(
      circle at center,
      rgba(var(--primary-color-rgb), 0.6) 0%,
      rgba(var(--secondary-color-rgb), 0.3) 40%,
      transparent 70%
    );
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
    animation: pulse 2s infinite alternate;
  }
  
  &:hover:after {
    opacity: 1;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.9);
      opacity: 0.3;
    }
    100% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
`;

const Logo = styled.div`
  color: white;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  animation: colorShift 8s infinite alternate;
  
  @keyframes colorShift {
    0% {
      filter: hue-rotate(0deg) brightness(1);
    }
    50% {
      filter: hue-rotate(30deg) brightness(1.2);
    }
    100% {
      filter: hue-rotate(0deg) brightness(1);
    }
  }
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
`;

const NavItem = styled.li`
  margin: 0 0.25rem;
`;

const NavLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  position: relative;
  transition: color 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.05);
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  border-radius: 2px;
`;

const ThemeToggle = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.6rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, background 0.3s ease;
  border-radius: 50%;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.1);
  }
`;

const MobileNav = styled.div`
  display: none;
  align-items: center;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(var(--background-rgb), 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const MobileNavItems = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const MobileNavItem = styled(motion.li)`
  width: 100%;
  text-align: center;
`;

const MobileNavLink = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.isActive ? 1 : 0});
    width: 40px;
    height: 2px;
    background: linear-gradient(
      to right,
      var(--primary-color),
      var(--secondary-color)
    );
    transition: transform 0.3s ease;
    border-radius: 2px;
  }
  
  &:hover {
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.05);
    
    &:after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

export default Navbar; 