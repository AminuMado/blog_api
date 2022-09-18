<p align="center">
  <a href="#">
    <h1 align="center">Blog Site</h1>
  </a>
</p>

A simple blog application built with the MERN stack. Browse from the current selection of blog posts made by other members or share your own. Join in on the discussion of your favorite content.

The backend is built out using Node.js and the Express framework. The frontend uses React to create a user-friendly interface. MongoDB Atlas is used for the database working with mongoose. The application is deployed with Heroku. On the backend, the main REST API endpoints are built following the MVC architecture enabling ease of development. API endpoints are secured behind appropriate authentication middlewares.Authentication is handled using JWT. On the frontend with React, the app is structured cleanly with different pages and components. State management is done primarily through basic useState along with useReducer, useContext, and a custom hook for more complex logic. Authentication and blog services are created for ease of use when interacting with the backend APIs.

## Features

- User authentication with JWTs (JSON Web Token).
- Rich text editor for creating posts via the TincyMCE API
- User authorization and permissions management.
- Server side APIs are written using REST architecture.
- Securing passwords using bcryptjs.
- Client side form validation using react-hook-form before submitting user data.
- Schema validation using Mongoose.

---

## Learnings

> The importance of returning back good JSON, it should be exactly what is needed and requested- nothing more.

> The power an API can offer in terms of decoupling the backend and frontend eg: using a seperate CMS to add, update and delete posts & comments.

> How to create and store JWT tokens and the flexibility they offer in terms of accessing an API

> The importance of UseEffect in cleaning up async requests that are yet to be processed- avoiding memory leaks

## Built using

- MERN Stack
- API deployed using Heroku
