const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}
connectToMongoDB();

// Simple route
app.get('/', async (req, res) => {
    try {
        const database = client.db('mydb');
        const collection = database.collection('test');
        const documents = await collection.find().toArray();
        res.send(documents);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});











// // app.js
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });