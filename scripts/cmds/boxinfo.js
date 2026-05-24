const fs = require("fs");
const request = require("request");
const path = require("path");

const AUTHOR = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";

module.exports = {
config: {
name: "boxinfo",
aliases: ["groupinfo"],

version: "3.0.0",

author: AUTHOR,

role: 1,

shortDescription: {
  en: "Premium Group Info"
},

category: "box chat",

guide: {
  en: "{pn}"
}

},

onStart: async function ({
api,
event
}) {

// 🔒 AUTHOR LOCK
if (
  module.exports.config.author !== AUTHOR
) {
  console.log("🚫 AUTHOR LOCK ACTIVATED");
  process.exit(1);
}

const cacheDir =
  path.join(__dirname, "cache");

const imgPath =
  path.join(cacheDir, "groupinfo.png");

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

const info =
  await api.getThreadInfo(
    event.threadID
  );

// 👥 MEMBER COUNT
let male = 0;
let female = 0;

for (const user of info.userInfo) {

  if (user.gender === "MALE")
    male++;

  else if (
    user.gender === "FEMALE"
  )
    female++;
}

// 📅 TIME
const now = new Date();

const time =
  now.toLocaleTimeString(
    "en-US",
    {
      timeZone: "Asia/Dhaka",
      hour12: true
    }
  );

const date =
  now.toLocaleDateString(
    "en-GB",
    {
      timeZone: "Asia/Dhaka"
    }
  );

// 📄 PREMIUM DESIGN
const text = `

╔═════════════╗
👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 🪄
╚═════════════╝
 💬 𝗚𝗥𝗢𝗨𝗣 𝗜𝗡𝗙𝗢 📥
🏷 𝗡𝗔𝗠𝗘 ➤
${info.threadName || "No Name"}

🆔 𝗚𝗥𝗢𝗨𝗣 𝗜𝗗 ➤
${info.threadID}

😀 𝗘𝗠𝗢𝗝𝗜 ➤
${info.emoji || "N/A"}

 👥 𝗠𝗘𝗠𝗕𝗘𝗥 𝗜𝗡𝗙𝗢🌐

👥 𝗧𝗢𝗧𝗔𝗟 ➤
${info.participantIDs.length}

👦 𝗠𝗔𝗟𝗘 ➤ ${male}
👧 𝗙𝗘𝗠𝗔𝗟𝗘 ➤ ${female}

🛡 𝗔𝗗𝗠𝗜𝗡𝗦 ➤
${info.adminIDs.length}

 ⚙️ 𝗚𝗥𝗢𝗨𝗣 𝗦𝗘𝗧𝗧𝗜𝗡𝗚 📀
✅ 𝗔𝗣𝗣𝗥𝗢𝗩𝗔𝗟 ➤
${info.approvalMode ? "ON" : "OFF"}

💬 𝗠𝗘𝗦𝗦𝗔𝗚𝗘𝗦 ➤
${info.messageCount}

🕒 𝗟𝗜𝗩𝗘 𝗧𝗜𝗠𝗘 ⌨️🖥️
📅 𝗗𝗔𝗧𝗘 ➤ ${date}
⏰ 𝗧𝗜𝗠𝗘 ➤ ${time}
━━━━━━━━━━━━━━━━━━
👑 𝗢𝗪𝗡𝗘𝗥 ➤
𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
`;

const send = () => {

  return api.sendMessage(
    {
      body: text,

      attachment:
        fs.existsSync(imgPath)
          ? fs.createReadStream(
              imgPath
            )
          : null
    },

    event.threadID,

    () => {

      if (
        fs.existsSync(imgPath)
      ) {
        fs.unlinkSync(imgPath);
      }
    },

    event.messageID
  );
};

// 🖼 NO PHOTO
if (!info.imageSrc) {
  return api.sendMessage(
    text,
    event.threadID,
    event.messageID
  );
}

// 📥 DOWNLOAD PHOTO
request(
  encodeURI(info.imageSrc)
)
  .pipe(
    fs.createWriteStream(imgPath)
  )
  .on("close", send);

}
};
