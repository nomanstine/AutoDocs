import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, Heart, Users, Zap, Target, MapPin, X, Star, Award, Eye, Laptop, ComputerIcon, Crown, GraduationCap } from 'lucide-react';

// Image Modal Component
const ImageModal = ({ isOpen, onClose, developer }) => {
  if (!isOpen || !developer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mx-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-500" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 hover:rotate-90 transition-all duration-300 shadow-lg group"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
        </button>
        
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
            <img
              src={developer.image}
              alt={developer.name}
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl sm:rounded-2xl object-cover shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative z-10"
            />
          </div>
          
          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8">
            <div className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${developer.color} text-white mb-3 sm:mb-4 animate-pulse`}>
              {developer.role}
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 animate-in slide-in-from-left duration-700">{developer.name}</h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed animate-in slide-in-from-left duration-700 delay-200">{developer.bio}</p>
            
            <div className="mb-4 sm:mb-6 animate-in slide-in-from-left duration-700 delay-300">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">Skills</h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {developer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 text-gray-700 hover:text-gray-900 text-xs sm:text-sm rounded-full font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default animate-in zoom-in duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 animate-in slide-in-from-bottom duration-700 delay-500">
              {developer.github && (
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-lg sm:rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm font-medium group"
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  GitHub
                </a>
              )}
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm font-medium group"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                LinkedIn
              </a>
              <a
                href={`mailto:${developer.email}`}
                className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg sm:rounded-xl hover:bg-red-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm font-medium group"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const founder = {
  id: 1,
  name: "Monishanker Halder",
  role: "Founding Member & Assistant Professor",
  image: "/developer/monishankar_sir.jpeg",
  bio: "Monishanker Halder completed his B.Sc. (Engg.) and M.Sc. (Engg.) in Computer Science and Engineering from Jashore University of Science and Technology in 2013 and 2015 respectively. From April, 2017 he joined as a Lecturer in the department of Computer Science and Engineering at Jashore University of Science and Technology, Bangladesh. His research interest includes Deep learning, Computer Vision, Image Processing, Software Defined Networking, Internet of Things etc.",
  skills: ["Machine learning", "Image Processing", "Computer Vision", "Software Defined Networking", "Internet Of Things"],
  github: "",
  linkedin: "https://www.linkedin.com/in/monishanker-halder-645087100/",
  email: "m.halder@just.edu.bd",
  color: "from-yellow-500 to-rose-600",
  isFounder: true
};

const developers = [
  {
    id: 2,
    name: "Md Saniul Basir Saz",
    role: "Frontend Architect",
    image: "/developer/saniul.png",
    bio: "UI/UX enthusiast who loves crafting beautiful and intuitive interfaces. Expert in modern CSS frameworks and animation libraries with a passion for creating delightful user experiences.",
    skills: ["React", "Tailwind CSS", "Figma"],
    github: "https://github.com/mdsaniulbasirsaz",
    linkedin: "https://www.linkedin.com/in/md-saniul-basir-saz36/",
    email: "saniul.just.cse@gmail.com",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 3,
    name: "Nazmus Sakib Sibly",
    role: "Backend Engineer",
    image: "/developer/sibly.jpg",
    bio: "Backend wizard focused on building scalable and secure systems. Passionate about database optimization and API design with extensive experience in cloud technologies.",
    skills: ["Python", "PostgreSQL", "Docker", "AWS"],
    github: "https://github.com/SakibSibly",
    linkedin: "https://www.linkedin.com/in/SakibSibly",
    email: "200104.cse@student.just.edu.bd",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    name: "Abdullah Al Noman",
    role: "DevOps Specialist",
    image: "/developer/noman.png",
    bio: "Infrastructure enthusiast who ensures our applications run smoothly. Expert in cloud technologies and automation with a focus on scalability and reliability.",
    skills: ["Kubernetes", "CI/CD", "Terraform", "Monitoring"],
    github: "https://github.com/nomanstine",
    linkedin: "https://www.linkedin.com/in/nomanstine/",
    email: "200107.cse@student.just.edu.bd",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 5,
    name: "Durjoy Ghosh",
    role: "DevOps Engineer",
    image: "/developer/durjoy.jpg",
    bio: "Cloud infrastructure specialist with expertise in automation and monitoring. Passionate about creating efficient and scalable development workflows.",
    skills: ["Kubernetes", "CI/CD", "Terraform", "Monitoring"],
    github: "https://github.com/DurjoyGH",
    linkedin: "https://www.linkedin.com/in/",
    email: "200120.cse@student.just.edu.bd",
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: 6,
    name: "Tahmid Muntaser",
    role: "DevOps Engineer",
    image: "/developer/tahmid.jpg",
    bio: "Infrastructure and automation specialist dedicated to creating robust deployment pipelines. Expert in containerization and cloud-native technologies.",
    skills: ["Kubernetes", "CI/CD", "Terraform", "Monitoring"],
    github: "https://github.com/TahmidMuntaser",
    linkedin: "https://www.linkedin.com/in/tahmid-muntaser-518929230/",
    email: "200111.cse@student.just.edu.bd",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 7,
    name: "Sajid Hasan Takbir",
    role: "DevOps Engineer",
    image: "/developer/takbir.jpeg",
    bio: "Infrastructure automation specialist with a passion for creating efficient deployment workflows. Expert in containerization and cloud technologies.",
    skills: ["Docker", "CI/CD", "AWS", "Monitoring"],
    github: "https://github.com/takbir-hasan",
    linkedin: "https://www.linkedin.com/in/sajid-hasan-takbir/",
    email: "200152.cse@student.just.edu.bd",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: 8,
    name: "Md. Rafid Ahmmed",
    role: "Frontend Developer",
    image: "/developer/rafid.jpg",
    bio: "Passionate about creating seamless user experiences with modern web technologies. Specializes in React and Node.js development with a keen eye for detail and performance optimization.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    github: "https://github.com/rafidahmmed",
    linkedin: "https://www.linkedin.com/in/md-rafid-ahmmed-80507a369/",
    email: "rafid.ahmmed.cse@gmail.com",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 9,
    name: "Md. Arafatuzzaman Makky",
    role: "System Administrator",
    image: "/developer/makky.jpg",
    bio: "System reliability expert focused on maintaining robust infrastructure. Specializes in automation and ensuring high availability of our services.",
    skills: ["Linux", "CI/CD", "Docker", "Monitoring"],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/",
    email: "200140.cse@student.just.edu.bd",
    color: "from-indigo-500 to-blue-600"
  }
];

const TeamMemberCard = ({ member, index, isFounder = false, onCardClick }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, cardId) => {
    if (hoveredCard === cardId) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg border ${
        isFounder 
          ? 'border-yellow-200 shadow-yellow-100 ring-2 ring-yellow-300 ring-opacity-50' 
          : 'border-gray-100'
      } hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 group cursor-pointer overflow-hidden`}
      style={{ 
        transform: hoveredCard === member.id 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.05}deg) rotateY(${(mousePosition.x - 150) * 0.05}deg) translateZ(20px)`
          : undefined
      }}
      onMouseEnter={() => setHoveredCard(member.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onMouseMove={(e) => handleMouseMove(e, member.id)}
    >
      {/* Founder Crown Badge */}
      {isFounder && (
        <div className="absolute top-2 right-2 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg animate-bounce">
            <Crown className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Special founder background */}
      {isFounder && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-60"></div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${member.color} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 animate-bounce`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          ></div>
        ))}
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

      {/* Profile Section */}
      <div className="p-6 text-center relative z-10" onClick={() => onCardClick(member)}>
        {/* Profile Image with enhanced effects */}
        <div className="relative mx-auto w-24 h-24 mb-4 group-hover:mb-6 transition-all duration-500">
          <div className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-full animate-spin-slow opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
          <img
            src={member.image}
            alt={member.name}
            className={`relative z-10 w-full h-full rounded-full object-cover border-4 ${
              isFounder ? 'border-yellow-300' : 'border-white'
            } shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-6 group-hover:border-opacity-80`}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          {/* Floating icons around profile */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            {isFounder ? (
              <GraduationCap className="w-5 h-5 text-yellow-500 animate-pulse" />
            ) : (
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            )}
          </div>
          <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
            <ComputerIcon className="w-5 h-5 text-blue-500 animate-bounce" />
          </div>
        </div>
        
        {/* Name with typewriter effect simulation */}
        <h3 className={`text-lg font-bold mb-1 group-hover:text-xl transition-all duration-300 ${
          isFounder ? 'text-yellow-900' : 'text-gray-900'
        }`}>
          {member.name}
        </h3>
        
        {/* Role with animated underline */}
        <div className="relative inline-block mb-3">
          <p className={`text-sm font-medium transition-colors duration-300 ${
            isFounder 
              ? 'text-yellow-700 group-hover:text-yellow-800' 
              : 'text-gray-500 group-hover:text-gray-700'
          }`}>
            {member.role}
          </p>
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${member.color} w-0 group-hover:w-full transition-all duration-500`}></div>
        </div>

        {/* Bio with reveal animation */}
        <p className="text-xs text-gray-600 mb-4 line-clamp-3 px-2 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 transform group-hover:scale-105">
          {member.bio}
        </p>
        
        {/* Skills with enhanced hover effects */}
        <div className="mb-6 transform group-hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-wrap gap-1 justify-center">
            {member.skills.slice(0, 3).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="inline-block bg-gray-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 text-gray-600 hover:text-gray-800 text-xs px-2 py-1 rounded-md font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-md cursor-default"
              >
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="inline-block bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 text-xs px-2 py-1 rounded-md font-medium hover:scale-110 transition-transform duration-300 cursor-default">
                +{member.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Social Links with advanced animations */}
        <div className="flex justify-center space-x-3 transform group-hover:scale-110 transition-all duration-300">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 hover:rotate-12 hover:shadow-lg group/social"
            >
              <Github className="w-4 h-4 group-hover/social:animate-bounce" />
            </a>
          )}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 hover:rotate-12 hover:shadow-lg group/social delay-75"
          >
            <Linkedin className="w-4 h-4 group-hover/social:animate-bounce" />
          </a>
          <a
            href={`mailto:${member.email}`}
            className="p-2 bg-gray-100 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 hover:rotate-12 hover:shadow-lg group/social delay-150"
          >
            <Mail className="w-4 h-4 group-hover/social:animate-bounce" />
          </a>
        </div>

        {/* View Details Button */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200">
          <button className={`inline-flex items-center px-4 py-2 text-white text-xs font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
            isFounder 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-600' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600'
          }`}>
            <Eye className="w-3 h-3 mr-1" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const AboutFounders = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate founder first, then developers
    const timer = setTimeout(() => {
      setVisibleCards(prev => [...prev, 'founder']);
      developers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, (index + 1) * 200);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const openModal = (developer) => {
    setSelectedDeveloper(developer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDeveloper(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8 mt-14 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 mb-6 tracking-tight animate-in slide-in-from-top duration-1000">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse">Amazing</span> Team
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent animate-pulse"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 animate-in slide-in-from-bottom duration-1000 delay-300">
            Led by our founding member and developed by passionate students, we're dedicated to making academic document access seamless and secure for everyone.
          </p>
        </div>

        {/* Founding Member Section */}
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-center text-indigo-900 mb-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="relative flex items-center justify-center gap-3">
              <Crown className="w-10 h-10 text-yellow-500" />
              Founding Member
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Our visionary leader and academic mentor who conceived the idea and guides the project
          </p>
          
          <div className="flex justify-center">
            <div className={`w-full max-w-sm transition-all duration-1000 ${
              visibleCards.includes('founder')
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-90'
            }`}>
              <TeamMemberCard 
                member={founder} 
                index={0} 
                isFounder={true} 
                onCardClick={openModal}
              />
            </div>
          </div>
        </div>

        {/* Development Team Section */}
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-center text-indigo-900 mb-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="relative flex items-center justify-center gap-3">
              <Code className="w-10 h-10 text-blue-500" />
              Development Team
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Talented students and developers who bring the vision to life with cutting-edge technology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.map((developer, index) => (
              <div
                key={developer.id}
                className={`transition-all duration-1000 ${
                  visibleCards.includes(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
                }`}
                style={{ 
                  transitionDelay: `${(index + 2) * 150}ms`
                }}
              >
                <TeamMemberCard 
                  member={developer} 
                  index={index + 1} 
                  isFounder={false} 
                  onCardClick={openModal}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center transition-all duration-1000 delay-1000 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full translate-x-20 translate-y-20 animate-pulse delay-1000"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6 animate-in slide-in-from-bottom duration-700">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200">
              At CSE Digital Hub, we believe that accessing your academic documents shouldn't be a hassle. 
              Our mission is to bridge the gap between educational institutions and students by providing 
              a seamless, secure, and efficient platform for document management and retrieval.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "🚀", title: "Innovation", desc: "Leveraging cutting-edge technology to simplify academic processes", color: "from-blue-50 to-blue-100", delay: "delay-300" },
                { icon: "🔒", title: "Security", desc: "Ensuring your personal and academic data is always protected", color: "from-yellow-50 to-yellow-100", delay: "delay-500" },
                { icon: "⚡", title: "Efficiency", desc: "Streamlining document access to save you time and effort", color: "from-green-50 to-green-100", delay: "delay-700" }
              ].map((item, index) => (
                <div key={index} className={`p-6 bg-gradient-to-br ${item.color} rounded-2xl hover:shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group animate-in zoom-in duration-700 ${item.delay}`}>
                  <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{item.icon}</div>
                  <h3 className="font-semibold text-indigo-900 mb-2 group-hover:text-xl transition-all duration-300">{item.title}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Want to Get in Touch?</h2>
          <p className="text-gray-600 mb-6">We'd love to hear from you! Reach out to any of our team members.</p>
          <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Mail className="w-5 h-5 mr-2" />
            Contact Our Team
          </button>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        developer={selectedDeveloper} 
      />
    </div>
  );
};

export default AboutFounders;