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
  `🌸 𝗙𝗮𝗿𝗲𝘄𝗲𝗹𝗹, ${name}! 𝗬𝗼𝘂𝗿 𝗽𝗿𝗲𝘀𝗲𝗻𝗰𝗲 𝘄𝗶𝗹𝗹 𝗯𝗲 𝗺𝗶𝘀𝘀𝗲𝗱 𝗶𝗻 ${groupName}. 𝗧𝗮𝗸𝗲 𝗰𝗮𝗿𝗲, 𝗮𝗻𝗱 𝗵𝗼𝗽𝗲 𝘁𝗼 𝘀𝗲𝗲 𝘆𝗼𝘂 𝗮𝗴𝗮𝗶𝗻 𝘀𝗼𝗼𝗻! 🌿`,
  `💫 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂, ${name}, 𝗳𝗼𝗿 𝗯𝗲𝗶𝗻𝗴 𝗮 𝗽𝗮𝗿𝘁 𝗼𝗳 ${groupName}. 𝗙𝗮𝗿𝗲𝘄𝗲𝗹𝗹 𝗳𝗼𝗿 𝗻𝗼𝘄! 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘆𝗼𝘂 𝗳𝗶𝗻𝗱 𝗵𝗮𝗽𝗽𝗶𝗻𝗲𝘀𝘀 𝗮𝗻𝗱 𝗿𝗲𝘓𝗮𝘹 𝗮𝗳𝘁𝗲𝗿 𝘁𝗵𝗶𝘀. 🌟`,
  `⚡ 𝗜𝗳 𝗹𝗶𝗳𝗲 𝘄𝗲𝗿𝗲 𝗮 𝗻𝗮𝘃𝗶𝗴𝗮𝘁𝗶𝗼𝗻, 𝘁𝗵𝗲 𝗽𝗮𝘁𝗵 𝘄𝗼𝘂𝗹𝗱 𝗮𝗹𝘄𝗮𝘆𝘀 𝗯𝗲 𝘂𝗻𝗰𝗲𝗿𝘁𝗮𝗶𝗻, ${name}. 𝗙𝗮𝗿𝗲𝘄𝗲𝗹𝗹 𝗳𝗿𝗼𝗺 ${groupName}, 𝗪𝗲'𝗿𝗲 𝗳𝗼𝗿𝗲𝗿𝘃𝗲𝗿 𝗿𝗲𝗮𝗱𝘆 𝘁𝗼 𝗺𝗲𝗲𝘁 𝘆𝗼𝘂 𝗮𝗴𝗮𝗶𝗻! 💪`,
  `🌻 𝗚𝗼𝗼𝗱𝗯𝘆𝗲, ${name}. 𝗬𝗼𝘂'𝗿𝗲 𝗮𝗹𝘄𝗮𝘆𝘀 𝗿𝗲𝗺𝗲𝗺𝗯𝗲𝗿𝗲𝗱 𝗵𝗲𝗿𝗲 𝗶𝗻 ${groupName}, 𝗮𝗻𝗱 𝗳𝗼𝗿𝗲𝘃𝗲𝗿 𝗶𝗻 𝗼𝘂𝗿 𝗵𝗲𝗮𝗿𝘁𝘀. 𝗧𝗮𝗸𝗲 𝗰𝗮𝗿𝗲, 𝗮𝗻𝗱 𝗸𝗲𝗲𝗽 𝘁𝗵𝗮𝘁 𝘀𝗺𝗶𝗹𝗲! 🌟`,
  `💜 𝗪𝗲'𝗿𝗲 𝘀𝗮𝗱 𝘁𝗵𝗮𝘁 𝘆𝗼𝘂'𝗿𝗲 𝗹𝗲𝗮𝗳𝗶𝗻𝗴, ${name}. 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝗮𝗹𝗹 𝘁𝗵𝗲 𝗚𝗢𝗢𝗗 𝗺𝗼𝗺𝗲𝗻𝘁𝘀 𝗵𝗲𝗿𝗲 𝗶𝗻 ${groupName}. 𝗧𝗶𝗹𝗹 𝗻𝗲𝘅𝘁 𝘁𝗶𝗺𝗲! 🦋`,
  `🌟 𝗚𝗼𝗼𝗱𝗯𝘆𝗲, ${name}. 𝗠𝗮𝘆 𝘆𝗼𝘂 𝗳𝗶𝗻𝗱 𝘆𝗼𝘂𝗿 𝗻𝗲𝘅𝘁 𝗳𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝗽𝗮𝘁𝗵! 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝘁𝗵𝗲 𝗺𝗲𝗺𝗼𝗿𝗶𝗲𝘀, ${name}. 𝗨𝗻𝘁𝗶𝗹 𝗻𝗲𝘅𝘁 𝘁𝗶𝗺𝗲! 💖`,
  `🌙 𝗛𝗮𝘃𝗲 𝗮 𝗯𝗹𝗲𝘀𝘀𝗲𝗱 𝗷𝗼𝘂𝗿𝗻𝗲𝘆, ${name}! 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝗮𝗹𝗹 𝘁𝗵𝗲 𝗴𝗿𝗲𝗮𝘁 𝗺𝗼𝗺𝗲𝗻𝘁𝘀 𝘄𝗲 𝘀𝗵𝗮𝗿𝗲𝗱 𝗵𝗲𝗿𝗲 𝗶𝗻 ${groupName}. 🌟`,
  `🌱 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂, ${name}, 𝗳𝗼𝗿 𝗯𝗲𝗶𝗻𝗴 𝘂𝗻𝗲𝗦𝗧𝗢𝗽𝗣𝗔𝗕𝗟𝗘 𝗣𝗮𝗿𝘁 𝗼𝗳 ${groupName}. 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘆𝗼𝘂𝗿 𝗷𝗼𝘂𝗿𝗻𝗲𝘆 𝗰𝗼𝗻𝘁𝗶𝗻𝘂𝗲𝘀 𝘄𝗶𝘁𝗵 𝗟𝗢𝗧𝗦 𝗢𝗙 𝗟𝗢𝗩𝗘! 🌷`,
  `💫 𝗪𝗲 𝘀𝗮𝗱𝗹𝘆 𝘀𝗮𝘆 𝗳𝗮𝗿𝗲𝘄𝗲𝗹𝗹, ${name}. 𝗬𝗼𝘂'𝗿𝗲 𝗮 𝗳𝗼𝗿𝗲𝘃𝗲𝗿 𝗽𝗮𝗿𝘁 𝗼𝗳 ${groupName}, 𝗮𝗻𝗱 𝘄𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝘆𝗼𝘂 𝗰𝗮𝗿𝗿𝘆 𝘁𝗵𝗲 𝗺𝗲𝗺𝗼𝗿𝗶𝗲𝘀 𝗼𝗳 𝗼𝘂𝗿 𝗧𝗜𝗠𝗘 𝗧𝗢𝗚𝗘𝗧𝗛𝗘𝗥. 🕊️`,
  `🌿 𝗪𝗲'𝗿𝗲 𝘀𝗮𝗱 𝘁𝗵𝗮𝘁 𝘆𝗼𝘂'𝗿𝗲 𝗹𝗲𝗮𝗳𝗶𝗻𝗴, ${name}. 𝗣𝗹𝗲𝗮𝘀𝗲 𝗰𝗼𝗺𝗲 𝗯𝗮𝗰𝗸 𝘁𝗼 𝘂𝘀 𝘀𝗼𝗼𝗻. 𝗬𝗼𝘂𝗿 𝗲𝘀𝗽𝗲𝗰𝗶𝗮𝗹! 🌼`
];
      const randomGoodbye = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
      api.sendMessage(randomGoodbye, event.threadID);

      api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
        if (error) {
          api.sendMessage(`🪦𝗨𝗻𝗮𝗯𝗹𝗲 𝘁𝗼 𝗿𝗲-𝗮𝗱𝗱 𝗺𝗲𝗺𝗯𝗲𝗿 ${name} 𝘁𝗼 ${groupName}!`, event.threadID);
        } else {
          api.sendMessage(`🛡️𝗔𝗰𝘁𝗶𝘃𝗲 𝗮𝗻𝘁𝗶𝗼𝘂𝘁 𝗺𝗼𝗱𝗲, ${name} 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝗿𝗲-𝗮𝗱𝗱𝗲𝗱 𝘁𝗼 ${groupName} 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆!`, event.threadID);
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