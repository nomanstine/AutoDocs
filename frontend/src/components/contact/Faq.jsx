import React from "react";

const FAQ = ({faqs}) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white/90 rounded-2xl shadow-lg border border-yellow-100 py-8 px-6 md:px-12">
        <h2 className="text-3xl font-extrabold text-yellow-600 mb-8 text-center tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-7">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 bg-yellow-50/60 rounded-xl border-l-4 border-yellow-400 shadow-sm hover:shadow-md transition p-5"
            >
              <span className="mt-1 text-yellow-400 text-xl select-none">?</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{faq.question}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
