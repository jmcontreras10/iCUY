const WebSocket = require("ws");

function WSUtils(){
  const wsu={};
  let users=[];
  wsu.setupWS=(server)=>{
    const wss = new WebSocket.Server({server});
    wss.on("connection",(ws)=>{
      users.push(ws);
    });
  };

  wsu.notify=(change)=>{
    users.forEach(ws => {
      ws.send(JSON.stringify(change)) ;
    });
  };

  return wsu;
}

module.exports= WSUtils();