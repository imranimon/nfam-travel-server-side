const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors())
app.use(express.json())






app.get('/', (req, res) => {
    res.send('NFAM Travel Server Running')
})

app.listen(port, () => {
    console.log('NFAM Travel Server is Listening on port', port)
})