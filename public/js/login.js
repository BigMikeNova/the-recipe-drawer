const User = require("./models/user"); // Import the User model
const RateLimit = require("express-rate-limit"); // Import the rate limiter

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
//const username = "example_user";
//const password = "password123";

loginWithRateLimit(username, password); // Call the rate-limited login function
