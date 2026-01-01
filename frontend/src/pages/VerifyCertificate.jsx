import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ref = searchParams.get('ref');
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock certificate data based on reference
  const mockCertificates = {
    'CSE-2025-001': {
      id: 1,
      studentName: 'Md. Abdul Rahman',
      studentId: '180101',
      regNo: '2018-19-10100101',
      session: '2018-2019',
      department: 'Computer Science and Engineering',
      course: 'Testimonial',
      issueDate: '2025-12-20',
      status: 'Valid',
      signature: '../signature/kamrul_signature.png'
    },
    'CSE-2025-002': {
      id: 2,
      studentName: 'Jane Doe',
      studentId: '180102',
      regNo: '2018-19-10100102',
      session: '2018-2019',
      department: 'Computer Science and Engineering',
      course: 'Certificate',
      issueDate: '2025-12-21',
      status: 'Valid',
      signature: '../signature/kamrul_signature.png'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (ref && mockCertificates[ref]) {
        setCertificate(mockCertificates[ref]);
        setLoading(false);
      } else {
        setError('Certificate not found or invalid reference number.');
        setLoading(false);
      }
    }, 1000);
  }, [ref]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Visit Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Certificate Verification</h1>
          <p className="mt-2 text-sm text-gray-600">Reference: {ref}</p>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="text-green-500 text-4xl mr-3">✓</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Certificate Verified</h2>
              <p className="text-gray-600">This certificate is authentic and valid.</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Issue Date:</span>
                <span className="ml-2 text-gray-900">{certificate.issueDate}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Status:</span>
                <span className="ml-2 text-green-600 font-medium">{certificate.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Student Name</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.studentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Student ID</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.studentId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Registration No</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.regNo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Session</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.session}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Department</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Course/Document</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.course}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Issue Date</label>
                <p className="mt-1 text-sm text-gray-900">{certificate.issueDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1 text-sm text-green-600 font-medium">{certificate.status}</p>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-center">
              <div className="text-center">
                <img
                  src={certificate.signature}
                  alt="Chairman Signature"
                  className="w-32 h-16 mx-auto mb-2 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <p className="text-sm text-gray-600">Chairman Signature</p>
                <p className="text-xs text-gray-500">Department of Computer Science and Engineering</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Visit Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;