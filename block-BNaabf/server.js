// - get relative path of `index.js` 

console.log("./clients/projects/index.js");

//   - get absolute path of `index.js`
console.log(__dirname,"/clients/projects/index.js");



let http = require("http");
let fs = require("fs");
let qs = require("querystring");


let server = http.createServer(handleServer);

function handleServer(req,res){
    if(req.url === "/form" && req.method === "GET"){
        res.writeHead(201, {"Content-type":"text/html"});
        fs.createReadStream("./form.html").pipe(res);
    } 

    if(req.url === "/form" && req.method === "POST"){
        let store = "";

        req.on("data", (chunk)=> {
            let str = chunk.toString();
            let parsedOBJ = qs.parse(str);
            store = JSON.stringify(parsedOBJ);
        });

        req.on("end", ()=> {
            res.writeHead(201, {"Content-type":"text/html"});
            res.end(store)
        });
    } 
}
server.listen(5678, ()=>{
    console.log("Server is listening on 5678");
})


