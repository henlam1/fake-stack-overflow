Read the Project Specfications [here](https://docs.google.com/document/d/1zZjNk9cbNLz0mp_-YtyZxhMzUph97fVgCkSE4u2k5EA/edit?usp=sharing).

Add design docs in *images/*

## Instructions to setup and run project
NPM install packages required
Go to server path, run mongod and nodemon at server address
Go to client path, npm start
An example can be found at the top of server.js

Extra Packages Added: Cookie-parser, Express-session, email-validator

## Design Patterns
My project uses an Observer Pattern I think. The fakestackoverflow component is the subject, since it stores and manages the states for all the other components.
Banner, secondary, and main are all observer components that observes user inputs from buttons/text inputs and updates the main state in fakestackoverflow.

## Miscellaneous
Modified question schema. Tags are no longer required because users with less than 100 rep can't make new tags

Referenced some code on these websites
https://www.w3schools.com/howto/howto_css_arrows.asp
https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/