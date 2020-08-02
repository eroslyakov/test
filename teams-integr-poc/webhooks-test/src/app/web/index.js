const socket = io();

window.addEventListener('load', () => {
    console.log('loaded');
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const channelPath =
        'https://outlook.office.com/webhook/20d5daf1-c36a-4332-80c7-6bb19418c7f5@b41b72d0-4e9f-4c26-8a69-f949f367c91d/IncomingWebhook/e536494906294c1fb5ae8008e1d8d878/df6c7012-9187-4374-b5f4-dbcdb9466de7';

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

    socket.on('message', msg => incomingArea.value += `\n${msg}\n       ----------\n`);
});
