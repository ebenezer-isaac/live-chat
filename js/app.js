const chatList = document.querySelector(".chat-list");
const chatRoomButtons = document.querySelector(".chat-rooms")
const chatUI = new ChatUI(chatList);
const username = localStorage.username? localStorage.username : "anonymous"
const room = localStorage.room? localStorage.room : "general"
const chatroom = new Chatroom(room, username)
const newChatForm = document.querySelector(".new-chat")
const newNameForm = document.querySelector(".new-name")
const updateMessage = document.querySelector(".update-mssg")
newChatForm.addEventListener("submit", e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
})
    chatroom.getChats((data)=>{
    chatUI.render(data);
})
newNameForm.addEventListener("submit",e=>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(()=>updateMessage.innerText ="",3000);

})
console.log(chatRoomButtons)
chatRoomButtons.addEventListener("click",e=>{
    console.log(e)
    e.preventDefault();
    if(e.target.tagName==="BUTTON") {
        chatUI.clear() ;
        chatroom.updateRoom(e.target.getAttribute("id"));
        chatroom.getChats(chat=> chatUI.render(chat))
    }
})
console.log(chatroom)