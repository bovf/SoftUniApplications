const element = document.getElementById('errorBox');
const output = document.querySelector('span');


export function notify(message) {
    window.alert(message);

}

window.notify = notify;