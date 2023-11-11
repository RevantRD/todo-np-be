const express = require("express");
//Cors for connecting backend with frontend
const cors = require("cors");
//Node persist for storage
const storage = require("node-persist");
const app = express();
storage.init();
app.use(cors());
app.use(express.json());

//To get the values from storage
app.get("/get", async (req, res) => {
  const resp = await storage.values();
  res.status(200).send(resp);
});

//To add values to the storage
app.post("/add", async (req, res) => {
  const { items } = req.body;
  const resp = await storage.setItem(items, { items });
  res.status(201).send({ message: "Task added", resp });
});

//To clear the storage while restarting the node
async function init() {
  await storage.init();
  await storage.clear();
}

//Starting the server
app.listen(5000, () => {
  console.log("Server has started");
  init();
});
