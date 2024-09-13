const User = require("../Models/user");
const userController = {};
userController.saveUser = async (userName, socketId) => {
  let user = await User.findOne({ name: userName });
  if (!user) {
    user = new User({
      name: userName,
      socketId,
      online: true,
    });
  }
  user.socketId = socketId;
  user.online = true;

  await user.save();
  return user;
};

userController.checkUser = async (socketId) => {
  const user = await User.findOne({ socketId });
  if (!user) throw new Error("user not found");
  return user;
};

module.exports = userController;
