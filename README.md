﻿# CS50x Final Project || The 42 Blog

#### Video Demo: [Watch the Demo](https://www.youtube.com/watch?v=mgtjIPppiRI)

## Description

For my CS50x Final Project, I developed a full-stack web application called "The 42 Blog." This project is built using HTML, CSS, JavaScript, EJS, Git, npm, Node.js, Express, and MongoDB. The application is currently deployed on Heroku and has a custom domain name provided by Hostinger.

The core functionalities of the application include multiple routes, a login and registration authentication system, an Admin Panel for managing posts (Add, Edit, Delete), and a search post system. Users can visit the site and interact with the content, while administrators have additional privileges to manage the blog posts.

You can visit the site here: [The 42 Blog](https://www.iker42.blog/)

## Project Structure

### 1. 

app.js


This is the main entry point of the application. It sets up the Express server, connects to the MongoDB database, and configures middleware such as body-parser, cookie-parser, and session management. It also defines the routes for the application.

### 2. 

views


This directory contains all the EJS templates used for rendering the HTML pages.

- `layouts/`
  - `admin.ejs`: The layout template for the Admin Panel. It includes the header, footer, and main content area for admin-related pages.

- `partials/`
  - `header.ejs`: The header template included in all pages. It contains the navigation bar and logo.
  - `footer.ejs`: The footer template included in all pages.
  - `header__admin.ejs`: The header template specifically for the Admin Panel.
  - `searchBar.ejs`: The search bar template included in the header.
  - `dropdown.ejs`: The dropdown menu template included in the header.
  - `diseñoAdmin.ejs`: The design template for the Admin Panel.
  - `diseñoCofre.ejs`: The design template for the chest.
  - `diseño.ejs`: The general design template.

### 3. 

public


This directory contains all the static assets such as CSS, JavaScript, and images.

- `css/`
  - `style.css`: The main stylesheet for the application. It contains all the custom styles for the blog.

- `js/`
  - `script.js`: The main JavaScript file for the application. It contains all the client-side scripts.

### 4. `routes/`
This directory contains all the route handlers for the application.

- `index.js`: Defines the routes for the main pages of the blog.
- `admin.js`: Defines the routes for the Admin Panel.

### 5. `models/`
This directory contains all the Mongoose models for the application.

- `User.js`: The model for the user schema, which includes fields for username, email, and password.
- `Post.js`: The model for the post schema, which includes fields for title, content, author, and timestamps.

### 6. `controllers/`
This directory contains all the controller functions for handling the business logic of the application.

- `authController.js`: Handles user authentication, including login, registration, and logout.
- `postController.js`: Handles CRUD operations for blog posts.

### 7. `middlewares/`
This directory contains all the middleware functions for the application.

- `authMiddleware.js`: Middleware for protecting routes that require authentication.

### Design Choices

#### Authentication System
One of the key features of the application is the authentication system. I chose to implement this using Passport.js, a popular authentication middleware for Node.js. Passport.js provides a flexible and modular approach to authentication, allowing me to easily add different strategies in the future if needed. The current implementation uses local strategy with username and password.

#### Admin Panel
The Admin Panel is a crucial part of the application, allowing administrators to manage blog posts. I debated whether to use a separate admin dashboard framework or build a custom solution. I decided to build a custom solution using EJS templates to maintain consistency with the rest of the application and have full control over the design and functionality.

#### Database
For the database, I chose MongoDB due to its flexibility and ease of use with Node.js. MongoDB's document-based structure is well-suited for the blog's data model, which includes users and posts. I used Mongoose as the ODM (Object Data Modeling) library to interact with MongoDB, as it provides a straightforward way to define schemas and perform CRUD operations.

#### Deployment
I deployed the application on Heroku because of its simplicity and seamless integration with Git. Heroku's free tier is sufficient for the initial deployment and testing of the application. For the custom domain, I used Hostinger, which provides affordable domain registration services.

## Credits

- Matellng Ng on Pinterest for the Red and Admin Dragon gif images.
- [Minecraft Wiki](https://minecraft.wiki/) for the chest gif image.

## Conclusion

Creating "The 42 Blog" for my CS50x Final Project has been an incredible learning experience. I have gained hands-on experience with full-stack web development, including front-end design, back-end development, and database management. I am continually improving the application and plan to add more features in the future. Thank you, CS50x, for this amazing journey!

## Thanks, CS50x !!!
