export const validateSignup = ({ UserName, emailId, password, confirmPassword }) => {
  if (!UserName.trim()) return "Username is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailId)) return "Invalid email address";

  if (password.length < 6) return "Password must be at least 6 characters long";

  if (password !== confirmPassword) return "Passwords do not match";

  return null; // no errors
};



