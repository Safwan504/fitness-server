const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5055;
app.use(cors());
app.use(bodyParser.json())
const ObjectId = require('mongodb').ObjectId;





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xya5g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    
  const courseCollection = client.db("fitness").collection("courses");
  const registrationCollection = client.db("fitness").collection("registeredCourses");
  const reviewCollection = client.db("fitness").collection("reviews");
  // perform actions on the collection object
  app.get('/courses', (req, res) => {
    courseCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.get('/course/:id', (req, res) => {
      const id = req.params.id;
    courseCollection.find({_id: ObjectId(id)})
    .toArray((err, documents) => {
        res.send(documents[0])
    })
  })

  // app.post('/addCourses', (req, res) => {
  //   const courses = req.body;
  //   courseCollection.insertMany(courses, (err, result) => {
  //     res.send({count: result});
  //   })
  // })
  app.post('/addRegistration', (req, res) => {
    const registeredCourses = req.body;
    registrationCollection.insertOne(registeredCourses, (err, result) => {
      res.send({count: result});
    })
  })
  
  app.get('/registrations', (req, res) => {
    registrationCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.get('/registration/:email', (req, res) => {
    const email = req.params.email;
    registrationCollection.find({email: email})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.post('/addService', (req, res) => {
    const service = req.body;
    courseCollection.insertOne(service, (err, result) => {
      res.send({count: result});
    })
  })

  app.post('/addReview', (req, res) => {
    const review = req.body;
    reviewCollection.insertOne(review, (err, result) => {
      res.send({count: result});
    })
  })

  app.get('/reviews', (req, res) => {
    reviewCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
//   client.close();
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})