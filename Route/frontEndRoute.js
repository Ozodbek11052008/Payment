const { clientPage } = require("../Controller/Front End/frontEndController")

const router = require("express").Router()



router.get("/", clientPage)
module.exports = router