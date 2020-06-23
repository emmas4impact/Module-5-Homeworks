const express =require("express")

//const usersRoutes = require("./service/users")
const userRoute = require("./services/studentInfo")
const cors = require("cors")


const server = express()

server.use(cors())
server.use(express.json())
//server.use("/users", userRoute)
server.use("/studentInfo", userRoute) 
server.listen(3001, ()=>{
    console.log("server is running on port 3001")
})