const User = require("./models/user"); // Import the User model

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

// Usage example
//const username = "example_user";
//const password = "password123";

login(username, password); // Call the login function
