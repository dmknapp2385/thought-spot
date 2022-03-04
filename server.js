const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');


app.use(express.urlencoded ({extended: true}));
app.use(express.json());

app.use(require('./routes'));

mongoose.connect('mongodb://localhost/thoughtdb', () => {
    console.log('Connection to Thoughtdb');
});

mongoose.set('debug', true);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


