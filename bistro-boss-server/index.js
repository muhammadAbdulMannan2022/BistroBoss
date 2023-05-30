const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
// middelwer
app.use(cors());
app.use(express.json());
// mongo DB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cazjtjr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("bistroBosDb");
    const menu = database.collection("menu");
    const reviews = database.collection("reviews");
    const cartsCullection = database.collection("carts");
    const usersCullection = database.collection("users");
    // users api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCullection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }
      const resault = await usersCullection.insertOne(user);
      res.send(resault);
    });
    app.get("/users", async (req, res) => {
      const resault = await usersCullection.find().toArray();
      // console.log(resault);
      res.send(resault);
    });
    //
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // routs
    app.get("/menu", async (req, res) => {
      const coruser = menu.find();
      const data = await coruser.toArray();
      res.send(data);
    });
    app.get("/reviews", async (req, res) => {
      const coruser = reviews.find();
      const data = await coruser.toArray();
      res.send(data);
    });
    app.get("/carts/count", async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      if (!email) {
        res.send([]);
      } else {
        const query = { userEmail: email };
        const resault = await cartsCullection.find(query).toArray();
        res.send(resault);
      }
    });
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      if (!email) {
        res.send([]);
      } else {
        const query = { userEmail: email };
        const resault = await cartsCullection.find(query).toArray();
        // console.log(resault);
        let data = [];
        for (const item of resault) {
          const serchBy = { _id: item?.itemId };
          const food = await menu.findOne(serchBy);
          // console.log(food);
          data.push(food);
        }
        // console.log(data);
        res.send(data);
      }
    });
    app.post("/carts", async (req, res) => {
      const item = req.body;
      // console.log(item);
      const result = await cartsCullection.insertOne(item);
      res.send(result);
    });
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { itemId: id };
      // console.log(id, "hitting");
      const delted = await cartsCullection.deleteOne(query);
      res.send(delted);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// ---------------
app.get("/", (req, res) => {
  res.send(`boos is watching....`);
});
app.listen(port, () => {
  console.log(`boos is wtaching on port ${port}`);
});
// Es4vYyfkbAJZeVrE
// bistroBos
