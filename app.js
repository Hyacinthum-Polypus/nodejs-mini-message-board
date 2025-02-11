const express = require('express')
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

app.use(express.urlencoded({ extended: true }))

const messages = [
    {
        text: "Hi there!",
        user: "Amanda",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
]


app.get("/", (req, res) => {
    res.render("index", { title:"Mini Messageboard", messages: messages })
})

app.get("/new", (req, res) => {
    res.render("form")
})

app.post("/new", (req, res) => {
    messages.push({
        text: req.body.text,
        user: req.body.user,
        added: new Date()
    })

    res.redirect("/")
})

const port = 3000;
app.listen(port, () => {
    console.log(`Express is now listening on ${port}`)
})
