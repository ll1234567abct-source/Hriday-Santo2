const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

console.log("✅ Mug2 Command Loaded Successfully");

module.exports = {
  config: {
    name: "Mug2",
    version: "3.1.0",
    author: "FARHAN-KHAN & SIYAM",
    countDown: 5,
    role: 0,
    shortDescription: "Premium Auto Video",
    longDescription: "Auto Reply Premium Video System",
    category: "media",
    guide: {
      en: "{pn}"
    }
  },

  // ✅ BOT START CHECK
  onStart: async function () {
    console.log("🚀 Mug2 onStart Running");
  },

  handleEvent: async function ({ api, event }) {
    try {

      // ✅ BODY CHECK
      if (!event.body) return;

      const body = event.body.toLowerCase();

      console.log("📩 Message Received:", body);

      // 🎬 VIDEO DATA
      const videoMap = [
        {
          key: "কলে আসো",
          link: "https://files.catbox.moe/p8qlso.mp4",
          text: `
╭〔 ☎️ CALL REPLY 〕╮
┃ 📞 সবাই কলে আসো!
┃ 😎 gf bf দেওয়া হবে 🧑‍🍼
╰━━━━━━━━━━━━━━━╯
`
        },

        {
          key: "চিপা থেকে বাহির হও",
          link: "https://files.catbox.moe/atdk5k.mp4",
          text: `
🤡 FUNNY REPLY
🐸 চিপায় থাকলে লাভ নাই ভাই
🚶 বাহির হও
😂 সবাই ডাকছে 🙄
`
        },

        {
          key: "রিয়েক্ট দে",
          link: "https://files.catbox.moe/hitsnc.mp4",
          text: `
╭〔 🔥 REACT BOOST 〕╮
┃ ❤️ রিয়েক্ট না দিলে কিক🤪
┃ 😩 প্রতিবন্ধী মেম্বার?
┃ 🖕 দরকার নাই🥴
╰━━━━━━━━━━━━━━━╯
`
        },

        {
          key: "জানু",
          link: "https://files.catbox.moe/k6acls.mp4",
          text: `
তার জন্য নিজেকে তিলে তিলে শেষ করে দেওয়া যেই বেপারটা....!🥺💔😭😅
`
        },

        {
          key: "চুত মারানি",
          link: "https://files.catbox.moe/zdirp4.mp4",
          text: `
╭〔 💀 ATTITUDE MODE 〕╮
┃ 😎 বেশি হাতমারা ভালো না
┃ 🔥 শান্ত থাকো না হলে কিন্তু
┃ 🖕 এমন চু*দাচু*দবো
┃ 🥵 ভার্চুয়াল এ মুখ
┃ 😼 দেখাতে পারবে না🖕🥵
╰━━━━━━━━━━━━━━━━╯
`
        },

        {
          key: "জুতি",
          link: "https://files.catbox.moe/3sjox4.mp4",
          text: `
হাতের দাগ গুলা না হয় সাক্ষী রইলো তোমায় কতটা ভালোবাসি...!🥺❤️‍🩹
`
        }
      ];

      // ✅ MATCH CHECK
      const match = videoMap.find(item =>
        body.includes(item.key.toLowerCase())
      );

      if (!match) return;

      console.log("🎯 Matched Keyword:", match.key);

      // 📂 CACHE FOLDER
      const cacheDir = path.join(__dirname, "cache");

      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
        console.log("📁 Cache Folder Created");
      }

      const filePath = path.join(
        cacheDir,
        `video_${Date.now()}.mp4`
      );

      // ❤️ RANDOM REACTION
      const reactions = ["💔", "👑", "💀", "😹", "🫶", "😔"];

      const reactEmoji =
        reactions[Math.floor(Math.random() * reactions.length)];

      // ⏳ LOADING MESSAGE
      const loading = `
👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✡️

📡 VIDEO LOADING...
⏳ PLEASE WAIT...
`;

      api.sendMessage(
        loading,
        event.threadID,
        async (err, info) => {

          if (err) {
            console.log("❌ Loading Message Error:", err);
            return;
          }

          const msgID = info.messageID;

          // ❤️ REACTION
          try {
            api.setMessageReaction(
              reactEmoji,
              event.messageID,
              () => {},
              true
            );
          } catch (reactionErr) {
            console.log("❌ Reaction Error:", reactionErr);
          }

          try {

            console.log("📥 Download Starting...");

            // 📥 DOWNLOAD VIDEO
            const response = await axios({
              url: match.link,
              method: "GET",
              responseType: "stream",
              timeout: 120000
            });

            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            // ✅ DOWNLOAD FINISH
            writer.on("finish", async () => {

              console.log("✅ Download Complete");

              try {

                // ❌ REMOVE LOADING MESSAGE
                try {
                  api.unsendMessage(msgID);
                } catch {}

                // 🎬 SEND VIDEO
                await api.sendMessage(
                  {
                    body: `${match.text}

👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
🎬 HIGH QUALITY RESPONSE
⚡ POWERED BY SIYAM
`,
                    attachment: fs.createReadStream(filePath)
                  },
                  event.threadID
                );

                console.log("✅ Video Sent");

                // 🗑️ DELETE CACHE FILE
                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                  console.log("🗑️ Cache Deleted");
                }

              } catch (sendErr) {

                console.log("❌ Send Error:", sendErr);

                api.sendMessage(
                  "❌ ভিডিও পাঠানো যায় নাই",
                  event.threadID
                );
              }
            });

            // ❌ STREAM ERROR
            writer.on("error", async (streamErr) => {

              console.log("❌ Stream Error:", streamErr);

              try {
                api.unsendMessage(msgID);
              } catch {}

              api.sendMessage(
                "❌ ভিডিও প্রসেস করতে সমস্যা হয়েছে",
                event.threadID
              );

              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            });

          } catch (downloadErr) {

            console.log("❌ Download Error:", downloadErr);

            try {
              api.unsendMessage(msgID);
            } catch {}

            api.sendMessage(
              "❌ ভিডিও download fail হয়েছে",
              event.threadID
            );
          }
        }
      );

    } catch (error) {

      console.log("❌ Main Error:", error);

      api.sendMessage(
        "❌ Unexpected Error",
        event.threadID
      );
    }
  }
};
