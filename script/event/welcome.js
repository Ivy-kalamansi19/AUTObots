module.exports = function (event) {
  const { senderID, threadID } = event;
  api.sendMessage("𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽!🎉", threadID);
};
