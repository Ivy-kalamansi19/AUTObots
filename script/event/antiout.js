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
      const groupName = threadInfo.threadName || "ang group chat";

      // Pag-send ng leaving message
      api.sendMessage(`Paalam, ${name}! Salamat sa pagsama sa ${groupName}.`, event.threadID);

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
      const groupName = threadInfo.threadName || "ang group chat";

      for (const participant of event.logMessageData.addedParticipants) {
        const info = await api.getUserInfo(participant.userFbId);
        const { name } = info[participant.userFbId];

        // Pag-send ng welcoming message
        api.sendMessage(`Welcome sa ${groupName}, ${name}! Masaya kaming makasama ka.`, event.threadID);
      }
    }
  }
};
