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
// route to view tables data
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
// route to view api version of tables.
app.get('/api/tables', (req, res) => res.json(tables));
// route to view API version of waitlist.
app.get('/api/waitlist', (req, res) => res.json(waitList));
// route to view reservation page
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')))

// Create new reservation, takes in data from reservation webpage
app.post('/reserve/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
//   if function to send anybody over 6 reservations to the waitlist.
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