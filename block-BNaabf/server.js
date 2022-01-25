let path = require("path");

// console.log("./clients/projects/index.js");

let absolutePath = path.join(__dirname, "/clients/projects/index.js")
// console.log(absolutePath);



let http = require("http");
let fs = require("fs");
let qs = require("querystring");

let server = http.createServer(handleServer);

function handleServer(req,res){
    let store = "";

    req.on("data", (chunk)=> {
        store += chunk;
    });
    req.on("end", ()=> {
        if(req.url === "/form" && req.method === "GET"){
            res.writeHead(201, {"Content-type":"text/html"});
            fs.createReadStream("./form.html").pipe(res);
        } 
        if(req.url === "/form" && req.method === "POST"){
            console.log(store);
            let parsedData = qs.parse(store);
            res.writeHead(201, {"Content-type":"text/html"});
            res.write(`<h2>Name : ${parsedData.name}</h2>`)
            res.write(`<h2>Email : ${parsedData.email}</h2>`)
            res.write(`<h2>Age : ${parsedData.age}</h2>`)
            res.end();
        } 
    });
}
server.listen(5678, ()=>{
    console.log("Server is listening on 5678");
})





// let server = http.createServer(handleServer);

// function handleServer(req,res){
//     if(req.url === "/form" && req.method === "GET"){
//         res.writeHead(201, {"Content-type":"text/html"});
//         fs.createReadStream("./form.html").pipe(res);
//     } 

//     if(req.url === "/form" && req.method === "POST"){
//         let store = "";

//         req.on("data", (chunk)=> {
//             let str = chunk.toString();
//             let parsedOBJ = qs.parse(str);
//             store = JSON.stringify(parsedOBJ);
//         });

//         req.on("end", ()=> {
//             res.writeHead(201, {"Content-type":"text/html"});
//             res.end(store)
//         });
//     } 
// }
// server.listen(5678, ()=>{
//     console.log("Server is listening on 5678");
// })

