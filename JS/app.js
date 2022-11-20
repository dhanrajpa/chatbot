const chatButton = document.querySelector('.chatbox__button');
const chatContent = document.querySelector('.chatbox__support');
const icons = {
    isClicked: '</p>FAQ!</p>',
    isNotClicked: '<p>FAQ!</p>'
}
/**
 * TODO: update outside click event'!
 * ! toggle icon change**
 */

const chatBox = new InteractiveChatbox(chatButton, chatContent, icons);
chatBox.display();
chatBox.toggleIcon(false, chatButton);

