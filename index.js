const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ug28d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('Database Connected');
        app.get('/db', (req, res) => {
            res.send('Database connected')
        })
        // const database = client.db("NFamTravel");
        // const serviceCollection = database.collection("services");
        // const doc = {
        //     title: "Record of a Shriveled Datum",
        //     content: "No bytes, no problem. Just insert a document, in MongoDB",
        // }
        // const result = await serviceCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('NFAM Travel Server Running')
})

app.listen(port, () => {
    console.log('NFAM Travel Server is Listening on port', port)
})