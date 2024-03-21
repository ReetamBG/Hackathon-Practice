import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path"
import {fileURLToPath} from "url"

const app = express()
const port = 3000

let users = []
let currently_logged

app.use(bodyParser.urlencoded({extends : true}))
app.use(express.static("public"))
const __dirname = dirname(fileURLToPath(import.meta.url)) 

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.get("/dash", (req, res) => {
    res.render("user.ejs", {
        email : currently_logged.email
    })
})

app.post("/register", (req, res) => {
    const obj = {email : req.body["email"],
                 username : req.body["username"],
                 password : req.body["password"]}
    users.push(obj)
    console.log(users)
    res.render("register.ejs", {
        registered : true
    })
})

app.post("/login", (req, res) => {
    let authenticated = false
    console.log(users)
    for(let i=0; i<users.length; i++){
        if(users[i].email == req.body["email"] && users[i].password == req.body["password"]){
            authenticated = true
        }
    }
    console.log(authenticated)
    if(authenticated){
        console.log("WELCOME")
        let email = req.body["email"]
        for(let i=0; i<users.length; i++){
            if(users[i].email === email){
                currently_logged = users[i]
            }
        }
        console.log(currently_logged)
        
        res.render("dashboard.ejs", {
            username : currently_logged["username"],
            email : currently_logged["email"]
        })
    }
    else{
        res.render("login.ejs", {
            authenticated : authenticated
        })
    }
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})