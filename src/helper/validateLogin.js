export const validateLogin = ({ emailId, password }) => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailId)) return "Invalid email address";

  if (password.length < 6) return "Password must be at least 6 characters long";



  return null; // no errors
};