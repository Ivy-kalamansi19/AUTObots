module.exports.config = {
  name: "antiout",
  version: "1.0.0"
};

module.exports.handleEvent = async ({ event, api }) => {
  // Pag-check kung ang bot mismo ang umalis
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;

  // Para sa umaalis na member
  if (event.logMessageType === 'log:unsubscribe') {
    if (event.logMessageData?.leftParticipantFbId) {
      const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
      const { name } = info[event.logMessageData?.leftParticipantFbId];

      // Kunin ang pangalan ng group chat
      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.threadName || "𝗚𝗥𝗢𝗨𝗣 𝗖𝗛𝗔𝗧";

      // Pag-send ng leaving message
      api.sendMessage(`💔 𝗚𝗼𝗼𝗱𝗯𝘆𝗲, ${name}! 𝗬𝗼𝘂'𝗹𝗹 𝗱𝗲𝗳𝗶𝗻𝗶𝘁𝗲𝗹𝘆 𝗯𝗲 𝗺𝗶𝘀𝘀𝗲𝗱! 😭 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘁𝗼 𝘀𝗲𝗲 𝘆𝗼𝘂 𝗮𝗴𝗮𝗶𝗻 𝘀𝗼𝗼𝗻! 👋 𝗦𝘁𝗮𝘆 𝘀𝗮𝗳𝗲 𝗮𝗻𝗱 𝘁𝗮𝗸𝗲 𝗰𝗮𝗿𝗲! 🌟 ${groupName}.`, event.threadID);

      // Awtomatikong pag-readd kung gusto mo itong i-enable
      api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
        if (error) {
          api.sendMessage(`𝗨𝗻𝗮𝗯𝗹𝗲 𝘁𝗼 𝗿𝗲-𝗮𝗱𝗱 𝗺𝗲𝗺𝗯𝗲𝗿 ${name} 𝘁𝗼 ${groupName}!🪦`, event.threadID);
        } else {
          api.sendMessage(`𝗔𝗰𝘁𝗶𝘃𝗲 𝗮𝗻𝘁𝗶𝗼𝘂𝘁 𝗺𝗼𝗱𝗲, ${name} 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝗿𝗲-𝗮𝗱𝗱𝗲𝗱 𝘁𝗼 ${groupName} 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆!`, event.threadID);
        }
      });
    }
  }

  // Para sa bagong sumasali na member
  if (event.logMessageType === 'log:subscribe') {
    if (event.logMessageData?.addedParticipants) {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.threadName || "𝗚𝗥𝗢𝗨𝗣 𝗖𝗛𝗔𝗧";

      const welcomeMessages = [
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽! 🌟 ${groupName}, ${name}!🥳 𝗪𝗲’𝗿𝗲 𝗴𝗹𝗮𝗱 𝘆𝗼𝘂 𝗷𝗼𝗶𝗻𝗲𝗱 𝘂𝘀! 🤩 𝗗𝗼𝗻’𝘁 𝗯𝗲 𝘀𝗵𝘆, 𝗳𝗲𝗲𝗹 𝗳𝗿𝗲𝗲 𝘁𝗼 𝗰𝗵𝗮𝘁! 💬`,
        `🎉 𝗛𝗲𝗹𝗹𝗼 ${name}! 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 ${groupName}! 🥳 𝗚𝗹𝗮𝗱 𝘁𝗵𝗮𝘁 𝘆𝗼𝘂'𝗿𝗲 𝗵𝗲𝗿𝗲! 😄 𝗛𝗮𝘃𝗲 𝗳𝘂𝗻 𝗰𝗵𝗮𝘁𝘁𝗶𝗻𝗴! 💬`,
        `🎊 𝗛𝗲𝗹𝗹𝗼, ${name}! 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 ${groupName}! 🌟 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘆𝗼𝘂 𝗵𝗮𝗩𝗲 𝗮 𝗴𝗿𝗲𝗮𝘁 𝘁𝗶𝗺𝗲 𝗵𝗲𝗿𝗲! 💬✨`,
        `🎉 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗼𝘂𝗿 𝗚𝗥𝗢𝗨𝗣 𝗖𝗛𝗔𝗧, ${name}! 🥳 𝗪𝗲'𝗿𝗲 𝗵𝗮𝗽𝗽𝘆 𝘁𝗵𝗮𝘁 𝘆𝗼𝘂 𝗷𝗼𝗶𝗻𝗲𝗱! 🎉`,
        `🎊 𝗣𝗹𝗲𝗮𝘀𝗮𝗻𝘁 𝗪𝗲𝗹𝗰𝗼𝗺𝗲, ${name}! 𝗪𝗲’𝗿𝗲 𝗴𝗹𝗮𝗱 𝘁𝗵𝗮𝘁 𝘆𝗼𝘂'𝗿𝗲 𝗵𝗲𝗿𝗲 𝘄𝗶𝘁𝗵 𝘂𝘀! 💬🌟`,
        `🎉 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 ${groupName}, ${name}! 🥳 𝗧𝗵𝗲 𝗳𝗮𝗺𝗶𝗹𝘆 𝗷𝘂𝘀𝘁 𝗴𝗼𝘁 𝗯𝗲𝗮𝘂𝘁𝗶𝗳𝘂𝗹𝗹𝘆 𝗟𝗜𝗩𝗘! 🎊`,
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲, ${name}! 🌟 𝗪𝗲 𝗵𝗼𝗽𝗲 𝘆𝗼𝘂 𝗲𝗻𝗷𝗼𝘆 𝗰𝗵𝗮𝘁𝘁𝗶𝗻𝗴 𝘄𝗶𝘁𝗵 𝘂𝘀! 💬🎉`,
        `🎉 𝗛𝗲𝗹𝗹𝗼 ${name}! 𝗬𝗼𝘂'𝗿𝗲 𝗻𝗼𝘄 𝗮 𝗽𝗮𝗿𝘁 𝗼𝗳 𝗧𝗛𝗘 𝗚𝗥𝗢𝗨𝗣! 🎊 𝗛𝗮𝗩𝗲 𝗳𝘂𝗻! 🥳`,
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽, ${name}! 🥳 𝗪𝗲 𝗵𝗮𝘃𝗲 𝗮 𝗚𝗥𝗘𝗔𝗧 𝘁𝗶𝗺𝗲 𝗮𝗵𝗲𝗮𝗱 𝘂𝘀! 💬`,
        `🎉 𝗛𝗲𝗹𝗹𝗼 ${name}! 𝗔 𝗪𝗮𝗿𝗺 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 ${groupName}! 🥳 𝗣𝗹𝗲𝗮𝘀𝗲 𝗳𝗲𝗲𝗹 𝗳𝗿𝗲𝗲 𝘁𝗼 𝘁𝗮𝗹𝗸 𝗮𝗻𝗱 𝗲𝗻𝗷𝗼𝘆! 🎊`,
        `🎊 𝗚𝗲𝗻𝘁𝗹𝗲𝗺𝗲𝗻 𝗮𝗻𝗱 𝗟𝗮𝗱𝗶𝗲𝘀, 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 ${name} 𝘁𝗼 𝗧𝗛𝗘 𝗙𝗔𝗠𝗜𝗟𝗬! 🎉 𝗖𝗵𝗮𝘁𝘁𝗶𝗻𝗴 𝗯𝗲𝗴𝗶𝗻𝘀! ✨`,
        `🎉 𝗚𝗿𝗲𝗮𝘁 𝘁𝗼 𝘀𝗲𝗲 𝘆𝗼𝘂, ${name}! 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗖𝗛𝗔𝗧𝗧𝗘𝗥𝗦 𝗙𝗢𝗥 𝗘𝗩𝗘𝗥! 💬`,
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲, ${name}! 𝗧𝗵𝗲 𝗳𝗮𝗺𝗶𝗹𝘆 𝗷𝘂𝘀𝘁 𝗴𝗼𝘁 𝗯𝗲𝗮𝘂𝘁𝗶𝗳𝘂𝗹𝗹𝘆 𝗟𝗜𝗩𝗘! 🎉`,
        `🎉 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗵𝗼𝗺𝗲, ${name}! 🌟 𝗪𝗲 𝗵𝗮𝘃𝗲 𝗳𝗮𝗻𝗳𝗮𝘀𝘁𝗶𝗰 𝗠𝗢𝗠𝗘𝗡𝗧𝗦 𝗮𝗵𝗲𝗮𝗱! 🎊`,
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗮𝗯𝗼𝗮𝗿𝗱, ${name}! 🥳 𝗟𝗲𝘁'𝘀 𝗵𝗮𝘃𝗲 𝗳𝗨𝗡 𝘁𝗼𝗴𝗲𝘁𝗵𝗲𝗿! 🎉`,
        `🎉 𝗗𝗲𝗮𝗿 ${name}, 𝗛𝗲𝗹𝗹𝗼 𝗮𝗻𝗱 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗙𝗔𝗠𝗜𝗟𝗬! 🎊 𝗘𝗻𝗷𝗼𝘆 𝘁𝗵𝗲 𝗝𝗢𝗨𝗥𝗡𝗘𝗬! 🥳`,
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 ${name}! 🥳 𝗡𝗢𝗧𝗛𝗜𝗡𝗚 𝗕𝗨𝗧 𝗙𝗨𝗡 𝗵𝗲𝗿𝗲 𝗶𝗻 ${groupName}! 🎉`
      ];

      const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

      // Pag-send ng welcoming message
      api.sendMessage(randomMessage, event.threadID);
    }
  }
};
