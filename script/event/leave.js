module.exports = function (event) {
  const { threadID } = event;
  api.sendMessage("Goodbye! See you next time!", threadID);
};
