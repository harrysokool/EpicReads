import express from 'express';
// use port in this file
import { PORT } from './config.js'

const app = express();

// create a route for the server, / is the root route, and we have a callback function
// get is a method, and it gets resources
app.get('/', (request, response) => {
    response.send('Hello World');
    console.log('Hello World');
    return response.status(234).send("testing");
})

// create a function for listening to this port with a callback function
// in terminal, type in "npm run dev", this will run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});