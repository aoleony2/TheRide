import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

// room = {questionID, taID}
// Tell the server to join the room (Click accept question(ta) or click caht window(student) button will trigger this)
export const acceptQuestion = (userID, room) => {
  socket.emit("joinQuestion", { userID, room });
};

//context = "string"
// Tell the server that someone is sending a message (Click send message button will trigger this)
export const sendMessage = (context, room) => {
  console.log(context);
  socket.emit("sendMessage", { context, room });
};

//Tell the serve that I reject this question (Click disconnect button will trigger this)
export const rejectQuestion = (room) => {
  socket.emit("rejctQuestion", room);
};

export default socket;
