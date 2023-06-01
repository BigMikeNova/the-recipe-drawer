# The Recipe Drawer

The Recipe Drawer is a user-friendly website designed for food enthusiasts to discover, share, and save their favorite recipes. Users can browse a wide variety of recipes, create and share their own culinary creations, and conveniently save recipes for later use. This README provides an overview of the website's features, technologies used, and instructions for setting up and running the application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Browse Recipes**: Users can explore an extensive collection of recipes posted by other community members, making it easy to find inspiration for their next meal.

2. **Create and Share Recipes**: Registered users can create their own recipes, providing detailed instructions, ingredients, cooking times, and other relevant information. These recipes can then be shared with the community, allowing others to benefit from their culinary expertise.

3. **Save Recipes**: Users can save their favorite recipes to their personal account, making it convenient to access them later without the need for searching.

4. **Google Authorization**: The website implements Google authorization to offer a seamless and secure login process. Users can sign in using their Google accounts, ensuring a smooth authentication experience.

5. **Password Protection**: To enhance security, the website implements password protection with a limited number of attempts. After a certain number of unsuccessful login attempts, access is temporarily restricted, helping to prevent unauthorized access.

## Technologies Used

The Recipe Drawer is built using the following technologies:

- Express.js: A fast and minimalist web application framework for Node.js, providing robust routing and middleware capabilities.

- Node.js: A JavaScript runtime environment that allows server-side execution of JavaScript code.

- Sequelize: A powerful and flexible Object-Relational Mapping (ORM) library for Node.js, used for database management.

- MySQL: A widely-used open-source relational database management system that stores and manages data.

- Handlebars: A templating engine that simplifies the process of creating dynamic HTML templates.

- Google Authorization: Integration of Google OAuth 2.0 authentication for secure and convenient user login.

## Getting Started

To get the website up and running on your local machine, follow the steps below.

### Installation

1. Clone the repository:

git clone https://github.com/YourUsername/the-recipe-drawer.git


2. Install the necessary dependencies:

cd the-recipe-drawer
npm install


3. Set up the MySQL database:

- Create a MySQL database with an appropriate name (e.g., `recipe_drawer_db`).
- Update the database configuration file (`config/config.js`) with your MySQL credentials.

4. Configure Google Authorization:

- Obtain Google OAuth 2.0 credentials by creating a new project on the [Google Cloud Platform Console](https://console.developers.google.com/).
- Set the authorized redirect URL to `http://localhost:3000/auth/google/callback`.
- Update the Google OAuth configuration file (`config/auth.js`) with your credentials.

### Usage

1. Start the application:

npm start


2. Access the website in your browser:

http://localhost:3001


3. Explore the features of The Recipe Drawer by browsing, creating, and saving recipes.

## Contributors

The Recipe Drawer was created by the following team members:

Jacob Krieger
Doran Walker
Mike Novachek

## License

The Recipe Drawer is licensed under the [MIT License](LICENSE). Feel free to modify and distribute the code as per the terms of the license.

---

Now you're ready to set up and run The Recipe Drawer on your local machine. Happy cooking and sharing! If you have any questions or need further assistance, please don't hesitate to reach out.
