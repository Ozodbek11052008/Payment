const { payPageIp } = require("../Controller/Front End/frontEndController");
const { createPayment, payPage } = require("../Controller/Streamer/paymentController")
const express = require('express')
const router = require("express").Router()
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

// router.post("/pay", (req, res) => {
//     io.emit("paymentSuccess");  
    // console.log('postew');
//     res.send(200); 
//   });
//   io.on("connection", (socket) => {
//     socket.on("disconnect", () => {});
//   });

router.get("/donate/:id", payPage)
router.get("/test/ip", payPageIp)

router.post('/donate/:id',  createPayment)
module.exports = router