const mongoose = require("mongoose")
const dburl = 'mongodb+srv://yosh_dasturchi:11052008ozod@cluster0.qih2a9m.mongodb.net/'
const connectDB = async () => {
    await mongoose.connect(dburl, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
        family: 4
          
    }).then(data => {
        console.log(`mongodb is conected at ${data.connection.host}`);
    })
    .catch(err =>{
        console.log(err);
    })
}
module.exports = connectDB