module.exports.config = {
  name: "autogreet",
  version: "1.0.0"
};

const greetingMessages = [
  "🌞 Good morning! Hope you’re ready to conquer the day! 💪",
  "🎉 Hey there! Let’s make today amazing! 💫",
  "🌟 Rise and shine, superstar! ✨ Time to slay the day! 💥",
  "🌈 Good vibes only today! Let’s keep the positivity flowing! 😄",
  "🔥 It’s a new hour, time to level up! 🚀",
  "🎊 Welcome back! Time to make some new memories together! 🥳",
  "🌱 Fresh start, fresh energy! Let’s do this! 💥",
  "💥 New hour, new opportunities! Go and grab them! 🏆",
  "👋 Hey there, let’s spread some good energy today! 💖",
  "🌺 Hope your day is as bright as your smile! 😊",
  "💫 Time for some fun! Let’s chat and have a blast! 🎉",
  "🚀 Blast off into a productive day! Keep shining! ✨",
  "💬 Let's catch up! Miss chatting with you! 😍",
  "🌻 Another hour to shine brighter than ever! 🌟",
  "😎 Let’s keep the good vibes rolling, shall we? ✌️",
  "🎈 It’s a new day to be awesome! Go out there and shine! 🌟",
  "🌞 Here’s to a wonderful hour! Keep being you! ❤️",
  "🌙 Just checking in to see how awesome you're doing today! 🌟",
  "💖 Hey! It’s time to check in and spread some joy! 🎉",
  "🌼 Wishing you a peaceful and productive hour ahead! 🍀",
  "💥 Time for some positive energy! Let’s make it count! 🔥",
  "✨ Hello, beautiful souls! Let’s make this hour fantastic! 💫",
  "🎶 It’s always a good time to spread some love! 💖",
  "🥳 Let’s make the most of this hour! Have fun and enjoy! 🎉",
  "🌸 Life’s too short to be anything but awesome! Let’s chat! 😄",
  "🌊 New hour, new chance to make things amazing! 🌟"
];

// Function para mag-send ng random greeting message
const sendGreeting = () => {
  // Piliin ang random message mula sa array
  const randomMessage = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];

  // I-send ang random greeting message sa group chat (Palitan ang sendMessageToGroupChat ng actual logic)
  sendMessageToGroupChat(randomMessage);
};

// Function para mag-send ng message
function sendMessageToGroupChat(message) {
  // Halimbawa ng pag-send ng message sa group chat, palitan ito ng iyong actual code
  console.log("Message sent: " + message);
}

// Set interval para mag-send ng random greeting bawat oras
setInterval(sendGreeting, 3600000); // 3600000 ms = 1 hour
