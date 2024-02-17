const User = require('../../stream model/user')
const bcrypt = require('bcrypt')

const streamUsersers = {

    createUser: async (req, res) => {

        const { login, password, cardNumber } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const usersdb = new User({
            login, password: passwordHash, cardNumber
        })
        await usersdb.save()
            .then(data => res.redirect('/login'))
            .catch(err => res.send(err))
    },
    login: async (req, res) => {
    
        const user = await User.findOne({ login: req.body.login })

 
        if (user) {

            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                console.log('errpr');
            } else {

                res.cookie("userData", user, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                res.redirect('/dashboard')
            }
        }

        else { res.send("login yoki parol xato") }

    },
    loginpage: async (req, res) => {
        console.log(req.cookies.userData);
        let user = req.cookies.userData
        if (user) {
            res.redirect("/dashboard")
        } else {
            res.render('admin/login', {
                layout: false,
            })
        }


    },
    dashboardPage: async (req, res) => {
        const user = req.cookies.userData
        res.render('admin/index', {
            layout: "./layout/admin_layout",
            user
        })
    },
    userLogout: async (req, res) => {
        let user = req.cookies.userData;

        if (user) {
            res.clearCookie("userData").redirect("/login")
            res.end()

        }
        else (
            res.redirect("/login")
        )

    },
    signup: async (req, res) => {


        res.render('admin/signup', {
            layout: false,

        })

    }




}

module.exports = streamUsersers