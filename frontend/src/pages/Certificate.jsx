import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    phone: "",
  });

  const service = SERVICES[serviceId];

  useEffect(() => {
    if (!service) {
      navigate("/services");
      return;
    }

    if (location.state?.showPayment) {
      setShowPaymentModal(true);
    } else if (location.state?.paymentSuccess) {
      setPaymentComplete(true);
    }
  }, [service, location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2");
      if (formattedValue.length > 5) return;
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 3) return;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setIsGenerating(true);

      setTimeout(() => {
        setIsGenerating(false);
        setPaymentComplete(true);
      }, 2500);
    }, 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      setIsDownloading(false);
      alert("Certificate downloaded successfully!");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
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
      {/* Payment Modal Overlay */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Secure Payment Gateway</h2>
                  <p className="text-sm text-blue-100">SSL Commerce Payment</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  navigate("/services");
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Payment Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handlePaymentSubmit} className="space-y-5">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
                          <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Card Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="JOHN DOE"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase"
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+880 1XXX-XXXXXX"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Pay ৳{service.price}
                        </>
                      )}
                    </button>
                  </form>

                  {/* Security Notice */}
                  <div className="mt-4 flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-green-800 mb-1">Secure Payment</p>
                      <p className="text-xs text-green-700">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium text-gray-900">{service.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-gray-900">৳{service.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span className="font-medium text-gray-900">৳0</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-4 mb-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-blue-600">৳{service.price}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Instant delivery</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Email confirmation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Downloadable PDF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                Downloading...
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
                    <p className="text-gray-900 font-semibold">CSE-2021001</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Registration No:</p>
                    <p className="text-gray-900 font-semibold">2021-CSE-001</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Student Name:</p>
                    <p className="text-gray-900 font-semibold">John Doe</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Session:</p>
                    <p className="text-gray-900 font-semibold">2021-2022</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Issue Date:</p>
                    <p className="text-gray-900 font-semibold">{new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Certificate ID:</p>
                    <p className="text-gray-900 font-semibold">CERT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>
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
              <p>Issued on: {new Date().toLocaleString('en-GB')}</p>
              <p>Verification Code: JUST-CSE-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-600 print:hidden">
          <p>This certificate is digitally generated and verified by the university system.</p>
          <p className="mt-1">For verification, visit: <span className="text-blue-600 font-medium">verify.just.edu.bd</span></p>
        </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
