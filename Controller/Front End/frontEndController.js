const path = require("path")

const frontEndController = {

   
    clientPage: async (req, res) => {
       
     let pathway = path.join(__dirname, "index.html")
     let replacedFolder = pathway.replace('Controller', 'views')
     let replacedFolder2 = replacedFolder.replace("Front End", "frontend")
     console.log(pathway);
            res.sendFile(replacedFolder2)
        
    },
    
    payPageIp: async (req, res) => {
       
        let pathway = path.join(__dirname, "ajaxPost.html")
        let replacedFolder = pathway.replace('Controller', 'views')
        let replacedFolder2 = replacedFolder.replace("Front End", "frontend")
        console.log(pathway);
               res.sendFile(replacedFolder2)
           
       }



}

module.exports = frontEndController