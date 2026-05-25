// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼
// ⚠️ নাম চেঞ্জ করলে ফাইল নষ্ট হয়ে যাবে ভাই 😾

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const _x1 = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
const _x2 = "MR_FARHAN";

module.exports = {
  config: {
    name: "text_voice",
    version: "3.0.0",
    author: _x2,
    countDown: 1,
    role: 0,
    shortDescription: "Ultra Fast Voice Reply",
    longDescription: "Premium Auto Voice System",
    category: "system"
  },

  // =========================
  // 🔒 HIDDEN LOCK SYSTEM
  // =========================
  _s() {
    const z = ["𝆠", "፝", "𝐒", "𝐈", "𝐘", "𝐀", "𝐌"];
    const v = z.join("");

    if (!_x1.includes(v)) {
      throw new Error("SYSTEM LOCKED");
    }

    if (module.exports.config.author !== _x2) {
      throw new Error("AUTHOR CHANGE DETECTED");
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    this._s();

    if (!event.body) return;

    const input = event.body.toLowerCase().trim();

    // =========================
    // 🎤 VOICE DATABASE
    // =========================
    const voiceMap = {

      "ভুদা": "https://files.catbox.moe/gnyx0p.mp3",
      "চুদি তর মাকে": "https://files.catbox.moe/8nhe74.mp4",
      "আসো হাত মারি": "https://files.catbox.moe/8ioph1.mp3",
      "মাদারচোদ চামচা": "https://tmpfiles.org/dl/wwwq6rpmRD0h/upload_1779657408207.mp3",

      "good night": "https://files.catbox.moe/i29m4q.mp3",
      "গুড নাইট": "https://files.catbox.moe/i29m4q.mp3",

      "good morning": "https://files.catbox.moe/8gzqx5.mp3",
      "গুড মর্নিং": "https://files.catbox.moe/8gzqx5.mp3",

      "siyam": "https://files.catbox.moe/9w6moo.mp3",
      "সিয়াম ভাই": "https://files.catbox.moe/9w6moo.mp3",
      "সিয়াম": "https://files.catbox.moe/9w6moo.mp3",

      "@তো্ঁমা্ঁগো্ঁ পি্ঁচ্ছি্ঁ উ্ঁদয়্ঁ তা্ঁহ": "https://files.catbox.moe/9w6moo.mp3",

      "@everyone": "https://files.catbox.moe/5myzdz.mp4",

      "নিঝুম": "https://files.catbox.moe/5myzdz.mp4",

      ",sex": "https://files.catbox.moe/uy7mrv.mp3",
      ",hot": "https://files.catbox.moe/m5djca.mp3",
      "s+n": "https://files.catbox.moe/w9doti.mp4",

      "টুকি": "https://files.catbox.moe/e8ebel.mp3",
      "আমি মাদিহা": "https://files.catbox.moe/9gyjwp.mp3",
      "নুনু": "https://files.catbox.moe/r5uz42.mp3",

      "🐍": "https://files.catbox.moe/s1k2nx.mp4",
      "✡️": "https://files.catbox.moe/5rdtc6.mp3",

      // =========================
      // 🆕 EMPTY SLOT SYSTEM
      // =========================

      "মিম তুমারে চুদি": "https://files.catbox.moe/plex4g.mp4",
      "কপি বট": "https://files.catbox.moe/4vmyke.mp4",
      "demo_trigger_3": "https://example.com/demo3.mp3",
      "demo_trigger_4": "https://example.com/demo4.mp3",
      "demo_trigger_5": "https://example.com/demo5.mp3"

      // ⚠️ এখানে নতুন trigger + link বসালেই auto help এ add হবে
    };

    // =========================
    // 📜 VOICE HELP
    // =========================
    if (input === "voicehelp") {

      // 🔒 ONLY BOT ADMIN
      const admins = global.GoatBot?.config?.adminBot || [];

      if (!admins.includes(event.senderID)) {
        return message.reply(" | 🤬এ মাদারচোদ বট তোর বাপের।🙄   🥵তোর আম্মুর বোদা ফাক কর🖕 👉এইটা শুধু আমার বস সিয়াম এর জন্য😻!");
      }

      const allTriggers = Object.keys(voiceMap);

      const realTriggers = allTriggers.filter(
        item => !item.startsWith("demo_trigger_")
      );

      let msg = `
═══════════════
    🎤 𝗩𝗢𝗜𝗖𝗘 𝗛𝗘𝗟𝗣 🎤
═══════════════

🤖 𝗕𝗢𝗧 : 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧
👑 𝗢𝗪𝗡𝗘𝗥 : 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡

╭━━━━━━━━━━━━━━━━╮
┃ 📦 TOTAL VOICE : ${realTriggers.length}
╰━━━━━━━━━━━━━━━━╯
`;

      realTriggers.forEach((trigger, index) => {

        msg += `

╭─❍「 🎧 ${index + 1} 」
│ 👉 ${trigger}
╰───────────────⭓
`;

      });

      msg += `

╔════════════════╗
      👉 +8801789138157
╚════════════════╝
`;

      return message.reply(msg);
    }

    // =========================
    // 🎧 AUTO VOICE SYSTEM
    // =========================
    if (voiceMap[input]) {

      const audioUrl = voiceMap[input];

      // demo link skip
      if (audioUrl.includes("example.com")) {
        return;
      }

      const cacheDir = path.join(__dirname, "cache", "voices");

      fs.ensureDirSync(cacheDir);

      const ext = audioUrl.endsWith(".mp4")
        ? ".mp4"
        : ".mp3";

      const fileName =
        Buffer.from(input).toString("hex") + ext;

      const filePath = path.join(cacheDir, fileName);

      try {

        // ⚡ FAST CACHE
        if (fs.existsSync(filePath)) {

          return await message.reply({
            attachment: fs.createReadStream(filePath)
          });

        }

        // 🌐 DOWNLOAD
        const response = await axios.get(audioUrl, {
          responseType: "arraybuffer"
        });

        fs.writeFileSync(
          filePath,
          Buffer.from(response.data)
        );

        // 📤 SEND
        await message.reply({
          attachment: fs.createReadStream(filePath)
        });

      } catch (e) {

        console.error("Voice Error:", e);

      }
    }
  }
};
