import { useState, useRef, useEffect } from 'react';
import { Users, Book, Award, Clock, MessageSquare, MapPin, Mail, Phone, Github, Linkedin, X, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mission = {
  "description": "At CSE Digital Hub, we aim to simplify the academic document retrieval process for all Computer Science & Engineering students and alumni. Our mission is to provide a seamless, secure, and efficient platform that eliminates traditional bureaucratic hurdles",
  "quote": "We believe that accessing your academic achievements should be straightforward. Your success is our priority.",
}

const vision = {
  "description": "We envision a future where all educational institutions embrace digital transformation, making document retrieval instant and paperless. CSE Digital Hub strives to be at the forefront of this revolution, setting new standards for academic service delivery.",
}

const teamData = {
  foundingMembers: [
    {
      id: 1,
      name: "Monishanker Halder",
      role: "Founding Member & Assistant Professor",
      image: "/developer/monishankar_sir.jpeg",
      color: "from-yellow-500 to-rose-600",
      isFounder: true
    },
  ],
  developers: [
    {
      id: 2,
      name: "Md Saniul Basir Saz",
      role: "Frontend Architect",
      image: "/developer/saniul.png",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 3,
      name: "Nazmus Sakib Sibly",
      role: "Backend Engineer",
      image: "/developer/sibly.jpg",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      name: "Abdullah Al Noman",
      role: "DevOps Specialist",
      image: "/developer/noman.png",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "Durjoy Ghosh",
      role: "DevOps Engineer",
      image: "/developer/durjoy.jpg",
      color: "from-teal-500 to-cyan-600"
    },
    {
      id: 6,
      name: "Tahmid Muntaser",
      role: "DevOps Engineer",
      image: "/developer/tahmid.jpg",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 7,
      name: "Sajid Hasan Takbir",
      role: "DevOps Engineer",
      image: "/developer/takbir.jpeg",
      color: "from-rose-500 to-pink-600"
    },
    {
      id: 8,
      name: "Md. Rafid Ahmmed",
      role: "Frontend Developer",
      image: "/developer/rafid.jpg",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 9,
      name: "Md. Arafatuzzaman Makky",
      role: "System Administrator",
      image: "/developer/makky.jpg",
      color: "from-indigo-500 to-blue-600"
    }
  ]
}

const PageHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight">
      {title} <span className="text-yellow-500">CSE</span> Digital Hub
    </h1>
    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const HeroBanner = () => (
  <div className="relative h-64 bg-indigo-900">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-800 opacity-90"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-2">Simplifying Academic Document Access</h2>
        <p className="text-yellow-300 text-lg">Making your academic journey smoother since 2025</p>
      </div>
    </div>
  </div>
);

const TabNavigation = ({ activeTab, onTabChange, tabs }) => (
  <div className="border-b border-gray-200">
    <nav className="flex overflow-x-auto py-2 justify-center md:justify-between">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-4 py-2 mr-1 font-medium text-sm rounded-t-lg transition ${
            activeTab === tab.id
              ? 'text-indigo-900 bg-yellow-100 border-b-2 border-yellow-500'
              : 'text-gray-600 hover:text-indigo-700 hover:bg-gray-50'
          }`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  </div>
);

const MissionContent = () => (
  <div className="animate-fadeIn">
    <h3 className="text-2xl font-bold text-indigo-900 mb-4">Our Mission</h3>
    <p className="text-gray-700 mb-4">
      {mission.description}
    </p>
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mt-6">
      <p className="font-medium text-yellow-800">
        "{mission.quote}"
      </p>
    </div>
  </div>
);

const VisionContent = () => (
  <div className="animate-fadeIn">
    <h3 className="text-2xl font-bold text-indigo-900 mb-4">Our Vision</h3>
    <p className="text-gray-700 mb-4">
      {vision.description}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <VisionCard title="Innovation" description="Constantly improving our platform with cutting-edge technology" />
      <VisionCard title="Accessibility" description="Making documents available anytime, anywhere" />
      <VisionCard title="Security" description="Ensuring your personal and academic data remains protected" />
    </div>
  </div>
);

const VisionCard = ({ title, description }) => (
  <div className="bg-indigo-50 p-4 rounded-lg">
    <h4 className="font-bold text-indigo-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const TeamMemberCard = ({ member, isFounder = false }) => (
  <div className={`text-center ${isFounder ? 'mb-8' : 'mb-4'} bg-white rounded-lg p-4 `}>
    <div className={`relative mx-auto mb-3 ${isFounder ? 'w-32 h-32' : 'w-24 h-24'}`}>
      <img 
        src={member.image} 
        alt={member.name}
        className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm hover:shadow-md transition-shadow"
      />
      {isFounder && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
          Founder
        </div>
      )}
    </div>
    <h4 className={`font-bold text-indigo-900 ${isFounder ? 'text-lg' : 'text-base'} mb-1`}>
      {member.name}
    </h4>
    <p className={`text-gray-600 ${isFounder ? 'text-base' : 'text-sm'} mb-3`}>
      {member.role}
    </p>
  </div>
);

const CircularTeamMember = ({ member, position, totalMembers, centerX = 200, centerY = 200, radius = 150, rotation = 0 }) => {
  const angle = (position * 2 * Math.PI) / totalMembers - Math.PI / 2 + rotation; // Start from top + rotation
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hover:scale-125 hover:z-50 group cursor-pointer"
      style={{ 
        left: x, 
        top: y,
      }}
    >
      <div className="relative z-10 pointer-events-auto">
        {/* Glow ring */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-75 blur-sm transition-all duration-500 group-hover:animate-spin pointer-events-none"></div>
        
        {/* Pulsing background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 animate-pulse transition-all duration-500 pointer-events-none"></div>
        
        {/* Main image */}
        <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/50 border-2 border-transparent group-hover:border-white/50 z-20">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg transition-all duration-500 group-hover:scale-110`}>
              <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          )}

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        </div>

        {/* Tooltip */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl p-4 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 pointer-events-none z-40 min-w-max border border-purple-200">
          <div className="text-center relative">
            <h4 className="font-bold text-indigo-900 text-sm mb-2 tracking-wide">{member.name}</h4>
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-2 animate-pulse"></div>
            <p className="text-gray-600 text-xs mb-2 font-medium">{member.role}</p>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white drop-shadow-sm"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-purple-200"></div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center shadow-lg animate-bounce pointer-events-none">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-75"></div>
        </div>

        {/* Line to center */}
        <div 
          className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-gradient-to-r from-purple-400 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
          style={{ 
            width: `${radius}px`,
            transform: `translate(-50%, -50%) rotate(${(angle * 180 / Math.PI) + 180}deg)`
          }}
        ></div>

        {/* Floating particles */}
        <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-0 w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-0 right-0 w-1 h-1 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

const HierarchyArrow = ({ label }) => (
  <div className="flex flex-col items-center my-8">
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-3 shadow-sm">
      {label}
    </div>
    <ArrowDown size={28} className="text-indigo-600 animate-bounce" />
  </div>
);

const TeamContent = () => {
  const [showAllDevelopers, setShowAllDevelopers] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastAngle, setLastAngle] = useState(0);
  const circleRef = useRef(null);
  const navigate = useNavigate();

  const displayedDevelopers = showAllDevelopers ? teamData.developers : teamData.developers.slice(0, 8);

  // Calculate angle from center point
  const getAngleFromCenter = (x, y, centerX, centerY) => {
    return Math.atan2(y - centerY, x - centerX);
  };

  // Handle mouse wheel rotation
  useEffect(() => {
    const handleWheel = (e) => {
      if (circleRef.current && circleRef.current.contains(e.target)) {
        e.preventDefault();
        const rotationSpeed = 0.01;
        setRotation(prev => prev + e.deltaY * rotationSpeed);
      }
    };

    // Handle touch events for mobile
    const handleTouchStart = (e) => {
      if (circleRef.current && circleRef.current.contains(e.target)) {
        setIsDragging(true);
        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const touch = e.touches[0];
        const angle = getAngleFromCenter(touch.clientX, touch.clientY, centerX, centerY);
        setLastAngle(angle);
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging && circleRef.current) {
        e.preventDefault();
        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const touch = e.touches[0];
        const angle = getAngleFromCenter(touch.clientX, touch.clientY, centerX, centerY);
        
        let angleDiff = angle - lastAngle;
        
        // Handle angle wraparound
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        setRotation(prev => prev + angleDiff);
        setLastAngle(angle);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    // Handle mouse drag events for desktop
    const handleMouseDown = (e) => {
      if (circleRef.current && circleRef.current.contains(e.target)) {
        setIsDragging(true);
        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = getAngleFromCenter(e.clientX, e.clientY, centerX, centerY);
        setLastAngle(angle);
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging && circleRef.current) {
        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = getAngleFromCenter(e.clientX, e.clientY, centerX, centerY);
        
        let angleDiff = angle - lastAngle;
        
        // Handle angle wraparound
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        setRotation(prev => prev + angleDiff);
        setLastAngle(angle);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const circleElement = circleRef.current;
    if (circleElement) {
      // Mouse events
      circleElement.addEventListener('wheel', handleWheel, { passive: false });
      circleElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      circleElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      circleElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      circleElement.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        circleElement.removeEventListener('wheel', handleWheel);
        circleElement.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        circleElement.removeEventListener('touchstart', handleTouchStart);
        circleElement.removeEventListener('touchmove', handleTouchMove);
        circleElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, lastAngle]);

  return (
    <div className="animate-fadeIn">
      <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">Meet Our Team</h3>
      
      {/* Founding Members */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-indigo-800 mb-6 text-center">Leadership</h4>
        <div className="flex justify-center">
          {teamData.foundingMembers.map(founder => (
            <TeamMemberCard 
              key={founder.id} 
              member={founder} 
              isFounder={true}
            />
          ))}
        </div>
      </div>

      {/* Hierarchy Arrow */}
      <HierarchyArrow label="Leads & Manages" />

      {/* Circular Development Team */}
      <div className="mb-12">
        <h4 className="text-xl font-semibold text-indigo-800 mb-8 text-center">Development Team</h4>
        
        {/* Rotation hint */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full inline-block shadow-sm">
            <span className="inline-block animate-pulse mr-2">🖱️</span>
            <span className="hidden md:inline">Scroll your mouse wheel over the circle to rotate the team!</span>
            <span className="md:hidden">Touch and drag to rotate the team circle!</span>
          </p>
        </div>
        
        <div 
          ref={circleRef}
          className={`relative mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-full p-8 group/container hover:shadow-xl transition-shadow duration-500 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`} 
          style={{ width: '540px', height: '540px', touchAction: 'none' }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-indigo-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-35" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-25" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Central hub with enhanced animations */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 cursor-pointer group/hub relative overflow-hidden">
            {/* Central hub glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full opacity-0 group-hover/hub:opacity-20 blur-md transition-all duration-500 animate-pulse"></div>
            
            {/* Rotating border */}
            <div className="absolute -inset-1 rounded-full border-2 border-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 group-hover/hub:opacity-100 transition-opacity duration-500 animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700"></div>
            
            {/* Content */}
            <div className="text-center relative z-10 group-hover/hub:scale-110 transition-transform duration-300">
              <Users size={32} className="text-white mx-auto mb-2 group-hover/hub:animate-bounce" />
              <p className="text-white text-sm font-bold tracking-wide">DEV TEAM</p>
              
              {/* Particle burst on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/hub:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-4 -left-4 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute -top-4 -right-4 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-4 -left-4 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute -bottom-4 -right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Circular arrangement of team members */}
          {displayedDevelopers.map((developer, index) => (
            <CircularTeamMember
              key={developer.id}
              member={developer}
              position={index}
              totalMembers={displayedDevelopers.length}
              centerX={270}
              centerY={270}
              radius={180}
              rotation={rotation}
            />
          ))}
          
          
          {/* Orbital rings */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-yellow-300 rounded-full opacity-0 group-hover/container:opacity-20 transition-opacity duration-1000" 
            style={{ transform: `translate(-50%, -50%) rotate(${rotation * 1.2}rad)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-green-300 rounded-full opacity-0 group-hover/container:opacity-20 transition-opacity duration-1000" 
            style={{ transform: `translate(-50%, -50%) rotate(${-rotation * 0.8}rad)` }}
          ></div>
        </div>
        
        {/* Enhanced interactive controls */}
        {teamData.developers.length > 8 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllDevelopers(!showAllDevelopers)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mr-4"
            >
              {showAllDevelopers ? (
                <>
                  <ChevronUp size={16} />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Show All Developers ({teamData.developers.length - 8} more)
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mt-8 shadow-lg">
        <p className="text-center text-indigo-800 font-medium mb-6 text-lg">
          Our diverse team combines academic excellence with industry expertise to deliver innovative solutions for the education sector.
        </p>
        
        {/* View Full Details Button */}
        <div className="text-center">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/team-details');
            }}

            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
          >
            <Users size={20} />
            View Full Team Details
          </button>
        </div>
      </div>
    </div>
  );
};

const TabContent = ({ activeTab }) => {
  const tabComponents = {
    mission: MissionContent,
    vision: VisionContent,
    team: TeamContent,
  };
  
  const SelectedTabComponent = tabComponents[activeTab];
  return <SelectedTabComponent />;
};

export default function About() {
  const [activeTab, setActiveTab] = useState('team'); // Start with team tab to show the rotation feature
  
  const tabs = [
    {id: 'mission', label: 'Our Mission', icon: <Book size={18} />},
    {id: 'team', label: 'Our Team', icon: <Users size={18} />},
    {id: 'vision', label: 'Our Vision', icon: <Award size={18} />},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="About"
          subtitle="Learn more about our mission, vision and the team behind this innovative platform."
        />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <HeroBanner />
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            tabs={tabs} 
          />
          <div className="p-6 md:p-8">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}