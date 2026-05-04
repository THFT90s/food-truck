const express = require("express")
//const path = require("path")
const app = express()
const port = 3010


// allows the sending of json
app.use(express.json())
// allow us to respond with static webpages
app.use(express.static('public'))

// Attach Endpoints
app.use('/api/v1/events', require('./routes/api/v1/events'))
app.use('/api/v1/menu', require('./routes/api/v1/menu'))
app.use(require('./routes/static'))

// basic test route
app.get("/test", (req, res) => {
  res.send("Server is working")
})
 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/event/:eventId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "event.html"))
})

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"))
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`🏠 Home:   http://localhost:${port}/`);
  console.log(`📍 Event:  http://localhost:${port}/event/1`);
  console.log(`⚙️ Admin:  http://localhost:${port}/admin`);
  console.log(`🧪 Test:   http://localhost:${port}/test`);
})