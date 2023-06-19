const redis=require('redis');

const client=redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});

client.on("error",function(error){
    console.log("error encounted:",error);
});
client.on("ready",function(){
    console.log("connected to redis and ready to use");
});
client.on("connect",function(){
    console.log("redis established");
})
client.on("end",function(){
    console.log("client disconnected");
});
client.on("SIGINT",function(){
    client.quit();
});
module.exports=client;