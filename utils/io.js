const chatController = require("../Controller/chat.controller");
const userController = require("../Controller/user.controller");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected!!!!", socket.id);

    socket.on("login", async (userName, callback) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        callback({ ok: true, data: user });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, callback) => {
      try {
        const user = await userController.checkUser(socket.id);
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        callback({ ok: true });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });
  });
};
