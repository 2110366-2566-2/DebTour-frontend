"use client";

import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded bg-white p-6 shadow-lg">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input-field"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input-field"
            />
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
            />
          </>
        )}
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="btn-secondary"
            >
              Previous
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-primary"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
