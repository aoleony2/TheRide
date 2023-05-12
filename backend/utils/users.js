const User = require("../structure/userStructure");
const users = [];
// Join to a room
function userJoin(socketID, userID, room) {
    const username = User.findById(userID).username;
    if (!username) {
        console.log("User not found");
	return;
    }
    const user = { socketID, username, userID, room };
    users.push(user);
    return user;
}

// Get current user
function getCurrentUser(socketID) {
    return users.find((user) => user.socketID === socketID);
}

// Get room users
function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers,
};
