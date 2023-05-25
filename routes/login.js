// Import required modules
const express = require("express");
const bcrypt = require("bcrypt");
const csrf = require("csurf");
const rateLimit = require("express-rate-limit");
const { User } = require("./models"); // Assuming the User model is defined in a separate file

// Create an Express app
const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum of 5 requests per windowMs
  message: "Too many login attempts. Please try again later.",
});

// Login form route
app.get("/login", csrfProtection, (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
      </div>
      <button type="submit">Login</button>
    </form>
  `);
});

// Login route
app.post("/login", csrfProtection, limiter, async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (user) {
      // Compare the entered password with the stored password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Successful login
        res.send("Login successful");
        return;
      }
    }

    // Failed login
    res.send("Invalid username or password");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
