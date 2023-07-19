const express = require('express');
const app = express();
const {MongoClient} =  require('mongodb');
const Mongo = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url)

async function main(){
    await client.connect()
}

const collection = client.db('internfeb').collection('dashboard');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 7710;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok')
})

//addd User
app.post('/addUser',async(req,res) => {
    await collection.insertOne(req.body);
    res.send('Data Added')
})


//get user
app.get('/users',async(req,res) => {
    const output = [];
    const query = {};
    const cursor = collection.find(query);
    for await (const data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output)
})



app.listen(port,() => {
    main()
    console.log(`Server is running on port ${port}`)
})