const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.wav');

const append = (message, position)=>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position=='left'){
    audio.play();
  } 
}



//ask new user for his/her name?
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//if a new user joins , receive the event from the server
socket.on('user-joined', name=>{
  append(`${name} joined the chat` , 'right')
})

socket.on('receive', data =>{
  append(`${data.name}: ${data.message}`, 'left')
})

//if a user leave the chat , append the info to the container
socket.on('user-left', name => {
  // if (name) //
  
  append(`${name} left the chat`, 'right');
  
});


//if the form gets submitted, send derver the message
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`,'right');
  socket.emit('send', message);
  messageInput.value = ''
})




































































// // Connect to the backend
// const socket = io('http://localhost:8000');

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector('.container');

// // Append messages to the chat container
// const append = (message, position) => {
//   const messageElement = document.createElement('div');
//   messageElement.innerText = message;
//   messageElement.classList.add('message');
//   messageElement.classList.add(position);
//   messageContainer.append(messageElement);
// };

// // Prompt the user for their name and emit to the server
// const name = prompt("Enter your name to join");
// socket.emit('new-user-joined', name);

// // Event listener for new user joining
// socket.on('user-joined', name => {
//   append(`${name} joined the chat`, 'right'); // Fixed string interpolation
// });

// // Event listener for receiving messages
// socket.on('receive', data => {
//   append(`${data.name}: ${data.message}`, 'left');
// });

// // Event listener for a user leaving
// socket.on('user-left', name => {
//   append(`${name} left the chat`, 'right');
// });

// // Handle form submission (send message)
// form.addEventListener('submit', e => {
//   e.preventDefault(); // Prevent form from reloading the page
//   const message = messageInput.value;
//   append(`You: ${message}`, 'right'); // Show message in your chat
//   socket.emit('send', message); // Send message to the server
//   messageInput.value = ''; // Clear the input field
// });
