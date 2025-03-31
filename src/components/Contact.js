import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import ScrollReveal from '../animations/ScrollReveal';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.from_name.trim()) newErrors.from_name = 'Name is required';
    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.from_email)) {
      newErrors.from_email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Send email directly from form reference using environment variables
      emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current
      )
      .then((response) => {
        console.log('Email sent successfully!', response);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: '',
        });
        
        // Reset success message after a while
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setIsSubmitting(false);
        setSubmitError('Failed to send email. Please try again later.');
      });
    }
  };

  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/harsh-shandilya-b63b87358', name: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/HarshShandilya16', name: 'GitHub' },
    { icon: <FaTwitter />, url: 'https://twitter.com/', name: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/', name: 'Instagram' },
  ];

  const contactInfo = [
    { icon: <FiMail />, text: 'harshshandilya1605@gmail.com', type: 'Email' },
    { icon: <FiPhone />, text: '+91 9263372595', type: 'Phone' },
    { icon: <FiMapPin />, text: 'Bhubaneswar, India', type: 'Location' },
  ];

  return (
    <StyledContact id="contact" ref={containerRef}>
      <ContactBackground />
      
      <div className="container">
        <ScrollReveal>
          <SectionHeader>
            <SectionTitle>Get In Touch</SectionTitle>
            <SectionSubtitle>Let's work together</SectionSubtitle>
          </SectionHeader>
        </ScrollReveal>

        <ContactContent>
          <ContactInfoSection>
            <ScrollReveal direction="left" delay={0.2}>
              <ContactInfo>
                <ContactInfoHeader>
                  <motion.h3 style={{ y: textY, opacity: textOpacity }}>
                    Let's discuss your project
                  </motion.h3>
                  <ContactDescription>
                    I'm currently pursuing my Bachelor's degree at KIIT University while actively working on exciting projects. 
                    Feel free to reach out if you want to collaborate or discuss potential opportunities.
                  </ContactDescription>
                </ContactInfoHeader>

                <ContactDetails>
                  {contactInfo.map((info, index) => (
                    <ContactDetail key={index}>
                      <ContactDetailIcon>{info.icon}</ContactDetailIcon>
                      <ContactDetailText>
                        <ContactDetailType>{info.type}:</ContactDetailType>
                        <ContactDetailValue>{info.text}</ContactDetailValue>
                      </ContactDetailText>
                    </ContactDetail>
                  ))}
                </ContactDetails>

                <SocialLinks>
                  <SocialTitle>Find me on:</SocialTitle>
                  <SocialIconsWrapper>
                    {socialLinks.map((social, index) => (
                      <SocialIcon 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        {social.icon}
                      </SocialIcon>
                    ))}
                  </SocialIconsWrapper>
                </SocialLinks>
              </ContactInfo>
            </ScrollReveal>
          </ContactInfoSection>

          <ScrollReveal direction="right" delay={0.4}>
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <FormHeader>Send a Message</FormHeader>
              
              <FormFieldGroup>
                <FormField>
                  <FormLabel>Your Name</FormLabel>
                  <FormInput 
                    type="text" 
                    name="from_name" 
                    value={formData.from_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    hasError={!!errors.from_name}
                  />
                  {errors.from_name && <ErrorMessage>{errors.from_name}</ErrorMessage>}
                </FormField>
                
                <FormField>
                  <FormLabel>Your Email</FormLabel>
                  <FormInput 
                    type="email" 
                    name="from_email" 
                    value={formData.from_email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    hasError={!!errors.from_email}
                  />
                  {errors.from_email && <ErrorMessage>{errors.from_email}</ErrorMessage>}
                </FormField>
              </FormFieldGroup>
              
              <FormField>
                <FormLabel>Subject</FormLabel>
                <FormInput 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  hasError={!!errors.subject}
                />
                {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FormLabel>Message</FormLabel>
                <FormTextarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello! I'd like to discuss a potential project..."
                  rows="5"
                  hasError={!!errors.message}
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </FormField>
              
              {/* Hidden field for recipient email */}
              <input type="hidden" name="to_email" value="harshshandilya1605@gmail.com" />
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <ButtonLoader />
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </SubmitButton>
              
              {submitSuccess && (
                <SuccessMessage 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Your message has been sent successfully!
                </SuccessMessage>
              )}
              
              {submitError && (
                <ErrorMessage 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitError}
                </ErrorMessage>
              )}
            </ContactForm>
          </ScrollReveal>
        </ContactContent>
      </div>
    </StyledContact>
  );
};

const StyledContact = styled.section`
  background-color: var(--background);
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const ContactBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: radial-gradient(circle at 80% 20%, rgba(var(--primary-color-rgb), 0.1) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(var(--secondary-color-rgb), 0.1) 0%, transparent 50%);
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactInfoHeader = styled.div`
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
`;

const ContactDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-color);
  opacity: 0.9;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ContactDetailIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1rem;
  flex-shrink: 0;
`;

const ContactDetailText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactDetailType = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;

const ContactDetailValue = styled.span`
  font-size: 1rem;
  color: var(--text-color);
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
`;

const SocialTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const SocialIconsWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
  }
`;

const ContactForm = styled.form`
  background: var(--card-bg);
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
`;

const FormFieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${props => props.hasError ? 'var(--error-color)' : 'var(--border-color)'};
  background-color: var(--background);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.2);
  }
  
  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${props => props.hasError ? 'var(--error-color)' : 'var(--border-color)'};
  background-color: var(--background);
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.2);
  }
  
  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

const ErrorMessage = styled(motion.span)`
  font-size: 0.8rem;
  color: var(--error-color);
  margin-top: 0.25rem;
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ButtonLoader = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 1rem;
  background-color: rgba(var(--success-color-rgb), 0.1);
  border: 1px solid var(--success-color);
  border-radius: 0.5rem;
  color: var(--success-color);
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
`;

export default Contact; 