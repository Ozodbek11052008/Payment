const payment = require("../../stream model/payment.js");
const User = require("../../stream model/user.js")
const bcrypt = require('bcrypt')
const express = require('express')
const router = require("express").Router()
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);
const socket = require("socket.io-client")("[^3^][6]", { rejectUnauthorized: false });
const streamUsersers = {

    createPayment: async (req, res) => {
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

    },

    payPage: async (req, res) => {

        const data = await User.findById(req.params.id)

        console.log(data);
        res.render('frontend/pay', {
            layout: false,
            data
        })

    },




}

module.exports = streamUsersers