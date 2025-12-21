import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const transcriptServices = [
    {
      id: 1,
      title: "Semester Transcript",
      description: "Official transcript with grades for a specific semester",
      amount: 200,
      deliveryTime: "2-3",
      icon: "📄"
    },
    {
      id: 67,
      title: "Testimonial",
      description: "Official Testimonial of the Undergraduation course",
      amount: 200,
      deliveryTime: "2-3",
      icon: "📄"
    },
    {
      id: 2,
      title: "Provisional Certificate",
      description: "Temporary certificate before receiving the original",
      amount: 500,
      deliveryTime: "3-5",
      icon: "🎓"
    },
    {
      id: 3,
      title: "Complete Transcript",
      description: "Full academic record with all semester results",
      amount: 1000,
      deliveryTime: "5-7",
      icon: "📑"
    },
    {
      id: 4,
      title: "Character Certificate",
      description: "Official document certifying student conduct",
      amount: 300,
      deliveryTime: "0",
      icon: "📝"
    },
    {
      id: 5,
      title: "Migration Certificate",
      description: "Required for pursuing education in other institutions",
      amount: 800,
      deliveryTime: "7-10",
      icon: "🔄"
    },
    {
      id: 6,
      title: "Marksheet Copy",
      description: "Certified duplicate of original marksheet",
      amount: 250,
      deliveryTime: "1-2",
      icon: "📊"
    }
  ];

  const handleProceedToPayment = (serviceId) => {
      navigate(`/payment/${serviceId}`);
  };

  const filteredServices = transcriptServices.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight">
              Welcome to <span className="text-yellow-500">CSE</span> Digital Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Seamlessly access and download your academic records and certificates with fast, secure payment options.
            </p>
            <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              Whether you need transcripts for higher education, job applications, or personal records, our platform provides a quick and secure way to retrieve your documents.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border-2 border-yellow-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 text-base transition"
                placeholder="Search for a document..."
              />
              {searchTerm && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Search Results Count */}
          {searchTerm && (
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                {filteredServices.length === 0
                  ? "No results found"
                  : `${filteredServices.length} results found`}
              </p>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mb-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl bg-yellow-100 h-12 w-12 flex items-center justify-center rounded-full shadow-inner group-hover:bg-yellow-200 transition">
                      {service.icon}
                    </div>
                    <div className="bg-yellow-300 px-4 py-1 rounded-full font-bold text-gray-800 text-base shadow group-hover:bg-yellow-400 transition">
                      ৳{service.amount}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Delivery: {service.deliveryTime} days
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="font-medium text-indigo-800 mb-2 text-sm">Payment Options:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Online
                      </span>
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Offline
                      </span>
                    </div>
                  </div>
                </div>
                {/* Updated payment container style */}
                <div className="bg-white border-t border-gray-100 rounded-b-2xl shadow-md p-4 flex items-center justify-center">
                  <button
                    onClick={() => handleProceedToPayment(service.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Proceed to Payment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredServices.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900">No certificates found</h3>
              <p className="mt-2 text-base text-gray-500">Try searching for something else or clear the search</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                View all certificates
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;