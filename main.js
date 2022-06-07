let stompClient = null;
let subscriptionObject;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('subscribe').disabled = !connected;
    document.getElementById('connection_status_indicator').style.backgroundColor = connected ? "green" : "red";
}

function setSubscribed(subscribed) {
    document.getElementById('subscribe').disabled = subscribed;
    document.getElementById('unsubscribe').disabled = !subscribed;
    document.getElementById('subscription_status_indicator').style.backgroundColor = subscribed ? "green" : "red";
}

function connect() {

    let url = document.getElementById('ws').value;
    let token = 'Bearer ' + document.getElementById('token').value;

    console.log(url)

    stompClient = webstomp.client(url);  
    stompClient.connect({'Authorization': token}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);

    });
}

function disconnect() {
    unsubscribe();
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function subscribe() {

    let topic = document.getElementById('topic').value;

    subscriptionObject = stompClient.subscribe(topic, function(messageOutput) {
            showMessageOutput(messageOutput);
        });

    setSubscribed(true);

}

function unsubscribe() {

    if (subscriptionObject != null) {
        subscriptionObject.unsubscribe();
    }

    setSubscribed(false);

}

function showMessageOutput(messageOutput) {
    let consola = document.getElementById('console');
    let p = document.createElement('p');
    p.appendChild(document.createTextNode("Topico: " + messageOutput.headers.destination + " | "));
    p.appendChild(document.createTextNode("Payload: " + messageOutput.body));
    consola.appendChild(p);
}

function clearConsole() {
    let consola = document.getElementById('console');
    consola.innerHTML = "";
}