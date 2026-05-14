const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: [],
    version: "20.2",
    author: "RAKIB HASAN",
    countDown: 1,
    role: 0,
    shortDescription: "ROYAL SIYAM INFO",
    longDescription: "PREMIUM AUTO INFO SYSTEM WITH HD API",
    category: "info"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {

    const triggerWords = [
      "সিয়াম",
      "সিয়াম ভাই",
      "siyam",
      "Siyam",
      "SIYAM",
      "siyam hasan",
      "siyam vai"
    ];

    const body = event.body ? event.body.toLowerCase() : "";

    if (!triggerWords.some(word => body.includes(word.toLowerCase()))) return;

    api.setMessageReaction("✡️", event.messageID, () => {}, true);

    // STYLE ROTATION
    if (!global.siyamStyle) global.siyamStyle = 0;
    global.siyamStyle++;
    if (global.siyamStyle > 4) global.siyamStyle = 1;

    const style = global.siyamStyle;

    // HD IMAGE
    async function getHDImage() {
      try {
        const url = "https://source.unsplash.com/random/1080x1080/?nature,portrait";

        const response = await axios.get(url, {
          responseType: "arraybuffer"
        });

        return response.data;

      } catch (err) {
        const fallback = [
          "https://files.catbox.moe/qlm3ds.jpg",
          "https://files.catbox.moe/d5exod.jpg"
        ];

        const fallbackUrl = fallback[Math.floor(Math.random() * fallback.length)];

        const res = await axios.get(fallbackUrl, {
          responseType: "arraybuffer"
        });

        return res.data;
      }
    }

    // CACHE FIXED
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const cachePath = path.join(cacheDir, `siyam_${Date.now()}.jpg`);

    const imageBuffer = await getHDImage();
    fs.writeFileSync(cachePath, imageBuffer);

    const attachment = fs.createReadStream(cachePath);

    // 🔥 YOUR ORIGINAL 4 DESIGNS (UNCHANGED)
    const designs = [

`╔━━━❖ ❤️ ❖━━━╗
 👑𝆠፝𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍👑
 ╚━━━❖ ❤️ ❖━━━╝

🧑 নাম ➤  তোরা
🏡 বাসা ➤ কিশোরগঞ্জ, বাংলাদেশ
📚 পড়ালেখা ➤ ক্লাস নিউ টেন
🎂 বয়স ➤ ১৭+
🏫 স্কুল ➤ এন এ মান্নান মানিক উচ্চ বিদ্যালয়

💌 পরিচয় :
❝ আমি ভালোবাসি নীরবতা,
কারণ শব্দের চেয়ে attitude বেশি কথা বলে ❞

❤️‍🔥🌸💖🌺✨🫶

━━━༺❀༻━━━`,

`╭─❖ 🌙 ❖─╮
 👑𝑺𝒊𝒚𝒂𝒎 𝑯𝒂𝒔𝒂𝒏👑
 ╰─❖ 🌙 ❖─╯

❂━━ 𝑷𝑹𝑬𝑴𝑰𝑼𝑴 𝑽𝑰𝑩𝑬 ━━❂

╭─────────────────╮
│ 👤 𝐍𝐀𝐌𝐄 ➤ 𝑺𝑰𝒀𝑨𝑴 𝑯𝒂𝒔𝒂𝒏
│ 🌍 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 ➤ 𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉, 𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
│ 📚 𝐒𝐓𝐔𝐃𝐘 ➤ 𝐂𝐋𝐀𝐒𝐒 𝐓𝐄𝐍
│ ⚡ 𝐀𝐆𝐄 ➤ 17+
│ 🏫 𝐒𝐂𝐇𝐎𝐎𝐋 ➤ 𝐍 𝐀 𝐌𝐀𝐍𝐍𝐀𝐍 𝐌𝐀𝐍𝐈𝐊 𝐇𝐈𝐆𝐇 𝐒𝐂𝐇𝐎𝐎𝐋
│ 📱 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 ➤ +8801789138157
╰─────────────────╯

❖━━ 𝑨𝑻𝑻𝑰𝑻𝑼𝑫𝑬 𝑵𝑶𝑻𝑬 ━━❖
❝ I DON’T COMPETE,
I CREATE MY OWN LEVEL.
I DON’T IMPRESS PEOPLE,
I EXPRESS MYSELF. ❞
💎⚡🖤👑🌙✨🔥`,

`╔══════════════╗
 💞 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐄𝐌𝐏𝐈𝐑𝐄 💞
╚══════════════╝

🌸 নাম : উদয় হাসান
💒 ঠিকানা : কিশোরগঞ্জ বাংলাদেশ
📘 ক্লাস : নিউ টেন
🎂 বয়স : ১৭ প্লাস
🏫 স্কুল :
এন এ মান্নান মানিক উচ্চ বিদ্যালয়

💝 উক্তি :
❝ ভালোবাসা সবার জন্য না,
কিছু মানুষ শুধু attitude নিয়েই সুন্দর ❞

💗🌺🫶❤️‍🔥✨💞

━━━༺🖤༻━━━`,

`╭━━━〔 💎 〕━━━╮
 👑 𝐒𝐈𝐘𝐀𝐌 𝐖𝐎𝐑𝐋𝐃 👑
 ╰━━━〔 💎 〕━━━╯

👤 𝐎𝐖𝐍𝐄𝐑 ➤ 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍
🏠 𝐇𝐎𝐌𝐄 ➤ 𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉
📚 𝐂𝐋𝐀𝐒𝐒 ➤ 𝐍𝐄𝐖 𝐓𝐄𝐍
🔥 𝐀𝐆𝐄 ➤ 17+
🏫 𝐒𝐂𝐇𝐎𝐎𝐋 ➤ 𝐍 𝐀 𝐌𝐀𝐍𝐍𝐀𝐍 𝐌𝐀𝐍𝐈𝐊 𝐇𝐈𝐆𝐇 𝐒𝐂𝐇𝐎𝐎𝐋

💫 𝐁𝐈𝐎 :
"I DON'T FOLLOW PEOPLE,
PEOPLE FOLLOW MY STYLE"

❤️✨🖤👑🌸💘

━━━━━━━━━━━━━━`
    ];

    return api.sendMessage(
      {
        body: designs[style - 1],
        attachment
      },
      event.threadID,
      event.messageID
    );
  }
};
