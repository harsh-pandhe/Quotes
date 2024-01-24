const apiUrl = 'https://famous-quotes4.p.rapidapi.com/random?category=all&count=1';
const apiHeaders = {
    'X-RapidAPI-Key': 'cec2517884msh4a22cbe073c8cf0p128c75jsn740da95697b2',
    'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
};

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const reloadButton = document.getElementById('reload-btn');
const copyButton = document.getElementById('copy-btn');

reloadButton.addEventListener('click', () => {
    getQuotes();
    showToast('Quotes reloaded!');
});

copyButton.addEventListener('click', () => {
    copyToClipboard();
    showToast('Quote copied to clipboard!');
});

function getQuotes() {
    fetch(apiUrl, { method: 'GET', headers: apiHeaders })
        .then(response => response.json())
        .then((response) => {
            quoteElement.textContent = response[0].text;
            authorElement.textContent = response[0].author;
        })
        .catch(err => {
            console.error(err);
        });
}

function showToast(message) {
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: 'bottom',
        position: 'right',
    }).showToast();
}

function copyToClipboard() {
    const quoteText = document.getElementById('quote').innerText;
    const authorText = document.getElementById('author').innerText;

    const textToCopy = `${quoteText}\n\n- ${authorText}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text successfully copied to clipboard!');
        })
        .catch(err => {
            console.error('Unable to copy text to clipboard', err);
        });
}

getQuotes();
