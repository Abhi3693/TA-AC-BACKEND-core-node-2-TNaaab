var absolutePath = __filename;

absolutePath = __dirname + "/node/app.js";

absolutePath = "./node/index.html";

absolutePath = __dirname + "/node/index.html"


let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleServer);

function handleServer(req, res){
    let contentTypeOFData = req.headers["content-type"];
    var store = "";

    req.on("data", (chunk)=> {
        store = store + chunk;
    })

    req.on("end", ()=> {

        if(req.method === "POST" && req.url === "/"){
            if(contentTypeOFData === "application/json"){
                res.writeHead(201, {"Content-type": contentTypeOFData});
                res.write(store);
                res.end("")
            }
        }

        if(req.method === "POST" && req.url === "/"){
            if(contentTypeOFData === "application/x-www-form-urlencoded"){
                res.writeHead(201, {"Content-type": contentTypeOFData});
                let parsedData = qs.parse(store);
                res.write(JSON.stringify(parsedData.captain));
                res.end("")
            }
        }
    })
}

server.listen(2222, ()=> {
    // console.log("Server is listening on 2k");
})


let server2 = http.createServer(handleServer2);

function handleServer2(req, res){
    let contentTypeOFData = req.headers["content-type"];

    var store = "";
    req.on("data", (chunk)=> {
        store = store + chunk;
    })

    req.on("end", ()=> {
        if(contentTypeOFData === "application/json"){
            res.writeHead(201, {"Content-type": contentTypeOFData});
            let parsedData = JSON.parse(store);
            res.write(JSON.stringify(parsedData));
            res.end("");
        }

        if(contentTypeOFData === "application/x-www-form-urlencoded"){
            res.writeHead(201, {"Content-type": contentTypeOFData});
            let parsedData = qs.parse(store);
            res.write(JSON.stringify(parsedData));
            res.end("")
        }
    })
}

server2.listen(9000, ()=> {
    // console.log("Server is listening on 9k");
})



let server3 = http.createServer(handleServer3);

function handleServer3(req, res){
    let contentTypeOFData = req.headers["content-type"];

    var store = "";
    req.on("data", (chunk)=> {
        store = store + chunk;
    })

    req.on("end", ()=> {
        if(contentTypeOFData === "application/json"){
            res.writeHead(201, {"Content-type": "text/html"});
            let parsedData = JSON.parse(store);
            res.write(`<h1>Name ${parsedData.name}</h1>`);
            res.write(`<h2>Name ${parsedData.email}</h2>`);
            res.end("");
        }

        if(contentTypeOFData === "application/x-www-form-urlencoded"){
            res.writeHead(201, {"Content-type": contentTypeOFData});
            let parsedData = qs.parse(store);
            res.write(JSON.stringify(parsedData));
            res.end("")
        }
    })
}

server3.listen(9002, ()=> {
    // console.log("Server is listening on 9002");
})


let server4 = http.createServer(handleServer4);

function handleServer4(req, res){
    let contentTypeOFData = req.headers["content-type"];

    var store = "";
    req.on("data", (chunk)=> {
        store = store + chunk;
    })

    req.on("end", ()=> {
        if(contentTypeOFData === "application/x-www-form-urlencoded"){
            res.writeHead(201, {"Content-type": contentTypeOFData});
            let parsedData = qs.parse(store);
            res.write(`<h1>Name: ${parsedData.name}</h1>`);
            res.write(`<h2>email: ${parsedData.email}</h2>`);
            res.end("");
        }
    })
}

server4.listen(9003, ()=> {
    // console.log("Server is listening on 9003");
})