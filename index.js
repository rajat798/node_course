// //Module Wrapper Function
// // (function (exports, require, modeule,  __filename, __dirname) {

// // })

// console.log(__filename, __dirname)


// const Person = require('./person') //commonJS
// // import Person from './person' //ES6

// const person1 = new Person('John Doe', 30)

// person1.greeting()


// const Logger = require('./logger')

// const logger = new Logger()

// logger.on('message', data => console.log('Called Listener: ', data))

// logger.log('Hello World!')
// logger.log('Hi')
// logger.log('How is everyone?')


const http = require('http')
const path = require('path')
const fs = require('fs')
const { doesNotMatch } = require('assert')

const server = http.createServer((req, res) => {
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname,'public','index.html'), (err, content) => {
    //         if(err) throw err
    //         res.writeHead(200,{ 'Cotent-Type' : 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if(req.url === '/about') {
    //     fs.readFile(path.join(__dirname,'public','about.html'), (err, content) => {
    //         if(err) throw err
    //         res.writeHead(200,{ 'Cotent-Type' : 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if(req.url === '/api/users') {
    //     const users = [
    //         {name : 'John Doe', age : 30 },
    //         {name : 'Bob Smith', age : 40 },
    //     ]
    //     res.writeHead(200,{ 'Cotent-Type' : 'application/json'})
    //     res.end(JSON.stringify(users))
    // }

    //Build File Path
    let filePath = path.join(__dirname,'public',req.url === '/' ? 'index.html' : req.url)
    // console.log(filePath)
    // res.end()

    //Extension of file
    let extname = path.extname(filePath)

    //Initial content type
    let contentType = 'text/html'

    //Check ext and set content type
    switch(extname) {
        case '.js' :
            contentType = 'text/javascript'
            break    
        case '.css' :
            contentType = 'text/css'
            break
        case '.json' :
            contentType = 'application/json'
            break        
        case '.png' :
            contentType = 'image/png'
            break
        case '.jpg' :
            contentType = 'image/jpg'
            break
    }

    //Read File
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname,'public','404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type' : 'text/html'})
                    res.end(content, 'utf8')
                })
            }else {
                //Some server error
                res.writeHead(500)
                res.end(`Server Error : ${err.code}`)
            }
        } else {
            //Success
            res.writeHead(200, { 'Content-Type' : contentType})
            res.end(content, 'utf8')
        }
    })

})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

