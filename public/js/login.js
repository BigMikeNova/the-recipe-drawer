const User = require("./models/user"); // Import the User model
const RateLimit = require("express-rate-limit"); // Import the rate limiter

//Login form handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
 // If successful, redirect the browser to the homepage
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

// Signup form handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password && email) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });
// If successful, redirect the browser to the homepage
    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log("text" + response.statusText);
    }
  }
};

// Event listeners for the login and signup forms
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);

// Configure the rate limiter
const limiter = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Maximum number of attempts
  message: "Too many login attempts, please try again later.",
});

// Function to handle user login
async function login(username, password) {
  try {
    // Find the user by their username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("Invalid username");
      return;
    }

// Check if the provided password matches the stored password
    const isPasswordValid = user.checkPassword(password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return;
    }

    // Successful login
    console.log("Login successful!");
    console.log("User:", user);
  } catch (error) {
    console.log("An error occurred during login:", error);
  }
}

// Apply rate limiting to the login function
const loginWithRateLimit = limiter.wrap(login);


// Usage example
// const username = "example_user";
// const password = "password123";

loginWithRateLimit(username, password); // Call the rate-limited login function
