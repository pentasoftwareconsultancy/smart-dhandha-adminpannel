import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP, resetPassword } from "../services/authService";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // <-- Added

  // ================= STEP 1 - SEND OTP =================
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await forgotPassword(email);
      setMessage(res.message || "OTP sent successfully");

      // Auto-fill OTP if backend sends it (for dev/testing)
      if (res.otp) setOtp(res.otp);

      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // ================= STEP 2 - VERIFY OTP =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await verifyOTP(email, otp);
      setMessage(res.message || "OTP Verified");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  // ================= STEP 3 - RESET PASSWORD =================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await resetPassword(email, otp, newPassword);
      setMessage(res.message || "Password Reset Successful");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {message && (
          <p className="text-green-600 text-sm text-center mb-4">{message}</p>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2 text-gray-700">Enter Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <label className="block mb-2 text-gray-700">Enter OTP</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
              Verify OTP
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <label className="block mb-2 text-gray-700">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg mb-4 bg-gray-100"
            />

            <label className="block mb-2 text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              readOnly
              className="w-full px-4 py-2 border rounded-lg mb-4 bg-gray-100"
            />

            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Reset Password
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;