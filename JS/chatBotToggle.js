let chatBox = document.querySelector('#chatBody');

let toggleBtn = document.querySelector("#toggleBtn");

const toggle = () => {

    if (chatBox.style.display == "none") {
        chatBox.style.display = "flex";
    } else {
        chatBox.style.display = "none";
    }
}

toggleBtn.addEventListener('click', toggle)

