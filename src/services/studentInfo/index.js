const express = require("express") // third party module
const fs = require("fs") // core module dedicated to file system interactions
const path = require("path") // core module
const uniqid = require("uniqid") // third party module

const router = express.Router()

const usersFilePath = path.join(__dirname, "studentInfo.json")

// 1.
router.get("/", (request, response) => {
  // (request, response)=> is the handler for this specific route

  // a) retrieve users list from a file on disk (we do not have a real database yet!)

  // we composed the path on disk (avoid __dirname + "\\users.json")
  const fileContentAsABuffer = fs.readFileSync(usersFilePath) // please read the file (we are getting a Buffer back)
  console.log(fileContentAsABuffer)
  const fileContent = fileContentAsABuffer.toString() // we need to translate the buffer into something human readable

  // b) send the list as a json in the response body
  response.json(JSON.parse(fileContent)) // JSON.parse converts strings into json format
})

// 2.
router.get("/:id", (request, response) => {
  // retrieve single user from a file on disk (we do not have a real database yet!) and send it back

  // a. read the file on disk and get back an array of users
  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())
  console.log(usersArray)

  // b. filter out the array to retrieve the specified user (we're gonna be using id to retrive the unique user)
  console.log("ID: ", request.params.id)
  const user = usersArray.filter((user) => user.id === request.params.id)
  console.log(user)
  // c. send the user back into the response
  response.json(user)
})

// 3.
router.post("/", (request, response) => {
  console.log(request.body)
  const newUser = { ...request.body, id: uniqid() }

  // 1. read the content of the file and get back an array of users

  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())

  // 2. adding the new user to the array
  if(usersFilePath.hasOwnProperty('email')){
   alert(true)

 }else{
    usersArray.push(newUser)

    // 3. writing the new content into the same file
  
    fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))
  
    // 4. responde with status 201 === "Created"
  
    response.status(201).json(newUser)
 }

 
})

// 4.
router.put("/:id", (request, response) => {
  // 1. read the content of the file and get back an array of users

  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())

  // 2. filter users by excluding the one with specified id
  const filteredUsersArray = usersArray.filter(
    (user) => user.id !== request.params.id
  )

  // 3. adding back the user with the modified body
  const user = request.body // request.body is holding the new data for the specified user
  user.id = request.params.id

  filteredUsersArray.push(user)

  // 4. write it back into the same file

  fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))

  // 5. respond back with ok
  response.json("Ok")
})

// 5.
router.delete("/:id", (request, response) => {
  // 1. read the content of the file and get back an array of users

  const fileContentAsABuffer = fs.readFileSync(usersFilePath)
  const usersArray = JSON.parse(fileContentAsABuffer.toString())

  // 2. filter users by excluding the one with specified id
  const filteredUsersArray = usersArray.filter(
    (user) => user.id !== request.params.id
  )

  // 3. write the filterd content back into the same file

  fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))
  // 4. respond with ok

  response.json("Ok")
})

module.exports = router