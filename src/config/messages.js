export const COMMON_MESSAGES = {
  REQUIRED_FIELDS: "Please fill in all fields",
  UNKNOWN_ERROR: "Something went wrong. Please try again later.",
  SUCCESS: "Operation completed successfully",
  INVALID_INPUT: "Invalid input. Please check your details and try again.",
};

export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",

  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",
  EMAIL_MIN: "Email must be at least 3 characters long",
  EMAIL_SPACES: "Email cannot contain spaces",

  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: "Password must be at least 6 characters long",
  PASSWORD_MISMATCH: "Passwords do not match",

  LOGIN_SUCCESS: "You have successfully logged in",
  LOGIN_FAILED: "Invalid email or password",

  REGISTER_SUCCESS: "Account created successfully",
  REGISTER_FAILED: "Registration failed. Please try again.",

  LOGOUT_SUCCESS: "You have successfully logged out",
  LOGOUT_FAILED: "Logout failed. Please try again.",

  USER_EXIST: "User already exist."
};



export const FORM_MESSAGES = {
  VALIDATION_ERROR: "Please correct the highlighted errors and try again.",
  SUBMITTING: "Submitting...",
  LOADING: "Loading...",
};

export const API_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
};

export const TOKEM_MESSAGES = {
      INVAILD_TOKEN:"Invaild token",
      INVAILD_REFRESH_TOKEN:"Invaild refresh token"
}
