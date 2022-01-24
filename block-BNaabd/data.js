let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleServer);

function handleServer(req,res){
    let contentType = req.headers['content-type'];

    var store = "";
    req.on("data", (chunk)=>{
        store = store + chunk;
    });
    req.on("end", ()=>{
        if(contentType === "application/x-www-form-urlencoded"){
            let parsedString = qs.parse(store);
            res.end(JSON.stringify(parsedString));
        }
        if(contentType === "application/json"){
            res.end(store);
        }
        if(contentType === "text/plain;charset=UTF-8" || contentType === "text/plain"){
            res.end(store);
        }
    });
}

server.listen(7002, ()=> {
    console.log("Server is listening on 7k");
})