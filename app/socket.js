let connection = new WebSocket('ws://localhost:9090'); 


module.exports = {
    attach : (onLogin, 
                onOffer,
                onAnswer,
                onCandidate,
                ) => {
        connection.onmessage = function (message) { 
            console.log("Got message", message.data); 
            var data = JSON.parse(message.data); 
                
            switch(data.type) { 
                case "login": 
                    onLogin(data.success); 
                    break; 
                case "offer": 
                    onOffer(data.offer, data.name); 
                    break; 
                case "answer":
                    onAnswer(data.answer); 
                    break; 
                case "candidate": 
                    onCandidate(data.candidate); 
                    break; 
                default: 
                    break; 
            } 
        };           

    },
    send : (message) => {
        
    }

}