import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
        apiKey: "AIzaSyCRTmTgOyCnhUVZyhuN4caZ27RcziJp4tY",
        authDomain: "rascii-b4c2a.firebaseapp.com",
        databaseURL: "https://rascii-b4c2a-default-rtdb.firebaseio.com/",
        projectId: "rascii-b4c2a",
        storageBucket: "rascii-b4c2a.firebasestorage.app",
        messagingSenderId: "7535372273",
        appId: "1:7535372273:web:cf9da87859cde81bab4650",
        measurementId: "G-JF5TRNKBZ9"
    };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");

const messagesRef = ref(database, "messages");

const username = "User" + Math.floor(Math.random() * 10000)

sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

signupBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const username = usernameInput.value;

    if (!email || !password || !username) return;

    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await set(ref(database, `users/${user.uid}`), {
        username,
        servers: {
            general: true
        }
    });
});

loginBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) return;

    await signInWithEmailAndPassword(auth, email, password);
});

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        console.log("Not logged in");
        return;
    }

    console.log("Logged in as: ", user.uid);

    const snapshot = await get(ref(database, `users/${user.uid}`));
    const profile = snapshot.val();

    username = profile.username;
    userServers = profile.servers;
});

push(messagesRef, {
    userId: auth.currentUser.uid,
    username,
    text,
    timestamp: Date.now()
})

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