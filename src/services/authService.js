// import axios from "axios";

// // NOTE: Ensure your BASE_URL points to the correct Express server address.
// const API = axios.create({
//     baseURL: "http://localhost:5000/api/auth",
//         // baseURL: "https://smartdhandha-backend.onrender.com/api/auth", 
// });

// // --- REGISTER (Simplified) ---
// // Now handles direct user creation, no separate sendOtp/register-verify needed
// export const registerUser = async (userData) => {
//     // userData should contain: fullName, businessName, email, mobile, password
//     // The previous 'otp' field is removed from the payload
//     const { data } = await API.post("/register", userData); 
//     return data;
// };

// // Removed: export const sendOtp = async (email) => ...

// // --- LOGIN ---
// export const loginUser = async (credentials) => {
//     const { data } = await API.post("/login", credentials);

//     if (data.token) {
//         localStorage.setItem("authToken", data.token);
//     }

//     return data;
// };

// // --- UTILS ---
// export const logoutUser = () => {
//     localStorage.removeItem("authToken");
// };

// export const getToken = () => {
//     return localStorage.getItem("authToken");
// };

// export const isAuthenticated = () => {
//     return !!localStorage.getItem("authToken");
// };



// import axios from "axios";

// // 🔥 Change baseURL when deploying
// const API = axios.create({
//   baseURL: "http://localhost:5000/api/auth",
//   // baseURL: "https://smartdhandha-backend-1.onrender.com/api/auth",
// });

// // ================= REGISTER =================
// export const registerUser = async (userData) => {
//   // userData: fullName, businessName, email, password
//   const { data } = await API.post("/register", userData);
//   return data;
// };

// // ================= LOGIN (EMAIL BASED) =================
// export const loginUser = async (credentials) => {
//   // credentials: { email, password }
//   const { data } = await API.post("/login", credentials);

//   if (data.token) {
//     localStorage.setItem("authToken", data.token);
//   }

//   return data;
// };

// // ================= LOGOUT =================
// export const logoutUser = () => {
//   localStorage.removeItem("authToken");
// };

// // ================= GET TOKEN =================
// export const getToken = () => {
//   return localStorage.getItem("authToken");
// };

// // ================= CHECK AUTH =================
// export const isAuthenticated = () => {
//   return !!localStorage.getItem("authToken");
// };



import axios from "axios";

// 🔥 Change baseURL when deploying
const API = axios.create({
  // baseURL: "http://localhost:5000/api/auth",
  baseURL: "https://smartdhandha-backend-1.onrender.com/api/auth",
});

// ================= REGISTER =================
export const registerUser = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};

// ================= LOGIN =================
export const loginUser = async (credentials) => {
  const { data } = await API.post("/login", credentials);

  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data;
};

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

// ================= GET TOKEN =================
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// ================= CHECK AUTH =================
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// ======================================================
// 🔐 FORGOT PASSWORD FLOW
// ======================================================

// ================= SEND OTP =================
export const forgotPassword = async (email) => {
  const { data } = await API.post("/forgot-password", { email });
  return data;
};

// ================= VERIFY OTP =================
export const verifyOTP = async (email, otp) => {
  const { data } = await API.post("/verify-otp", {
    email,
    otp,
  });
  return data;
};

// ================= RESET PASSWORD =================
// export const resetPassword = async (email, newPassword) => {
//   const { data } = await API.post("/reset-password", {
//     email,
//     newPassword,
//   });
//   return data;
// };

// ================= RESET PASSWORD =================
export const resetPassword = async (email, otp, newPassword) => {
  const { data } = await API.post("/reset-password", { email, otp, newPassword });
  return data;
};