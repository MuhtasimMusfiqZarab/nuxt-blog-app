// here we can write our own express code // this will only be executed by node
const express = require("express");

//express router
const router = express.Router();

//transform incomming request data as it has a wrong format
// incoming req & res is mapped to the api provided by express
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

//creating our own route here
router.post("/track-data", (req, res) => {
  console.log("Stored data", req.body.data); // this would be shown inside of the server while logged in
  res.status(200).json({ message: "Success" });
});

//since we are in the node js envoronemt
module.exports = {
  path: "/api", // tracked data is reached by going to /api/track-data
  handler: router
};
