const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

// Hamburger Menu
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

// Chatbot

const chatBody = document.querySelector('.chat-body');
const txtInput = document.querySelector('#txtinput');
const send = document.querySelector('.send');
const container = document.querySelector('.minimalized');
const chatHeader = document.querySelector('.chat-header');

const responseObj = {
    'dzien dobry': 'dzień dobry',
    'czesc': 'cześć',
    'kim jesteś?': 'prostym chatbotem',
    'kto cię zaprogramował?': 'Damian Hołub',
    'w czym zostałeś zrobiony?': 'HTML, CSS, JavaScript',
    'w ile zostałeś zrobiony?': 'W około 26 godzin',
    'czy jesteś inteligentny?': 'Inteligentniejszy od rządu',
    'Co tam?': 'Nic, a tam?',
    'Nic': 'OK',
    'Dobrze': 'To fajnie.',
    'hello': 'Hi there',
    'Hello': 'Hi there',
    'Hi': 'Hi there',
    'hi': 'Hi there',
    'Hey': 'Hi there',
    'hey': 'Hi there',
    'hej': 'Hi there',
    'Hej': 'Hi there',
    'a': 'abc'

}


if (chatHeader) {
    chatHeader.addEventListener('click', () => {
        container.classList.toggle('container');
        container.classList.toggle('minimalized');
    })
}


send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        renderUserMessage();
    }
});

const renderUserMessage = () => {
    const userInput = txtInput.value;
    renderMessageElement(userInput, "user");
    txtInput.value = "";
    setTimeout(() => {
        renderChatbotResponse(userInput);
        scrollPosition();
    }, 700);
};

const renderChatbotResponse = (userInput) => {
    const res = getChatbotResponse(userInput);
    renderMessageElement(res);
};

const renderMessageElement = (txt, type) => {
    let className = "user-message";
        if (type !== "user") {
            className = "chatbot-message"
        }
    const messageElement = document.createElement('div');
    const txtNode = document.createTextNode(txt);
    messageElement.classList.add(className);
    messageElement.append(txtNode);
    chatBody.append(messageElement);
};

const getChatbotResponse = (userInput) => {
    return responseObj[userInput] === undefined ? `I don't know an answer to that question yet` : responseObj[userInput];

}

const scrollPosition = () => {
    if (chatBody.scrollHeight > 0) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}


// Product Page mini gallery
    const mainImg = document.getElementById("mainImg");
    const smallImg = document.getElementsByClassName("small-img");

    smallImg[0].onclick = function(){
        mainImg.src = smallImg[0].src;
    }

    smallImg[1].onclick = function(){
        mainImg.src = smallImg[1].src;
    }

    smallImg[2].onclick = function(){
        mainImg.src = smallImg[2].src;
    }

    smallImg[3].onclick = function(){
        mainImg.src = smallImg[3].src;
    }