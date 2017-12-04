let WebSocketServer = require('ws').Server;

let was = new WebSocketServer({port:8888});

var users = {};
console.log("Signaling server started on 8888");
ws.on('connection', function(connection) {
    console.log("A user connected");
    connection.on('message', function(message) {
        let data;
        try {
            data = JSON.parse(message);
        }
        catch(e) {
            console.error("Incorrect Message Format");
        }
        if(data.type) {
            switch(data.type) {
                case "login":
                    if(users[data.id]) {
                        send(users[data.id], "Already logged in");
                    }
                    else {
                        users[data.id] = connection;
                        connection.id = data.id;
                        send(connection, "Hello");
                    }
                break;
                case "offer": 
                    if(users[data.id]) {
                        let usersConnection = users[data.id];
                        connection.idTemp = data.id;
                        sned(usersConnection, {
                            type:"offer",
                            offer: data.offer,
                            id: connection.id
                        })
                    }
                    else{
                        send(connection, "no such user");
                    }
                break;
                case "answer": 
                console.log("Sending answer to: ", data.id); 
                //for ex. UserB answers UserA 
                var conn = users[data.id]; 
                    
                if(conn != null) { 
                   connection.idTemp = data.id; 
                   sendTo(conn, { 
                      type: "answer", 
                      answer: data.answer 
                   }); 
                } 
                    
                break;  
                    
                case "candidate": 
                    console.log("Sending candidate to:",data.id); 
                    var conn = users[data.id];  
                        
                    if(conn != null) { 
                    sendTo(conn, { 
                        type: "candidate", 
                        candidate: data.candidate 
                    });
                    } 
                        
                    break;  
                        
                case "leave": 
                    console.log("Disconnecting from", data.id); 
                    var conn = users[data.id]; 
                    conn.idTemp = null; 
                        
                    //notify the other user so he can disconnect his peer connection 
                    if(conn != null) { 
                    sendTo(conn, { 
                        type: "leave" 
                    }); 
                    }  
                        
                    break;  
                        
                default: 
                    sendTo(connection, { 
                    type: "error", 
                    message: "Command not found: " + data.type 
                    }); 
                        
                    break;                
            }
        }
        else {
            console.error("No Type found");
        }

    })
})

function send(connection, message) {
    connection.send(message);
}