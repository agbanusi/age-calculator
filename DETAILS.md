## How does this work

- Clone the repository with `git clone https://github.com/agbanusi/age-calculator.git`
- Then install the dependencies used, mainly `express-rate-limit`, `dotenv` and `express` with `yarn install`
- Then you can start the app with `yarn start` for production or staging use or `yarn dev` for development
- The send a GET request to `/howold` adding a `dob` query like this `localhost/howold?dob=823456578998` and you'll get a response like `{"age":26,"message":"successful"}`.

## How it was built

It was built with Nodejs and Love ❤️.

- The `server.js` file was created to house the express app server to listen for a port, after importing the app from `app.js`
- The `app.js` file contains the bulk from loading the dotenv configuration, to set up of rate-limiter per user using the ip address
- The `app.js` file alos contains the route `/howold` and the default response for undefined requested routes.
- In the `/howold` route, it first get the query parameter of dob, then subtracts the dob which is assumed to be in timestamp from Date.now, which is the currenct timestamp of the very millisecond the request was made. The difference is in milliseconds so it is converted to years by assuming a year is 365.25 days, 1 day is 24 hours, 1 hour is 3600 seconds and 1 second is 1000 milliseconds. The age in year is returned in integer form by taking the rounded down figure.
- Error handling was done to treat all cases including edge cases.
