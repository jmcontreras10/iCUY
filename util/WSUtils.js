const WebSocket = require("ws");

function WSUtils(){
  const wsu={};
  let users=[];
  wsu.setupWS=(server)=>{
    const wss = new WebSocket.Server({server});
    wss.on("connection",(ws)=>{
      console.log("connection");
      users.push(ws);
      ws.on("message",(msg) => {
        console.log("message ", msg);
      });
      console.log("has", wss.clients.has(users[0]));
      wss.clients.forEach(client=>{
        console.log(client==users[0]);
      });
    });
  };

  wsu.notify=(change)=>{
    console.log(change);
    users.forEach(ws => {
      ws.send(JSON.stringify(change)) ;
    });
  };

  return wsu;
}

module.exports= WSUtils();