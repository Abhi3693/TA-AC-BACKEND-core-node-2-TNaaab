let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req,res){
    if(req.method === "POST" && req.url === "/"){
        var store = "";
        req.on("data", (chunk)=>{
            store = store + chunk;
        })

        req.on("end", ()=>{
            // console.log(store);
            res.writeHead(200, {"Content-type": "text/plain"})
            res.write(store);
            res.end();
        })
    }
}

server.listen(3456, ()=>{
    console.log("Server is listening on 3456")
})

