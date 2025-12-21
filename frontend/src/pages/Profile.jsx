import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { User, Mail, Phone, Calendar, Award, FileText, Clock, CheckCircle } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const roleMapping = {
    3: "Student",
    4: "Alumni"
  };

  const services = {
    completed: [
      {
        id: 1,
        title: "Semester Transcript",
        amount: 200,
        date: "2023-05-15",
        status: "Delivered"
      },
      {
        id: 3,
        title: "Complete Transcript",
        amount: 1000,
        date: "2023-06-20",
        status: "Delivered"
      }
    ],
    pending: [
      {
        id: 2,
        title: "Provisional Certificate",
        amount: 500,
        date: "2023-07-10",
        status: "Processing"
      },
      {
        id: 6,
        title: "Marksheet Copy",
        amount: 250,
        date: "2023-07-12",
        status: "Processing"
      }
    ]
  };

  const totalExpenses = services.completed.reduce((sum, service) => sum + service.amount, 0);
  const pendingPayments = services.pending.reduce((sum, service) => sum + service.amount, 0);

  const handleViewDetails = (serviceId) => {
    navigate(`/certificate/${serviceId}`);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg border-2 border-yellow-200 overflow-hidden mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-24 sm:h-28 md:h-32"></div>
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-col items-center -mt-12 sm:-mt-14 md:-mt-16">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border-4 border-white bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                  {user.user_photo ? (
                    <img 
                      className="h-full w-full rounded-full object-cover" 
                      src={user.user_photo}
                      alt={user.full_name} 
                    />
                  ) : (
                    <User className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white" />
                  )}
                </div>
              </div>
              
              <div className="mt-4 w-full text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.full_name}</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Computer Science and Engineering</p>
                    <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800">
                      {roleMapping[user.role] || "Student"}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate('/profile/update')}
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-2.5 rounded-lg shadow-md font-semibold transition-all duration-200"
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                      <p className="text-xs sm:text-sm font-medium">Student ID</p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-gray-900 truncate">{user.student_id}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <p className="text-xs sm:text-sm font-medium">Session</p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-gray-900">{user.session || "2020-21"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                      <p className="text-xs sm:text-sm font-medium">Email</p>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{user.email}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-200">
                    <div className="flex items-center gap-2 text-red-600 mb-1">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      <p className="text-xs sm:text-sm font-medium">Phone</p>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 break-all">{user.mobile_number || "+880 1XXX-XXXXXX"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Total Services</h3>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">{services.completed.length}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Completed transactions</p>
              </div>
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 flex-shrink-0" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Pending</h3>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">{services.pending.length}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">In process</p>
              </div>
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 flex-shrink-0" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Total Expenses</h3>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">৳{totalExpenses}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">৳{pendingPayments} pending</p>
              </div>
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-500 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Services Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Completed Services */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border-2 border-yellow-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
                Completed Services
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {services.completed.map((service) => (
                <div key={service.id} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-yellow-50 transition-colors duration-150">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Completed on {service.date}</p>
                    </div>
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 self-start">
                      {service.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="font-bold text-base sm:text-lg text-gray-900">৳{service.amount}</span>
                    <button 
                      onClick={() => handleViewDetails(service.id)}
                      className="text-sm text-yellow-600 hover:text-yellow-800 font-semibold transition text-left sm:text-right"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Services */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border-2 border-yellow-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mr-2" />
                Pending Services
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {services.pending.map((service) => (
                <div key={service.id} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-yellow-50 transition-colors duration-150">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Requested on {service.date}</p>
                    </div>
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 self-start">
                      {service.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="font-bold text-base sm:text-lg text-gray-900">৳{service.amount}</span>
                    {service.status === "Pending Payment" ? (
                      <button 
                        onClick={() => navigate(`/payment/${service.id}`)}
                        className="text-xs sm:text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-all w-full sm:w-auto"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleViewDetails(service.id)}
                        className="text-sm text-yellow-600 hover:text-yellow-800 font-semibold transition text-left sm:text-right"
                      >
                        Track Status →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
