module.exports.config = {
  name: "antiout",
  version: "1.0.0"
};

module.exports.handleEvent = async ({ event, api }) => {
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;

  // Handle member leaving the group
  if (event.logMessageType === 'log:unsubscribe') {
    if (event.logMessageData?.leftParticipantFbId) {
      const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
      const { name } = info[event.logMessageData?.leftParticipantFbId];
      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.threadName || "𝗚𝗥𝗢𝗨𝗣 𝗖𝗛𝗔𝗧";

      const goodbyeMessages = [
        `💔𝗚𝗼𝗼𝗱𝗯𝘆𝗲, ${name}! 🕊️🌿🪦𝗬𝗼𝘂’𝗹𝗹 𝗱𝗲𝗳𝗶𝗻𝗶𝘁𝗲𝗹𝘆 𝗯𝗲 𝗺𝗶𝘀𝘀𝗲𝗱! 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘁𝗼 𝘀𝗲𝗲 𝘆𝗼𝘂 𝗮𝗴𝗮𝗶𝗻 𝘀𝗼𝗼𝗻! 👋 𝗦𝘁𝗮𝘆 𝘀𝗮𝗳𝗲 𝗮𝗻𝗱 𝘁𝗮𝗸𝗲 𝗰𝗮𝗿𝗲! 🪦🌿🕊️ 🌟 ${groupName}.`,
        `🌿𝗙𝗮𝗿𝗲𝘄𝗲𝗹𝗹, ${name}. 😢 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝗯𝗲𝗶𝗻𝗴 𝗽𝗮𝗿𝘁 𝗼𝗳 ${groupName}. 𝗦𝘁𝗮𝗬 𝘀𝗮𝗳𝗲 𝗮𝗻𝗱 𝘁𝗮𝗸𝗲 𝗰𝗮𝗿𝗲! 🍃`,
        `🪦𝗪𝗲'𝗿𝗲 𝘀𝗮𝗱 𝘁𝗼 𝘀𝗲𝗲 𝘆𝗼𝘂 𝗹𝗲𝗮𝗳𝗲, ${name}. 𝗬𝗼𝘂 𝗮𝗿𝗲 𝗮𝗹𝘄𝗮𝘆𝘀 𝗺𝗶𝘀𝘀𝗲𝗱 𝗵𝗲𝗿𝗲 𝗶𝗻 ${groupName}. 𝗧𝗶𝗹𝗹 𝗻𝗲𝘅𝘁 𝘁𝗶𝗺𝗲! 👋`,
        `👋𝗢𝗵 𝗻𝗼, ${name} 𝗹𝗲𝗳𝘁 ${groupName}. 😢 𝗠𝗮𝘆 𝘆𝗼𝘂 𝗳𝗶𝗻𝗱 𝗽𝗲𝗮𝗰𝗲 𝗮𝗻𝗱 𝗷𝗼𝘆 𝗮𝗵𝗲𝗮𝗱! 🌟`,
        `💧𝗚𝗼𝗼𝗱𝗯𝘆𝗲, ${name}. 🌿 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝘀𝗽𝗲𝗻𝗱𝗶𝗻𝗴 𝘁𝗶𝗺𝗲 𝘄𝗶𝘁𝗵 𝘂𝘀 𝗶𝗻 ${groupName}. 𝗦𝘁𝗮𝗬 𝗯𝗿𝗶𝗴𝗵𝘁! 🌻`,
        `🥀𝗚𝗼𝗼𝗱𝗯𝘆𝗲, ${name}! 𝗬𝗼𝘂𝗿 𝗽𝗿𝗲𝘀𝗲𝗻𝗰𝗲 𝘄𝗶𝗹𝗹 𝗯𝗲 𝗺𝗶𝘀𝘀𝗲𝗱 𝗵𝗲𝗿𝗲 𝗶𝗻 ${groupName}. 𝗧𝗶𝗹𝗹 𝘄𝗲 𝗺𝗲𝗲𝘁 𝗮𝗴𝗮𝗶𝗻. 🕊️`,
        `🌺𝗧𝗮𝗸𝗲 𝗰𝗮𝗿𝗲, ${name}! 𝗬𝗼𝘂𝗿 𝗷𝗼𝘂𝗿𝗻𝗲𝘆 𝗶𝗻 ${groupName} 𝗺𝗮𝘆 𝗯𝗲 𝗼𝘃𝗲𝗿, 𝗯𝘂𝘁 𝘁𝗵𝗲 𝗺𝗲𝗺𝗼𝗿𝗶𝗲𝘀 𝗿𝗲𝗺𝗮𝗶𝗻! 🌷`,
        `🥀𝗚𝗼𝗼𝗱𝗹𝘂𝗰𝗸, ${name}! 𝗠𝗮𝘆 𝘆𝗼𝘂 𝗳𝗶𝗻𝗱 𝘆𝗼𝘂𝗿 𝗽𝗮𝘁𝗵 𝗮𝗻𝗱 𝗻𝗲𝘃𝗲𝗿 𝗳𝗼𝗿𝗴𝗲𝘁 ${groupName}. 💫`,
        `☁️𝗚𝗼𝗼𝗱𝗯𝘆𝗲 ${name}. 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘆𝗼𝘂 𝗳𝗶𝗻𝗱 𝗽𝗲𝗮𝗰𝗲 𝗮𝗻𝗱 𝗷𝗼𝘆 𝗮𝗵𝗲𝗮𝗱! 𝗪𝗲’𝗹𝗹 𝗺𝗶𝘀𝘀 𝘆𝗼𝘂 𝗶𝗻 ${groupName}! 💙`,
        `✨𝗚𝗼𝗼𝗱𝗹𝘂𝗰𝗸, ${name}! 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝗯𝗲𝗶𝗻𝗴 𝗽𝗮𝗿𝘁 𝗼𝗳 ${groupName}. 𝗧𝗶𝗹𝗹 𝘄𝗲 𝗺𝗲𝗲𝘁 𝗮𝗴𝗮𝗶𝗻! 🌟`
      ];

      const randomGoodbye = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
      api.sendMessage(randomGoodbye, event.threadID);

      api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
        if (error) {
          api.sendMessage(`🪦𝗨𝗻𝗮𝗯𝗹𝗲 𝘁𝗼 𝗿𝗲-𝗮𝗱𝗱 𝗺𝗲𝗺𝗯𝗲𝗿 ${name} 𝘁𝗼 ${groupName}!`, event.threadID);
        } else {
          api.sendMessage(`🛡️𝗔𝗰𝘁𝗶𝗩𝗲 𝗮𝗻𝘁𝗶𝗼𝘂𝘁 𝗺𝗼𝗱𝗲, ${name} 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝗿𝗲-𝗮𝗱𝗱𝗲𝗱 𝘁𝗼 ${groupName} 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆!`, event.threadID);
        }
      });
    }
  }

  // Handle new member joining the group
  if (event.logMessageType === 'log:subscribe') {
    if (event.logMessageData?.addedParticipants) {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.threadName || "𝗚𝗥𝗢𝗨𝗣 𝗖𝗛𝗔𝗧";

      for (const participant of event.logMessageData.addedParticipants) {
        const info = await api.getUserInfo(participant.userFbId);
        const { name } = info[participant.userFbId];

        // Welcoming message
        api.sendMessage(`🎊𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽! 🌟 ${groupName}, ${name}!🥳 𝗪𝗲’𝗿𝗲 𝗴𝗹𝗮𝗱 𝘆𝗼𝘂 𝗷𝗼𝗶𝗻𝗲𝗱 𝘂𝘀! 🤩 𝗗𝗼𝗻’𝘁 𝗯𝗲 𝘀𝗵𝘆, 𝗳𝗲𝗲𝗹 𝗳𝗿𝗲𝗲 𝘁𝗼 𝗰𝗵𝗮𝘁!
 💬.`, event.threadID);
      }
    }
  }
};