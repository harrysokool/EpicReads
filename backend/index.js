import express from 'express';
// use port in this file
import { PORT } from './config.js'

const app = express();

// create a function for listening to this port with a callback function
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});