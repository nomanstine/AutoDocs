import { Mail, Phone, MapPin, Send, User, MessageSquare, Check } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="bg-yellow-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-indigo-900">Our Location</h3>
            <p className="mt-1 text-gray-600">Department of CSE, Jashore University of Science and Technology</p>
            <p className="text-gray-600">Jashore, Bangladesh</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Mail className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-indigo-900">Email Address</h3>
            <p className="mt-1 text-gray-600">auto.docs.cse@just.edu.bd</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-indigo-900">Phone Number</h3>
            <p className="mt-1 text-gray-600">+880 123 456 7890</p>
            <p className="text-gray-600">+880 987 654 3210</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 py-4 border-t border-gray-100">
        <h3 className="text-lg font-medium text-indigo-900 mb-3">Office Hours</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-700 font-medium">Saturday - Wednesday</p>
            <p className="text-gray-600">9:00 AM - 5:00 PM</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Thursday - Friday</p>
            <p className="text-gray-600">Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;