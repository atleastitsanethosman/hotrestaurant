// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservation Data
const tables = [];
const waitList =[];

// Routes

// route for main landing page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitList));
// app.get('/about');

// Create New Characters - takes in JSON input
app.post('/reserve', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;
  console.log(newReservation);
    if (tables.length < 6) {
        tables.push(newReservation)
        res.send(true)
    } else {
        waitList.push(newReservation)
        res.send(false)
        };
    });

app.post('/api/clear', (req, res) => {
    tables = [];
    waitList = [];
})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));