const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    addMessage("You", text);
    input.value = "";

    // fake response
    setTimeout(() => {
        addMessage("Bot", "Hello, I'm fake. So are you.")
    }, 500);
}

function addMessage(user, text) {
    const message = document.createElement("div");
    message.className = "message"
    message.textContent = '${user}: ${text}';
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}