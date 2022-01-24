let fs = require("fs");
let http = require("http");


let server = http.createServer(handleServer);

function handleServer(req,res){
    res.writeHead(200, {"Content-type": "text/plain"})
    fs.createReadStream("./readme.txt").pipe(res);
}

server.listen(3000, ()=> {
    console.log("Server is listing on 3k")
})