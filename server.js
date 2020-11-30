const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

// server.use(express.static('public'))
server.use(express.static(__dirname + '/public/'));
server.set("view engine", "html")

nunjucks.configure("views", {
        express: server
    })
    // server.use(express.static(__dirname + "/public", {
    //     index: false,
    //     immutable: true,
    //     cacheControl: true,
    //     maxAge: "30d"
    // }));
server.get("/", function(req, res) {
    return res.render("index")
})

server.listen(6900)