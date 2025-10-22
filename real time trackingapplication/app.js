const express= require("express");
const http =require("http");
const app=express();
const path =require("path");
const { disconnect } = require("process");
const server=http.createServer(app);
const socket = require("socket.io");
const io=socket(server);
app.use(express.json());
app.use((req, res, next) => {
    req.extendUrl = true; 
    next();
});
io.on("connection",function(socket){
    console.log("user is conected sucessfully")
socket.on("send-location",function(data){
    io.emit("receive-location",{id:socket.id,...data})
})
    socket.on("disconnect",function(){
       socket.emit("user-disconect",(socket.id))
    })
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"));
});
const port=4000;
server.listen(port,()=>{
    console.log("server is runing at port 4000");
})