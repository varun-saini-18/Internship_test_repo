const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');
const e = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/insert', (request, response) => {
    const { name }= request.body;
    const { zero }= request.body;
    const { one }= request.body;
    const { two }= request.body;
    const { three }= request.body;
    const { four }= request.body;
    const { five }= request.body;
    const { six }= request.body;
    const { seven }= request.body;
    const { eight }= request.body;
    const { nine }= request.body;
    const { ten }= request.body;

    const db = dbService.getDbServiceInstance();

    const result1 = db.searchByName(name);
    
    result1
    .then(data => {
        if(data.length===0)
        {
            const result = db.insertNewName(name,zero,one,two,three,four,five,six,seven,eight,nine,ten);
            result
            .then(data => response.json({ data: data}))
            .catch(err => console.log(err));
        }
        else
        {
            response.json()
        }})
    .catch(err => console.log(err));   
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result
    .then(data => {
       
        response.json({data : data})})
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result1 = db.searchByName(name);
    
    result1
    .then(data => {
        if(data.length===0)
        {
            const result = db.updateNameById(id, name);   
            result
            .then(data => response.json({success : data}))
            .catch(err => console.log(err));
        }
        else
        {
            response.json({success : data});
        }
    })
    .catch(err => console.log(err));

    // const result = db.updateNameById(id, name);
    
    // result
    // .then(data => response.json({success : data}))
    // .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log('app is running'));