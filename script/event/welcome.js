module.exports = function (event) {
  const { senderID, threadID } = event;
  api.sendMessage("Welcome to the group!", threadID);
};
