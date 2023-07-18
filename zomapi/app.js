let express = require('express');
let app = express();
let mongo = require('mongodb');
let dotenv  = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let {dbConnect,getData,getDataSort,
    getDataSortLimit,postData,updateData,deleteData} = require('./controller/dbController')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//heart beat
app.get('/',(req,res) => {
    res.status(200).send('Health ok')
});

//list of city
app.get('/location',async(req,res) => {
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query);
    res.send(output)
})


//list of rest
app.get('/restaurants',async(req,res) => {
    let query = {};
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);
    if(stateId && mealId){
        query = {
            state_id:stateId,
            "mealTypes.mealtype_id":mealId
        }
    }
    else if(stateId){
        query = {
            state_id:stateId
        }
    }else if(mealId){
        query = {
            "mealTypes.mealtype_id":mealId
        }
    }
    let collection = 'restaurants';
    let output = await getData(collection,query);
    res.send(output)
})


//mealType
app.get('/mealType',async(req,res) => {
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query);
    res.send(output)
})


//filters
app.get('/filters/:mealId',async(req,res) => {
    let query = {};
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1};
    let skip = 0;
    let limit = 1000000000;
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit)
    }
    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(cuisineId){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }else if(lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    let collection = "restaurants";
    let output = await getDataSortLimit(collection,query,sort,skip,limit);
    res.send(output);
})

//restaurants details
app.get('/details/:id', async(req,res) => {
    //let id = Number(req.params.id);
    //let query = {restaurant_id:id};
    let _id = mongo.ObjectId(req.params.id);
    let query = {_id}
    let output = await getData("restaurants",query)
    res.send(output)
})

//menu wrt to rest
app.get('/menu/:id',async(req,res) => {
    let id = Number(req.params.id);
    let query = {restaurant_id:id};
    let output = await getData("menu",query)
    res.send(output)
})

//orders
app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }
    let output = await getData("orders",query)
    res.send(output)
})

//placeOrder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = 'orders';
    let response = await postData(collection,data)
    res.send(response)
})


//update orders
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {_id:mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateData(collection,condition,data)
    res.send(output)
})

// delete orders
app.delete('/deleteOrder',async(req,res) => {
    let collection = "orders"
    let condition = {_id:mongo.ObjectId(req.body._id)}
    let rowcount = await getData(collection,condition);
    if(rowcount.length > 0){
        let response = await deleteData(collection,condition)
        res.send('Data Deleted')
    }else{
        res.send('No Record Found')
    }
})


app.listen(port,() => {
    dbConnect()
    console.log(`Listing to port ${port}`)
})
