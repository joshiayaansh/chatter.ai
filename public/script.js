document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    const addMessage = (message, isNotification = false) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        if (isNotification) {
            messageElement.classList.add('notification');
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message !== "") {
            socket.emit('chat message', message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    socket.on('chat message', (msg) => {
        addMessage(msg);
    });

    socket.on('notification', (msg) => {
        addMessage(msg, true);
    });
});
