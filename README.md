# This is an note taking app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Here's how I built this webapp to understand CRUD operations using MERN stack and bootstrap for css.

### You can visit the webapp here: [https://use-noted.netlify.app/login](https://use-noted.netlify.app/login)

One more thing to add here, the webapp will feel slow whenever there's a backend used due to using the free tier of MongoDB atlas and render.

When I started learning ReactJs, I also learned some concepts of MongoDB and express and I was also building this webapp for my portfolio. First I defined the schema for MongoDB, then set up the backend APIs for authentication and CRUD operations.

I installed MongoDB Compass to see if my backend is connected to the MongoDB database and if the CRUD APIs are working. I preferred using Thunderclient VsCode extension over postman to hit backend API endpoints.

I had my backend and frontend separated, so I could deploy them on different servers. I added CORS middleware to the backend code so that I could make cross-origin requests.

Building the front end was so easy, I was confused should I use REDUX or context API for state management, but I choose context API because I'm lazy and I didn't want to install one more package.

I was using prettier formatter, but I disabled it and used the default VsCode formatter because I'm not used to prettier's formatting, I didn't use typescript or ESLINT, because I'm not much familiar with either.

I was using localhost:3000 for the frontend and localhost:5500 for the backend. Later this thing caused an error which took me half an hour to understand because sometimes I ignore simple things. I was burned out and felt so stupid I went for a walk.

I used bootstrap css for styling. I should've used Tailwindcss, but I was not familiar with it when I was building this webapp. The styling is not my best work though. I can make it better, but I won't.

I connected my frontend with the backend API endpoints added a login system to the webapp, a modal for a form to update the notes, and installed react-router-dom for routing. And I don't have any idea about testing and using cypress and other libraries which I'll learn later on.

I learned a lot of react concepts while building this webapp. The react hooks like useState, useContext, createContext, routing, fetch API and much more. When my app was ready then I decided to deploy it but didn't know where to deploy it, so I asked some people on Twitter.

I decided to deploy the backend on Heroku, frontend on netlify and the database on MongoDB Atlas. I thought It'd be hard, but it was a piece of cake. I got help from some blogs and docs. I created a cluster for the database, I didn't know what a cluster is, so I just named it projects.

Pushed the backend code on Heroku using Heroku CLI and frontend code on netlify using netlify CLI. Replaced the localhost MongoDB URI with remote MongoDB URI as an environment variable on Heroku and the backend APIs in the frontend with the endpoints provided by Heroku.

Then still my backend endpoints weren't working. I thought my backend is not connected to the database, checked the MongoDB URI again and again, and it was fine. Later I realized my backend is on port 5500, I changed it to 3000 and Viola! I don't know how it happened, it worked.

On Nov 28, 2022, Heroku stopped their generous free dyno services, so I had to migrate my webapp's backend from there. Again I got recommended to use render to host my backend server by a Twitter user. so, I connected my github profile with render and deployed the backend to render, changed the API endpoints from the frontend code and again deployed the build to netlify using their CLI.
