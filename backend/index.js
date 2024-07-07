const express = require('express');
const SSLCommerzPayment = require('sslcommerz-lts')
const app = express();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
//ssl commerz connection

const store_id = `${process.env.SSL_STORE_ID}`
const store_passwd =  `${process.env.SSL_STORE_PASSWORD}`
const is_live = false //true for live, false for sandbox

// connecting node js with mongodb
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.li11u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000, // Adjust the timeout values as needed
    socketTimeoutMS: 60000,
  });
  const hex = /[0-9A-Fa-f]{6}/g;
async function run() {
    try {
        await client.connect();
        const projectCollection = client.db("vencap").collection("projects");
        const userCollection = client.db("vencap").collection("users");
      const rechargeCollection=client.db('vencap').collection("recharges");

        const withdrawCollection=client.db('vencap').collection("withdraw")
          
          
        

        // get all the projects
        app.get("/projects", async (req, res) => {
            const projects = await projectCollection.find({}).toArray();
            res.json(projects);
        })

        // find a project using project id for view in the home or explore page
        app.get("/project/:id", async (req, res) => {
            const id = req.params.id;
            
            const query = { _id:hex.test(id)? new ObjectId(id):id };;
            const result = await projectCollection.findOne(query);
            res.json(result);
        })
       
        
        // post a new product
        app.post("/projects", async (req, res) => {
            const newProject = await projectCollection.insertOne(req.body);
            res.json(newProject);
        })
        
app.put("/projects", async (req, res) => {
    try {
        // console.log(req.body);

        // Construct filter and update objects
        const filter = { _id:  new ObjectId(req.body.projectId) };
        const updatedDocument = {
            equity: req.body.newEquity.toString(), // Ensure equity is a string if needed
            investorsInfo: req.body.newInvestorsInfo,
            amount: req.body.newAmount.toString(), // Ensure amount is a string if needed
            valuation: parseFloat(req.body.newValuation),
            minimumEquityBuy:req.body.newMinimumEquity.toString()
        };
        // console.log(updatedDocument);

        // Perform the update operation
        const options = { upsert: false };
        const project = { $set: updatedDocument };
        const result = await projectCollection.updateOne(filter, project, options);
        // console.log(result);

        // Check result and send response
        if (result.modifiedCount === 1) {
            res.json({ success: true, message: "Project updated successfully" });
        // } else {
        //     res.status(404).json({ success: false, message: "Project not found or not updated" });
        // }
        }
    } catch (error) {
        console.log("Error updating project:", error);
        // res.status(500).json({ error: "Error updating project" });
    }
});        // delete a project 
        app.delete("/projects/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id:hex.test(id)? new ObjectId(id):id };
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
        app.put("/users/investment", async (req, res) => {
            // console.log(req.body)
            const filter = { email: req.body.email };
            const options = { upsert: true }
            const user = { $set:{
                myinvests:req.body.myinvests,
                balance:req.body.userBalance
            }};
            const result = await userCollection.updateOne(filter, user, options);
            res.json(result);
        })
        app.put("/users/getinvestment", async (req, res) => {
            // console.log(req.body)
            const filter = { email: req.body.email };
            const options = { upsert: true }
            const user = { $set:{
                balance:req.body.newBalance
            }};
            const result = await userCollection.updateOne(filter, user, options);
            res.json(result);
        })

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id:hex.test(id)? new ObjectId(id):id };
            const deletedUser = await userCollection.deleteOne(query);
            console.log(deletedUser)
            res.json(deletedUser);
        })
        //ssl commerz withdraw
        app.post('/withdraw', async (req, res) => {
 
            const withdrawInfo=req.body;
            const newTransactionId=new ObjectId().toString();
        console.log(withdrawInfo)

            //sslcommerz init
        // withdrawInfo.balance=(withdrawInfo?.balance===null||withdrawInfo?.balance===undefined)?0:withdrawInfo.balance
            const data = {
                total_amount: parseFloat(withdrawInfo.amount),
                currency: 'BDT',
                tran_id: newTransactionId, // use unique tran_id for each api call
                success_url: `http://localhost:5000/withdraw/success/${newTransactionId}`,
                fail_url: `http://localhost:5000/withdraw/fail/${newTransactionId}`,
                cancel_url: 'http://localhost:3030/cancel',
                ipn_url: 'http://localhost:3030/ipn',
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: withdrawInfo?.name,
                cus_email:withdrawInfo?.email,
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: withdrawInfo?.contact,
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
            // console.log(data)
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
            sslcz.init(data).then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL
                res.send({url:GatewayPageURL})
                console.log('Redirecting to: ', GatewayPageURL)
            });
            // console.log((parseFloat(rechargeInfo.balance) ,parseFloat(rechargeInfo.amount)))
            app.post('/withdraw/success/:tranId',async(req,res)=>{
                
                try {
                    const userInfo = {
                        name: withdrawInfo?.name,
                        email: withdrawInfo?.email,
                        contact: withdrawInfo?.contact,
                        balance: withdrawInfo?.newBalance,
                    };
            
                    const newWithDraw = await withdrawCollection.insertOne({
                        ...userInfo,
                        amount: withdrawInfo?.amount,
                        withdrawTime: new Date().toISOString(),
                        transactionId: newTransactionId,
                        paymentStatus: 'paid'
                    });
                    // console.log((parseFloat(rechargeInfo.balance)+parseFloat(rechargeInfo.amount)))
                    console.log( parseFloat(parseFloat(withdrawInfo.balance),parseFloat(withdrawInfo.amount)) )
                  
                        const updateUserBalance = await userCollection.updateOne(
                            { email: withdrawInfo.email },
                            { $set: { balance: withdrawInfo.newBalance} }
                        );
                        // console.log(updateUserBalance)
                        if (updateUserBalance.modifiedCount > 0) {
                            // res.json({ message: "Recharge successful", balance: userInfo.balance });
                            console.log("User updates successfully")
                            
                        }
                        else{
                            console.log("some error")
                        }
                    
                    
                } catch (error) {
                    console.log("Error while processing recharge:", error.message);
                    // res.status(500).json({ message: "Error while processing recharge" });
                }
                finally{
                    res.redirect("http://localhost:5173/my-profile")
                }
                
        
            })
            app.post('/withdraw/fail/:tranId',async(req,res)=>{
                // console.log(req.params.tranId);
                console.log("withdraw is failed")
                res.redirect("http://localhost:5173/my-profile")
            })
        
            
            
            
        })
    

       //sslcommerz init
