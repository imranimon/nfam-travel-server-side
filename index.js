const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

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
        const database = client.db("NFamTravel");
        const serviceCollection = database.collection("services");
        const orderCollection = database.collection("orders")
        app.get('/db', (req, res) => {
            res.send('Database connected')
        })

        //Service related api
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray()
            res.json(services);
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await serviceCollection.findOne(query);
            res.json(result);
        })


        //Order related api
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result)
        })

        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find({})
            const orders = await cursor.toArray()
            res.json(orders);
        })

        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const cursor = await orderCollection.find(query);
            const orders = await cursor.toArray()
            res.json(orders);
        })




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