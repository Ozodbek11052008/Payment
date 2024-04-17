const express = require("express");
const app = express();
const http = require("http").createServer(app);
var cookieParser = require('cookie-parser');
const User = require("./stream model/payment")

app.use(cookieParser());
const io = require("socket.io")(http);
const PORT = 5000 || process.env.PORT;
const path = require("path");
const cors = require("cors");
const connectDb = require('./Config/db')
connectDb()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const Layout = require('express-ejs-layouts')
require('ejs')
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(Layout)
// donation
app.get("/donate/notifaction/user/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index2.html"));

});

// app.post("/pay", (req, res) => {
//     io.emit("paymentSuccess");  
//     res.sendStatus(200); 
//   });
const payment = require("./stream model/payment");

app.post('/donate/:id',
  async (req, res) => {
    io.emit("paymentSuccess");

    const data = await User.findById(req.params.id)
    console.log(data);
    const { payer, amount, cardNumberPayer, streamer, text } = req.body

    const paymentsdb = new payment({
      payer, amount, streamer, text, cardNumberPayer
    })
    await paymentsdb.save()
      .then(data => res.redirect('/',
      ))
      .catch(err => res.send(err))

  })

io.on("connection", (socket) => {
  socket.on("disconnect", () => { });
});

app.use(require('./Route/streamUserRoute'))
app.use(require('./Route/frontEndRoute'))
app.use(require('./Route/payRoute'))
http.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port`);
});