app.post('/recharge', async (req, res) => {
 
    const rechargeInfo=req.body;
    const newTransactionId=new ObjectId().toString();
// console.log(rechargeInfo.balance)
    //sslcommerz init
rechargeInfo.balance=(rechargeInfo?.balance===null||rechargeInfo?.balance===undefined)?0:rechargeInfo.balance
    const data = {
        total_amount: parseFloat(rechargeInfo.amount),
        currency: 'BDT',
        tran_id: newTransactionId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/recharge/success/${newTransactionId}`,
        fail_url: `http://localhost:5000/recharge/fail/${newTransactionId}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: rechargeInfo?.name,
        cus_email:rechargeInfo?.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: rechargeInfo?.contact,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    // console.log(data)
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url:GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });
    console.log((parseFloat(rechargeInfo.balance) ,parseFloat(rechargeInfo.amount)))
    app.post('/recharge/success/:tranId',async(req,res)=>{
        
        try {
            const userInfo = {
                name: rechargeInfo?.name,
                email: rechargeInfo?.email,
                contact: rechargeInfo?.contact,
                balance: (parseFloat(rechargeInfo.balance===null?0:rechargeInfo.balance) + parseFloat(rechargeInfo.amount)),
            };
    
            const newRecharge = await rechargeCollection.insertOne({
                ...userInfo,
                amount: rechargeInfo?.amount,
                rechargeTime: rechargeInfo?.rechargeTime,
                transactionId: newTransactionId,
                paymentStatus: 'paid'
            });
            // console.log((parseFloat(rechargeInfo.balance)+parseFloat(rechargeInfo.amount)))
            console.log("Email: ",rechargeInfo.email,"previous balance: ",rechargeInfo.balance,"new-amount: ",rechargeInfo.amount, "balance: ",parseFloat(rechargeInfo.balance)+parseFloat(rechargeInfo.amount) )
            if (!isNaN(parseFloat(rechargeInfo.balance)+parseFloat(rechargeInfo.amount))) {
                const updateUserBalance = await userCollection.updateOne(
                    { email: rechargeInfo.email },
                    { $set: { balance: parseFloat(parseFloat(rechargeInfo.balance)+parseFloat(rechargeInfo.amount)) } }
                );
                console.log(updateUserBalance)
                if (updateUserBalance.modifiedCount > 0) {
                    // res.json({ message: "Recharge successful", balance: userInfo.balance });
                    console.log("User updates successfully")
                    
                }
                else{
                    console.log("some error")
                }
            }
            else{
                console.log("Nana error")
            }
        } catch (error) {
            console.log("Error while processing recharge:", error.message);
            // res.status(500).json({ message: "Error while processing recharge" });
        }
        finally{
            res.redirect("http://localhost:5173/my-profile")
        }
        

    })
    app.post('/recharge/fail/:tranId',async(req,res)=>{
        // console.log(req.params.tranId);
        console.log("recharge is failed")
        res.redirect("http://localhost:5173/my-profile")
    })

    
    
    
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