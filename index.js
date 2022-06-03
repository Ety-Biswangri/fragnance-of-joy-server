const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


function verifyJWT(req, res, next) {
    const headersAuth = req.headers.authorization;
    if (!headersAuth) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

    const token = headersAuth.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' });
        }
        req.decoded = decoded;
        next();
    })

}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ipcgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoriesCollection = client.db("fragnanceOfJoy").collection("inventories");

        // AUTHORIZATION API
        app.post('/login', (req, res) => {
            const userEmail = req.body;
            const accessToken = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            // console.log(token);
            res.send({ accessToken });
        })


        // INVENTORIES APIs
        app.get('/inventories', async (req, res) => {
            const query = req.query;
            const cursor = inventoriesCollection.find(query);
            const inventories = await cursor.toArray();

            res.send(inventories);
        })

        app.get('/items', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const email = req.query.email;

            if (email === decodedEmail) {
                const query = { email };
                const cursor = inventoriesCollection.find(query);
                const items = await cursor.toArray();

                res.send(items);
            }
            else {
                res.status(403).send({ message: 'forbidden access' });
            }
        })

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoriesCollection.findOne(query);

            res.send(inventory);
        })

        app.post('/inventories', async (req, res) => {
            const newInventory = req.body;
            console.log(newInventory);
            const result = await inventoriesCollection.insertOne(newInventory);

            res.send(result);
        })

        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(query);
            const result = await inventoriesCollection.deleteOne(query);

            res.send(result);
        })

        app.put('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const quantityUpdate = req.body;

            const query = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    quantity: parseInt(quantityUpdate.quantity)
                },
            };
            const result = await inventoriesCollection.updateOne(query, updateDoc, options);

            res.send(result);
        })

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