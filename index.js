const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ipcgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoriesCollection = client.db("fragnanceOfJoy").collection("inventories");

        app.get('/inventories', async (req, res) => {
            const query = req.query;
            const cursor = inventoriesCollection.find(query);
            const inventories = await cursor.toArray();

            res.send(inventories);
        })

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoriesCollection.findOne(query);

            res.send(inventory);
        })

        /* app.put('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {

                },
            };
            const result = await inventoriesCollection.updateOne(filter, updateDoc, options);

            res.send(inventory);
        }) */

    }
    finally {

    }
}
run().catch(console.dir);

/* client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log('DB Connected');
}); */


app.get('/', (req, res) => {
    res.send('Fragnance of Joy Server is Running');
})

app.listen(port, () => {
    console.log(`listening on port`, port);
})