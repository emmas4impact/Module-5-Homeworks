const express = require("express") // third party module
const fs = require("fs") // core module dedicated to file system interactions
const path = require("path") // core module
const uniqid = require("uniqid") // third party module

const router = express.Router()

const usersFilePath = path.join(__dirname, "studentInfo.json")

// 1.
router.get("/", (request, response) => {
 
  const fileContentAsABuffer = fs.readFileSync(usersFilePath) 
  console.log(fileContentAsABuffer)
  const fileContent = fileContentAsABuffer.toString() 

  // b) send the list as a json in the response body
  response.json(JSON.parse(fileContent)) // JSON.parse converts strings into json format
})

// 2.
router.get("/:id", (request, response) => {
 
  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())
  console.log(usersArray)

  
  console.log("ID: ", request.params.id)
  const user = usersArray.filter((user) => user.id === request.params.id)
  console.log(user)
 
  response.json(user)
})

// 3.
router.post("/", (request, response) => {
  console.log(request.body)
  const newUser = { ...request.body, id: uniqid() }



  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())

  
  if(usersFilePath.hasOwnProperty('email')){
   alert(false)

 }else{
    usersArray.push(newUser)
    fs.writeFileSync(usersFilePath, JSON.stringify(usersArray)) 
    response.status(201).json(newUser)
 }

 
})

// 4.
router.put("/:id", (request, response) => {

  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())

 
  const filteredUsersArray = usersArray.filter(
    (user) => user.id !== request.params.id
  )

  
  const user = request.body // request.body is holding the new data for the specified user
  user.id = request.params.id

  filteredUsersArray.push(user)

 

  fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))

  // 5. respond back with ok
  response.json("Ok")
})

// 5.
router.delete("/:id", (request, response) => {
  
  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())

  
  const filteredUsersArray = usersArray.filter(
    (user) => user.id !== request.params.id
  )

  fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))
  
  response.json("Ok")
})

module.exports = router