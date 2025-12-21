import { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Check, AlertCircle } from 'lucide-react';
import FAQ from '../components/contact/Faq';
import ContactInfo from '../components/contact/ContactInfo';

// Single Responsibility Principle - Contact form component
const ContactForm = ({ onSubmit, formStatus }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Please enter your name';
      case 'email':
        if (!value.trim()) return 'Please enter your email address';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        return value.trim() ? '' : 'Please enter a subject';
      case 'message':
        return value.trim() ? '' : 'Please enter your message';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if the field has been touched
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched and validate
    const newTouched = {};
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    if (isValid) {
      onSubmit(formData);
    }
  };

  const LabelWithRequired = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      <span className="text-red-500 ml-1">*</span>
    </label>
  );

  const getInputClassName = (fieldName) => {
    const baseClasses = "block w-full pl-10 pr-3 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-yellow-300 transition-all";
    
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClasses} border-red-300 focus:ring-red-200 focus:border-red-300`;
    }
    
    return `${baseClasses} border-yellow-300`;
  };

  const getTextareaClassName = (fieldName) => {
    const baseClasses = "block w-full pl-10 pr-3 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-yellow-300 transition-all";
    
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClasses} border-red-300 focus:ring-red-200 focus:border-red-300`;
    }
    
    return `${baseClasses} border-yellow-300`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">Send Us a Message</h2>
      
      {formStatus === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
          <Check className="text-green-500 mr-3" size={24} />
          <p className="text-green-700">Your message has been sent successfully! We'll get back to you soon.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>
          </div>
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <LabelWithRequired htmlFor="name">Your Name</LabelWithRequired>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className={touched.name && errors.name ? "text-red-400" : "text-gray-400"} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName("name")}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div>
                <LabelWithRequired htmlFor="email">Email Address</LabelWithRequired>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className={touched.email && errors.email ? "text-red-400" : "text-gray-400"} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName("email")}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Subject Field */}
              <div>
                <LabelWithRequired htmlFor="subject">Subject</LabelWithRequired>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClassName("subject")} pl-4`}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                {touched.subject && errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div>
                <LabelWithRequired htmlFor="message">Your Message</LabelWithRequired>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageSquare size={18} className={touched.message && errors.message ? "text-red-400" : "text-gray-400"} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getTextareaClassName("message")}
                    placeholder="Enter your detailed message here..."
                    required
                  />
                </div>
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition-colors duration-200 flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

// Dependency Inversion - Service layer for contact form submissions
const useContactService = () => {
  const submitContactForm = (formData) => {
    // In a real implementation, this would be an API call
    console.log('Form submitted with data:', formData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
  
  return { submitContactForm };
};

// Main Contact Page component
const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);
  const contactService = useContactService();
  
  const handleFormSubmit = async (formData) => {
    try {
      const result = await contactService.submitContactForm(formData);
      if (result.success) {
        setFormStatus('success');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight">
            Get in Touch with <span className="text-yellow-500">CSE</span> Digital Hub
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions about our services or need assistance? Our team is here to help you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactForm onSubmit={handleFormSubmit} formStatus={formStatus} />
          <div className="space-y-8">
            <ContactInfo />
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Find Us</h2>
          <iframe 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[500px] w-full" 
            src="https://maps.google.com/maps?q=Jashore+University+of+Science+and+Technology&amp;t=k&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            title="Our Location"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;