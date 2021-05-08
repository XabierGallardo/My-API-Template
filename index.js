const express = require('express');
const app = express();
const PORT = 8085;

//Apply middleware
app.use( express.json() );

//Handler, run this function when the route is requested
app.get('/tshirt', (req, res) => {

    res.status(200).send({
        tshirt: 'red',
        size: 'large'
    });

});

app.post('/tshirt/:id'), (req, res) => {

    const { id } = req.params;
    const { logo } = req.body;

    if(!logo) {
        res.status(418).send({ message: 'We need a logo!'})
    }

    res.send({
        tshirt: `red with your ${logo} and ID of ${id}`,
    });

};