import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { certificateService } from "../api/services";
import { useAuth } from "../AuthContext";
import { toast } from "sonner";

const SERVICES = {
  "1": { name: "Semester Transcript", icon: "📄", price: 200 },
  "2": { name: "Provisional Certificate", icon: "🎓", price: 500 },
  "3": { name: "Complete Transcript", icon: "📑", price: 1000 },
  "4": { name: "Character Certificate", icon: "📝", price: 300 },
  "5": { name: "Migration Certificate", icon: "🔄", price: 800 },
  "6": { name: "Marksheet Copy", icon: "📊", price: 250 },
  "67": { name: "Testimonial", icon: "📄", price: 200 },
};

const Certificate = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const { isAuthenticated } = useAuth();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const service = SERVICES[serviceId];

  useEffect(() => {
    if (!service) {
      navigate("/services");
      return;
    }

    // Check authentication
    if (!isAuthenticated) {
      toast.error('Please login to access certificates');
      navigate("/login", { state: { from: `/certificate/${serviceId}` } });
      return;
    }

    // If payment was successful, generate certificate
    if (location.state?.paymentSuccess && location.state?.transactionId) {
      setPaymentComplete(true);
      setTransactionId(location.state.transactionId);
      generateCertificate(location.state.transactionId);
    } else if (!location.state?.paymentSuccess) {
      // If no payment success state, redirect to payment
      toast.error('Please complete payment first');
      navigate(`/payment/${serviceId}`);
    }
  }, [service, location.state, navigate, isAuthenticated, serviceId]);

  const generateCertificate = async (transactionId) => {
    setIsGenerating(true);
    const loadingToast = toast.loading('Generating certificate...');

    try {
      const certResponse = await certificateService.generateCertificate(serviceId, transactionId);
      setCertificateData(certResponse);
      toast.dismiss(loadingToast);
      toast.success('Certificate generated successfully!');
    } catch (err) {
      console.error("Certificate generation error:", err);
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to generate certificate");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d{0-2})/, "$1/$2");
      if (formattedValue.length > 5) return;
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 3) return;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    console.log("Download - Certificate Data:", certificateData);
    
    // Check if we have valid certificate data
    if (!certificateData || !certificateData.student_name || certificateData.student_name === 'N/A') {
      toast.error("Certificate data is incomplete. Please complete your student profile first.");
      setIsDownloading(false);
      return;
    }
    
    toast.success('Opening certificate for download...');
    
    // Determine which template to use based on service
    const templatePath = serviceId === "67" ? "/template/testimonial.html" : "/template/certificate.html";
    
    // Build URL parameters from certificateData
    const params = new URLSearchParams({
      date: certificateData?.issue_date 
        ? new Date(certificateData.issue_date).toLocaleDateString('en-GB')
        : new Date().toLocaleDateString('en-GB'),
      refNo: certificateData?.reference_number || 'N/A',
      studentName: certificateData?.student_name || 'N/A',
      studentId: certificateData?.student_id || 'N/A',
      regNo: certificateData?.registration_number || 'N/A',
      session: certificateData?.session || 'N/A',
      department: certificateData?.department || 'Computer Science and Engineering',
    });

    // Add testimonial-specific fields
    if (serviceId === "67") {
      params.append('fatherName', certificateData?.father_name || 'N/A');
      params.append('motherName', certificateData?.mother_name || 'N/A');
      params.append('gender', certificateData?.gender || 'Male');
      params.append('cgpa', certificateData?.cgpa?.toString() || 'N/A');
      params.append('degree', certificateData?.degree || 'Bachelor(Engg.)');
      params.append('graduationYear', certificateData?.graduation_year?.toString() || new Date().getFullYear().toString());
      params.append('totalYears', certificateData?.total_years?.toString() || '4');
      params.append('totalMonths', certificateData?.total_months?.toString() || '0');
    }

    // Open the template in a new window
    const templateUrl = `${templatePath}?${params.toString()}`;
    console.log("Opening template URL:", templateUrl);
    console.log("URL Parameters:", Object.fromEntries(params));
    window.open(templateUrl, '_blank');
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  const handlePrint = () => {
    // Open template for printing
    console.log("Print - Certificate Data:", certificateData);
    
    toast.info('Opening print dialog...');
    
    const templatePath = serviceId === "67" ? "/template/testimonial.html" : "/template/certificate.html";
    
    const params = new URLSearchParams({
      date: certificateData?.issue_date 
        ? new Date(certificateData.issue_date).toLocaleDateString('en-GB')
        : new Date().toLocaleDateString('en-GB'),
      refNo: certificateData?.reference_number || 'N/A',
      studentName: certificateData?.student_name || 'N/A',
      studentId: certificateData?.student_id || 'N/A',
      regNo: certificateData?.registration_number || 'N/A',
      session: certificateData?.session || 'N/A',
      department: certificateData?.department || 'Computer Science and Engineering',
    });

    if (serviceId === "67") {
      params.append('fatherName', certificateData?.father_name || 'N/A');
      params.append('motherName', certificateData?.mother_name || 'N/A');
      params.append('gender', certificateData?.gender || 'Male');
      params.append('cgpa', certificateData?.cgpa?.toString() || 'N/A');
      params.append('degree', certificateData?.degree || 'Bachelor(Engg.)');
      params.append('graduationYear', certificateData?.graduation_year?.toString() || new Date().getFullYear().toString());
      params.append('totalYears', certificateData?.total_years?.toString() || '4');
      params.append('totalMonths', certificateData?.total_months?.toString() || '0');
    }

    const templateUrl = `${templatePath}?${params.toString()}`;
    const printWindow = window.open(templateUrl, '_blank');
    
    // Wait for the page to load before printing
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      });
    }
  };

  if (!service) return null;

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Certificate</h2>
          <p className="text-gray-600">Please wait while we prepare your document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      {/* Certificate Content (shown after payment) */}
      {paymentComplete && (
        <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Payment Successful!</h2>
              <p className="text-gray-600">Your certificate has been generated and is ready to download.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 print:hidden">
          <button
            onClick={() => {
              console.log("Certificate Data:", certificateData);
              
              // Check if we have valid certificate data
              if (!certificateData || !certificateData.student_name || certificateData.student_name === 'N/A') {
                alert("Certificate data is incomplete. Please ensure you have completed your student profile before generating certificates. Contact admin if you need help.");
                return;
              }
              
              const templatePath = serviceId === "67" ? "/template/testimonial.html" : "/template/certificate.html";
              const params = new URLSearchParams({
                date: certificateData?.issue_date 
                  ? new Date(certificateData.issue_date).toLocaleDateString('en-GB')
                  : new Date().toLocaleDateString('en-GB'),
                refNo: certificateData?.reference_number || 'N/A',
                studentName: certificateData?.student_name || 'N/A',
                studentId: certificateData?.student_id || 'N/A',
                regNo: certificateData?.registration_number || 'N/A',
                session: certificateData?.session || 'N/A',
                department: certificateData?.department || 'Computer Science and Engineering',
              });

              if (serviceId === "67") {
                params.append('fatherName', certificateData?.father_name || 'N/A');
                params.append('motherName', certificateData?.mother_name || 'N/A');
                params.append('gender', certificateData?.gender || 'Male');
                params.append('cgpa', certificateData?.cgpa?.toString() || 'N/A');
                params.append('degree', certificateData?.degree || 'Bachelor(Engg.)');
                params.append('graduationYear', certificateData?.graduation_year?.toString() || new Date().getFullYear().toString());
                params.append('totalYears', certificateData?.total_years?.toString() || '4');
                params.append('totalMonths', certificateData?.total_months?.toString() || '0');
              }

              window.open(`${templatePath}?${params.toString()}`, '_blank');
            }}
            className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Full Certificate
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Opening...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button
            onClick={() => navigate("/services")}
            className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Services
          </button>
        </div>

        {/* Certificate Preview */}
        <div ref={certificateRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/JUST-Logo.png" alt="JUST Logo" className="h-16 w-16 rounded-full border-4 border-white shadow-lg" />
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Jashore University of Science and Technology</h1>
                <p className="text-gray-800 font-medium">Department of Computer Science & Engineering</p>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-12">
            <div className="text-center mb-8">
              <div className="inline-block text-6xl mb-4">{service.icon}</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{service.name}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {/* Certificate Content */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Student ID:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.student_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Registration No:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.registration_number || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Student Name:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.student_name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Session:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.session || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Issue Date:</p>
                    <p className="text-gray-900 font-semibold">
                      {certificateData?.issue_date 
                        ? new Date(certificateData.issue_date).toLocaleDateString('en-GB')
                        : new Date().toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Certificate ID:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.reference_number || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Department:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.department || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">CGPA:</p>
                    <p className="text-gray-900 font-semibold">{certificateData?.cgpa || "N/A"}</p>
                  </div>
                </div>
                
                {/* Debug info - show if data is missing */}
                {(!certificateData?.student_name || certificateData?.student_name === 'N/A') && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Missing Data:</strong> Your student profile is incomplete or not created. 
                      Please contact the administrator to create your student profile before generating certificates.
                    </p>
                  </div>
                )}
              </div>

              {/* Certificate Text */}
              <div className="text-center py-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  This is to certify that the above-mentioned student has successfully completed 
                  the required academic program and is hereby issued this <strong>{service.name}</strong> 
                  as per the university regulations.
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="text-center">
                  <div className="border-t-2 border-gray-300 pt-2 mb-2">
                    <p className="font-semibold text-gray-900">Dr. ABC XYZ</p>
                    <p className="text-sm text-gray-600">Head of Department</p>
                    <p className="text-xs text-gray-500">Department of CSE</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-gray-300 pt-2 mb-2">
                    <p className="font-semibold text-gray-900">Prof. DEF PQR</p>
                    <p className="text-sm text-gray-600">Controller of Examinations</p>
                    <p className="text-xs text-gray-500">JUST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="bg-gray-100 px-12 py-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <p>Issued on: {certificateData?.issue_date 
                  ? new Date(certificateData.issue_date).toLocaleString('en-GB')
                  : new Date().toLocaleString('en-GB')}</p>
              <p>Verification Code: {certificateData?.reference_number || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-600 print:hidden">
          <p>This certificate is digitally generated and verified by the university system.</p>
          <p className="mt-1">
            For verification, visit:{" "}
            <a 
              href={`/verify-certificate?ref=${certificateData?.reference_number || ""}`}
              className="text-blue-600 font-medium hover:underline"
            >
              verify.just.edu.bd
            </a>
          </p>
        </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
