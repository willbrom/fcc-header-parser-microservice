require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env.PORT

let language;
let userAgent;
let ip;

app.use(cors())
app.use(express.static(__dirname + "/public"))
app.use((req, res, next) => {
	language = req.headers['accept-language']
	userAgent = req.headers['user-agent']
	ip = req.ip

	next()
})

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/whoami", (req, res) => {
	res.json({
		ipaddress: ip,
		language: language,
		software: userAgent
	})
})

app.listen(port, () => {
	console.log(`listening at ${port}`)
})
