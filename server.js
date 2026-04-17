const url = require('url');
const fs = require('fs');
const { throws } = require("assert"); // Note: 'throws' is likely unnecessary here
const http = require("http");

http.createServer((request, response) => {
    let date = new Date();
    // Use proper template literal syntax and correct callback structure
    fs.appendFile("log.txt", `${date}  ${request.url} : New request received \n`, (err) => {
        if (err) {
            console.error("Error writing to log file:", err); // Use console.error for errors
        } else {
            console.log("Log entry created");
        }
    });
    response.end();
}).listen(5000, 'localhost', (err) => { // Correct callback syntax for listen
    if (err) {
        console.error("Error starting server:", err); // Use console.error
    } else {
        // Correct the port number in the log message to match the one being listened on (5000)
        console.log('Server created at http://localhost:5000/');
    }
});

let address = 'https://www.google.com/category/search?name=ram&age=21#section';
const myURL = url.parse(address, true);
console.log(myURL);

/*const url = require('url');
const fs = require('fs');
const { throws } = require("assert");
const http = require("http");
http.createServer((request, response) => {
    let date = new Date();
    fs.appendFile("log.txt", `${date}  ${request.url} : New request received \n`(err) =>{
        if(err) console.log(err);
        console.log("log created");
    });
    response.end();
}).listen(5000, 'localhost' (err)=>{
    if(err) console.log(err);
    console.log('server created at http://localhost:8000/');
});


let address = 'https://www.google.com/category/search?name=ram&age=21#section';
const myURL = url.parse(address, true);
console.log(myURL);
*/