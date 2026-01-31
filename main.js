import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
        apiKey: "AIzaSyCRTmTgOyCnhUVZyhuN4caZ27RcziJp4tY",
        authDomain: "rascii-b4c2a.firebaseapp.com",
        projectId: "rascii-b4c2a",
        storageBucket: "rascii-b4c2a.firebasestorage.app",
        messagingSenderId: "7535372273",
        appId: "1:7535372273:web:cf9da87859cde81bab4650",
        measurementId: "G-JF5TRNKBZ9"
    };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");

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