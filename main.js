const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");

const { database, ref, push, onChildAdded } = window.firebaseDB;

const messagesRef = ref(database, "messages");

const username = "User" + Math.floor(Math.random() * 10000)

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    push(messagesRef, {
        user: username,
        text: text,
        timestamp: Date.now()
    });

    input.value = "";
}

onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    addMessage(message.user, message.text);
});

function addMessage(user, text) {
    const message = document.createElement("div");
    message.className = "message"
    message.textContent = `${user}: ${text}`;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}