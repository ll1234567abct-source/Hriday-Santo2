const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "link"],
    version: "4.0",
    author: "SIYAM",
    countDown: 3,
    role: 0,
    shortDescription: "Premium Video Sender",
    longDescription: "Auto download and send premium video",
    category: "media",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    const cacheDir = path.join(__dirname, "cache");
    const filePath = path.join(cacheDir, "fork_video.mp4");

    try {

      // cache folder create
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      // 🌟 Premium Loading Message
      const loading = await message.reply(`
╭━〔 ⚡ SYSTEM ⚡ 〕━╮
┃ ⏳ আরে মামা দাঁড়াও দিতেছি...
╰━━━━━━━━━━━━━━━━╯
`);

      // 🎥 Google Drive Direct Video Link
      const videoUrl =
        "https://files.catbox.moe/lakl90.mp4";

      // download video
      const response = await axios.get(videoUrl, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(response.data));

      // ✅ Send video + text together
      await message.reply({
        body: "এই নাও মামা ✋ হাত মারো🥵",
        attachment: fs.createReadStream(filePath)
      });

      // 🗑️ Delete loading message
      if (loading && loading.messageID) {
        message.unsend(loading.messageID);
      }

      // 🧹 Delete cache file
      fs.unlinkSync(filePath);

    } catch (err) {
      console.error("Fork Command Error:", err);

      return message.reply("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!");
    }
  }
};
