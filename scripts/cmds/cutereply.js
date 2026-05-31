const fs = require("fs-extra");
const path = require("path");
const https = require("https");

const AUTHOR = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";

module.exports = {
config: {
name: "cutereply",
version: "3.1.0",
author: AUTHOR,
countDown: 0,
role: 0,

shortDescription: {
  en: "Premium Auto Reply"
},

longDescription: {
  en: "Auto reply with stylish message & image"
},

category: "system"

}
};

// 🔒 AUTHOR LOCK
if (
module.exports.config.author !== AUTHOR
) {
console.log("🚫 AUTHOR LOCK ACTIVATED");
process.exit(1);
}

// ⏱️ COOLDOWN
const cooldown = 10000;

const lastReply = {};

// ✨ AUTO REPLY DATA
const TRIGGERS = [

//
// 👑 OWNER REPLY
//
{
words: [
"siyam",
"সিয়াম",
"@আ্ঁসো্ঁ সে্ঁক্স্ঁ ক্ঁরি্ঁ",
"@পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ"
],

text:

`╭〔 👑 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 〕╮

👑 𝗕𝗢𝗬𝗘𝗦 𝗞𝗜𝗡𝗚 𝗛𝗥𝗜𝗗𝗢𝗬 👑

👑 আমার বস সিয়াম এখন একটু বিজি আছে
📩 ইনবক্সে মেসেজ দিয়ে রাখো 👇
🪽 বস ফ্রি হলে অবশ্যই রিপ্লাই দিবে 🛰️
🔗
https://www.facebook.com/profile.php?id=61589656899295

            👑 𝗢𝗪𝗡𝗘𝗥 ➤
            𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
╰━━━━━━━━━━━━━━━━╯`,

images: [
  "https://i.imgur.com/eLN7EQj.jpeg",
  "https://i.imgur.com/hWbJuVt.jpeg",
  "https://i.imgur.com/maHcZQB.jpeg",
  "https://i.imgur.com/kjcOXuA.jpeg"
]

},

//
// 🤖 BOT REPLY
//
{
words: [
"@নিঝুম",
"@বট",
"@নি্ঁঝু্ঁম্ঁ রা্ঁতে্ঁর্ঁ প্ঁরী্ঁ"
],

text:

`╭〔 🤖 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 〕╮

😹 আমাকে মেনশন দিয়ে লাভ নাই
🤖 আমি একটা Messenger Robot
⚡ শুধুমাত্র বিনোদনের জন্য তৈরি করা হয়েছে
💖 চাইলে আপনিও নিজের গ্রুপে নিতে পারেন 👇
🔗
https://www.facebook.com/profile.php?id=61589656899295

            👑 𝗠𝗔𝗗𝗘 𝗕𝗬 ➤
            𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
╰━━━━━━━━━━━━━━━━╯`,

images: [
  "https://i.imgur.com/rkrXNso.jpeg",
  "https://i.imgur.com/wyNCOKV.gif"
]

}

];

// 🚀 START
module.exports.onStart = async function () {};

// 💬 CHAT EVENT
module.exports.onChat = async function ({
event,
api
}) {

try {

const {
  threadID,
  senderID,
  messageID
} = event;

const body =
  (event.body || "")
  .toLowerCase()
  .trim();

if (!body) return;

// 🤖 IGNORE BOT
if (
  senderID ==
  api.getCurrentUserID()
) return;

// ⏱️ COOLDOWN
const now = Date.now();

if (
  lastReply[threadID] &&
  now - lastReply[threadID] <
    cooldown
) {
  return;
}

let matched = null;

// 🔍 MATCH WORD
for (const item of TRIGGERS) {

  if (
    item.words.some(word =>
      body.includes(
        word.toLowerCase()
      )
    )
  ) {
    matched = item;
    break;
  }
}

if (!matched) return;

lastReply[threadID] = now;

// 🎲 RANDOM IMAGE
const imgUrl =
  matched.images[
    Math.floor(
      Math.random() *
      matched.images.length
    )
  ];

const imgName =
  path.basename(imgUrl);

const imgPath =
  path.join(__dirname, imgName);

// 📥 DOWNLOAD IMAGE
if (
  !fs.existsSync(imgPath)
) {
  await downloadImage(
    imgUrl,
    imgPath
  );
}

// 📤 SEND MESSAGE
api.sendMessage(
  {
    body: matched.text,

    attachment:
      fs.createReadStream(
        imgPath
      )
  },

  threadID,
  messageID
);

} catch (err) {
console.log(err);
}
};

// 📥 IMAGE DOWNLOAD
function downloadImage(
url,
dest
) {

return new Promise(
(resolve, reject) => {

  const file =
    fs.createWriteStream(dest);

  https
    .get(url, res => {

      if (
        res.statusCode !== 200
      ) {

        fs.unlink(
          dest,
          () => {}
        );

        return reject();
      }

      res.pipe(file);

      file.on(
        "finish",
        () => {
          file.close(resolve);
        }
      );

    })

    .on("error", () => {

      fs.unlink(
        dest,
        () => {}
      );

      reject();

    });
}

);
  }
  
