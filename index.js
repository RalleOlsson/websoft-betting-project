/**
 * A sample Express server.
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const app = express();
const path = require("path");
const middleware = require("./middleware/index.js");
const routeHome = require("./route/home.js");
const routeLogin = require("./route/login.js");
const routeIndex = require("./route/index.js");
const routeApi = require("./route/api.js");

app.set("view engine", "ejs");

app.use(middleware.logIncomingToConsole);
app.use(express.static(path.join(__dirname, "static_resources")));
app.use("/", routeIndex);
app.use("/home", routeHome);
app.use("/api", routeApi);
app.use("/login", routeLogin);



app.listen(port, logStartUpDetailsToConsole);

/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
function logStartUpDetailsToConsole() {
    let routes = [];

    // Find what routes are supported
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Routes added as router middleware 
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}