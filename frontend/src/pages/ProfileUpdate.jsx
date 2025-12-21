import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { User, Mail, Phone, Calendar, Heart, Users, ArrowLeft } from 'lucide-react';

const ProfileUpdate = () => {
  const { user, isLoading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile_number: '',
    name_father: '',
    name_mother: '',
    date_of_birth: '',
    blood_group: '',
  });

  const [nonEditableData, setNonEditableData] = useState({
    name: '',
    email: '',
    student_id: '',
    session: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setNonEditableData({
        name: user.full_name || user.name || '',
        email: user.email || '',
        student_id: user.student_id || '',
        session: user.session || ''
      });

      setFormData({
        mobile_number: user.mobile_number || '',
        name_father: user.name_father || '',
        name_mother: user.name_mother || '',
        date_of_birth: user.date_of_birth || '',
        blood_group: user.blood_group || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const requiredFields = ['mobile_number', 'name_father', 'name_mother', 'date_of_birth', 'blood_group'];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        setError('Please fill in all fields before submitting.');
        setSubmitting(false);
        return;
      }
    }

    try {
      // Simulate API call - update user in context
      updateUser({ ...user, ...formData });
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">Back to Profile</span>
        </button>

        <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border-2 border-yellow-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-r from-yellow-400 to-yellow-600">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Update Profile</h1>
            <p className="text-sm sm:text-base text-yellow-100 mt-1">Update your personal information</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">Profile updated successfully! Redirecting...</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            {/* Non-editable Fields */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6 sm:mb-8 border-2 border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 mr-2" />
                Non-Editable Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-gray-300 text-sm sm:text-base text-gray-900 break-words">{nonEditableData.name}</div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 break-all">{nonEditableData.email}</div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                  <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-gray-300 text-sm sm:text-base text-gray-900">{nonEditableData.student_id}</div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Session</label>
                  <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-gray-300 text-sm sm:text-base text-gray-900">{nonEditableData.session}</div>
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mr-2" />
                Editable Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="mobile_number" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile_number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label htmlFor="name_father" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="name_father"
                    name="name_father"
                    value={formData.name_father}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter father's name"
                  />
                </div>

                <div>
                  <label htmlFor="name_mother" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    id="name_mother"
                    name="name_mother"
                    value={formData.name_mother}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter mother's name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="blood_group" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    Blood Group
                  </label>
                  <select
                    name="blood_group"
                    id="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="w-full sm:w-auto bg-white py-2.5 sm:py-3 px-6 border-2 border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 py-2.5 sm:py-3 px-6 rounded-lg shadow-lg text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {submitting ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
