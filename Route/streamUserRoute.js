const router = require("express").Router()
const { createUser, loginpage, login, dashboardPage, userLogout, signup } = require("../Controller/Streamer/streamUserController")

router.post("/create/streamer", createUser)
router.post("/login", login)
router.get('/login', loginpage)
router.get("/dashboard", dashboardPage)
router.get('/logout', userLogout)
router.get('/sign-up', signup)
module.exports = router