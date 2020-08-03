const incomingWebhookSecret = require('../config/incomingWebhook.secret.json');

const socket = io();

window.addEventListener('load', () => {
    console.log('loaded');
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const channelPath = JSON.parse(incomingWebhookSecret).channelPath;

    const incomingArea = document.querySelector('.incoming-area');
    const outgoingArea = document.querySelector('.outgoing-area');
    const sendButton = document.querySelector('.outgoing-button');

    sendButton.addEventListener('click', () => {
        const payload = {
            type: 'message',
            text: outgoingArea.value,
        };
        fetch(proxyUrl + channelPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        outgoingArea.value = '';
    });

    socket.on('message', msg => incomingArea.value += `\n${msg}\n----------\n`);
});
