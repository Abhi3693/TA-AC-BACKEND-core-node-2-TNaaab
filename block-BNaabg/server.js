let fs = require("fs");
let url = require("url");
let qs = require("querystring");
let http = require("http");
let path = require("path");
const userDir = path.join(__dirname, "users/");

let server = http.createServer(handleServer);

function handleServer(req,res){
    var store = "";
    let parsedUrl = url.parse(req.url);
    let str = qs.parse(parsedUrl.query);

    req.on("data", (chunk)=>{
        store = store + chunk;
    });

    req.on("end", ()=>{
        let userName = qs.parse(store).username;
        let parsedData = JSON.stringify(qs.parse(store));

        if(req.method === "POST" && req.url === "/users"){
            fs.open(userDir + userName + ".json", "wx", (err, fd) => {
                if(err)console.log(err);
                fs.writeFile(fd, parsedData, (err) => {
                    if(err)console.log(err);
                    fs.close(fd, (err) => {
                        if(err)console.log(err);
                        res.writeHead(200, {"Content-type": "text/plain"});
                        res.end(`${userName} created`);
                    });
                })
            })
        }
        else if(req.method === "GET" && parsedUrl.pathname === "/users"){
            fs.readFile(`./users/${str.username}.json`, (err, content)=>{
                if(err)console.log(err);
                res.writeHead(200, {"Content-type": "text/html"});
                res.end(content);
            })
        }
        else if(req.method === "DELETE" && parsedUrl.pathname === "/users"){
            fs.unlink(`./users/${str.username}.json`, (err, content)=>{
                if(err)console.log(err);
                res.writeHead(200, {"Content-type": "text/plain"});
                res.end(`${str.username} is Deleted`);
            })
        }
        else if(req.method === "PUT" && parsedUrl.pathname === "/users"){
            fs.open(userDir + userName + ".json", "r+", (err, fd) => {
                if(err)console.log(err);
                fs.ftruncate(fd, (err)=>{if(err)console.log(err)});
                fs.writeFile(fd, parsedData, (err) => {
                    if(err)console.log(err);
                    fs.close(fd, (err) => {
                        if(err)console.log(err);
                        res.writeHead(200, {"Content-type": "text/plain"});
                        res.end(`${userName} updated`);
                    });
                })
            })
        } 
        else{
            res.writeHead(404, {"Content-type": "text/html"});
            res.end(`<h1>Page Not Found</h1>`);
        }
    })
}
server.listen(3456);

