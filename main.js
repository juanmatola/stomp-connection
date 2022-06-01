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

    console.log(url)

    stompClient = webstomp.client(url);  
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);

    });
}

function disconnect() {
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

    subscriptionObject.unsubscribe();
    setSubscribed(false);

}

function showMessageOutput(messageOutput) {
    var consola = document.getElementById('console');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode("Topico: " + messageOutput.headers.destination + " | "));
    p.appendChild(document.createTextNode("Payload: " + messageOutput.body));
    consola.appendChild(p);
}