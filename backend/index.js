

const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// connecting node js with mongodb
const uri = `mongodb+srv://vencap:uyHEL5s2VqWIn45i@cluster0.li11u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000, // Adjust the timeout values as needed
    socketTimeoutMS: 60000,
  });
async function run() {
    try {
        await client.connect();
        const projectCollection = client.db("vencap").collection("projects");
        const userCollection = client.db("vencap").collection("users");
      

        
          
          
        

        // get all the projects
        app.get("/projects", async (req, res) => {
            const projects = await projectCollection.find({}).toArray();
            res.json(projects);
        })

        // find a project using project id for view in the home or explore page
        app.get("/project/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await projectCollection.findOne(query);
            res.json(result);
        })
        
        // post a new product
        app.post("/projects", async (req, res) => {
            const newProject = await projectCollection.insertOne(req.body);
            res.json(newProject);
        })
        // delete a project 
        app.delete("/projects/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id:new ObjectId(id) };
            const deletedProject = await projectCollection.deleteOne(query);
            res.json(deletedProject);
        })
        // get all registered users
        app.get("/users", async (req, res) => {
            const allUsers = await userCollection.find({}).toArray();
            res.json(allUsers);
        })

        // get a particular user
        app.get("/users/single", async (req, res) => {

            const particularUser = await userCollection.findOne({ email: req.query.email });
            res.json(particularUser);
        })

        // confirming does the logged in user is admin or not
        app.get("/users/admin", async (req, res) => {
            const email = req.query.email;
            const particularUser = await userCollection.findOne({ email: email });


            let isAdmin = false;
            if (particularUser?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        })

        // post a new user in database
        app.post("/users", async (req, res) => {

            const newUser = await userCollection.insertOne(req.body);
            res.json(newUser);
        })

        

       

        

        // post a user who logged in using google || update user
        app.put("/users", async (req, res) => {
            const filter = { email: req.body.email };
            const options = { upsert: true }
            const user = { $set: req.body };
            const result = await userCollection.updateOne(filter, user, options);
            res.json(result);
        })

        

       

        
    }
    finally {

    }
}
run().catch(console.dir);

app.get("/", (req, res) => {

    res.json("Backend is working");
})
app.listen(port, () => {
    console.log("Listening to port ", port);
})