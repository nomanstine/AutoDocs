import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditCard, Building2, Smartphone, ArrowLeft, ShieldCheck, QrCode } from "lucide-react";
import { toast } from "sonner";
import { certificateService } from "../api/services";

const SERVICES = {
  "1": { name: "Semester Transcript", price: 200 },
  "67": { name: "Testimonial", price: 200 },
  "2": { name: "Provisional Certificate", price: 500 },
  "3": { name: "Complete Transcript", price: 1000 },
  "4": { name: "Character Certificate", price: 300 },
  "5": { name: "Migration Certificate", price: 800 },
  "6": { name: "Marksheet", price: 400 },
};

const MOBILE_BANKING = [
  { id: "bkash", name: "bKash", logo: "https://seeklogo.com/images/B/bkash-logo-B4D1CC458D-seeklogo.com.png", number: "01XXXXXXXXX" },
  { id: "nagad", name: "Nagad", logo: "https://seeklogo.com/images/N/nagad-logo-7A70CCFEE0-seeklogo.com.png", number: "01XXXXXXXXX" },
  { id: "rocket", name: "Rocket", logo: "https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1890875-seeklogo.com.png", number: "01XXXXXXXXX" },
  { id: "upay", name: "Upay", logo: "https://play-lh.googleusercontent.com/JbJ8VPh5T-_HfL2bxFZqfLPdXn0yZKPmfB4PiKHCQG8W7A5yC6r4JGHvqZ0_LF0qvQ", number: "01XXXXXXXXX" },
];

const BANKS = [
  { id: "city", name: "City Bank", logo: "https://seeklogo.com/images/C/city-bank-logo-1B8F2E1A1F-seeklogo.com.png" },
  { id: "dbbl", name: "DBBL", logo: "https://seeklogo.com/images/D/dutch-bangla-bank-logo-B36F20E0D9-seeklogo.com.png" },
  { id: "brac", name: "BRAC Bank", logo: "https://seeklogo.com/images/B/brac-bank-logo-B8E1A1F8E9-seeklogo.com.png" },
  { id: "eastern", name: "Eastern Bank", logo: "https://seeklogo.com/images/E/eastern-bank-limited-logo-16A5B3D2A5-seeklogo.com.png" },
];

const Payment = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedMobileBanking, setSelectedMobileBanking] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
  });

  const service = SERVICES[serviceId];

  useEffect(() => {
    if (!service) {
      navigate("/services");
    }
  }, [service, navigate]);

  const handleCardInputChange = (e) => {
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

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Show processing toast
    const loadingToast = toast.loading('Processing payment...');

    try {
      // Prepare payment data
      const paymentData = {
        service_id: serviceId,
        card_number: cardData.cardNumber.replace(/\s/g, ''),
        card_name: cardData.cardName,
        expiry_date: cardData.expiryDate,
        cvv: cardData.cvv,
        email: contactData.email,
        phone: contactData.phone,
      };

      // Call backend API to process payment
      const paymentResponse = await certificateService.processPayment(paymentData);

      setIsProcessing(false);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Payment successful! Generating certificate...');

      // Directly open the certificate PDF template
      const templatePath = serviceId === "67" ? "/template/testimonial.html" : "/template/certificate.html";
      const templateUrl = `${templatePath}?serviceId=${serviceId}&transactionId=${paymentResponse.transaction_id}`;
      window.open(templateUrl, '_blank');

      // Navigate back to services page
      navigate("/services");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!service) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
                <p className="text-gray-600 mt-1">Complete your payment securely</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-3xl font-bold text-indigo-600">৳{service.price}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
              
              {/* Payment Method Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setSelectedMethod("card")}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                    selectedMethod === "card"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  Card
                </button>
                <button
                  onClick={() => setSelectedMethod("mobile")}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                    selectedMethod === "mobile"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Smartphone className="h-5 w-5" />
                  Mobile Banking
                </button>
                <button
                  onClick={() => setSelectedMethod("bank")}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                    selectedMethod === "bank"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                  Internet Banking
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Card Payment */}
                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Banking */}
                {selectedMethod === "mobile" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {MOBILE_BANKING.map((provider) => (
                        <button
                          key={provider.id}
                          type="button"
                          onClick={() => {
                            setSelectedMobileBanking(provider);
                            setShowQR(true);
                          }}
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            selectedMobileBanking?.id === provider.id
                              ? "border-indigo-600 bg-indigo-50"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="h-12 w-auto mx-auto mb-2"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%23f3f4f6' width='100' height='50'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='sans-serif' font-size='12'%3E" + provider.name + "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <p className="text-sm font-medium text-center">{provider.name}</p>
                        </button>
                      ))}
                    </div>

                    {selectedMobileBanking && showQR && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Pay with {selectedMobileBanking.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Scan the QR code or use the number below
                          </p>
                          
                          {/* QR Code Placeholder */}
                          <div className="bg-white p-4 rounded-lg inline-block mb-4 shadow-md">
                            <div className="h-48 w-48 bg-gray-100 flex items-center justify-center">
                              <QrCode className="h-32 w-32 text-gray-400" />
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Merchant Number</p>
                            <p className="text-xl font-bold text-gray-900">{selectedMobileBanking.number}</p>
                            <p className="text-sm text-gray-600 mt-3 mb-1">Amount to Pay</p>
                            <p className="text-2xl font-bold text-indigo-600">৳{service.price}</p>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Transaction ID *
                            </label>
                            <input
                              type="text"
                              placeholder="Enter transaction ID after payment"
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Internet Banking */}
                {selectedMethod === "bank" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {BANKS.map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            selectedBank?.id === bank.id
                              ? "border-indigo-600 bg-indigo-50"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <img
                            src={bank.logo}
                            alt={bank.name}
                            className="h-12 w-auto mx-auto mb-2"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%23f3f4f6' width='100' height='50'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='sans-serif' font-size='12'%3E" + bank.name + "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <p className="text-sm font-medium text-center">{bank.name}</p>
                        </button>
                      ))}
                    </div>

                    {selectedBank && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">
                          You will be redirected to <strong>{selectedBank.name}</strong> to complete your payment securely.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Contact Information */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleContactChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactData.phone}
                        onChange={handleContactChange}
                        placeholder="+880 1XXX-XXXXXX"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Pay ৳{service.price}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium text-gray-900">{service.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium text-gray-900">৳{service.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium text-gray-900">৳0</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-indigo-600">৳{service.price}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
