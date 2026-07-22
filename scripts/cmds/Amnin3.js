// 🙂 নাম পরিবর্তন করলে ফাইল নষ্ট হতে পারে

const a1 = "hriday";
const a2 = "ha";
const a3 = "ssan";
const a4 = "sha";
const a5 = "nto";

const hiddenOwner = [a1, a2, a3, a4, a5].join("");

if (hiddenOwner !== "hriday hassan shanto") {
  process.exit(0);
}

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");

// 📂 CACHE CREATE
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}// 🎬 VIDEO LIST
const videoList = [
  {
    url: "https://files.catbox.moe/qgmyk9.mp4",
    file: "video1.mp4"
  },
  {
    url: "https://files.catbox.moe/ygsz4h.mp4",
    file: "video2.mp4"
  },
  {
    url: "https://files.catbox.moe/psl98k.mp4",
    file: "video3.mp4"
  },
  {
    url: "https://files.catbox.moe/rzhmck.mp4",
    file: "video4.mp4"
  },
  {
    url: "https://files.catbox.moe/h1w4ol.mp4",
    file: "video5.mp4"
  }
];

// 🔄 VIDEO INDEX FILE
const indexFile = path.join(CACHE_DIR, "videoIndex.json");

// 📥 AUTO DOWNLOAD VIDEOS
async function downloadVideos() {
  for (const vid of videoList) {
    const filePath = path.join(CACHE_DIR, vid.file);
    if (!fs.existsSync(filePath)) {
      try {
        const response = await axios({
          method: "GET",
          url: vid.url,
          responseType: "stream",
          timeout: 30000
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        console.log(`✅ Downloaded: ${vid.file}`);
      } catch (err) {
        console.log(`❌ Failed: ${vid.file}`, err.message);
      }
    }
  }
}

// 🚀 START DOWNLOAD
downloadVideos();

module.exports = {
  config: {
    name: "admin3",
    version: "13.0",
    author: hiddenOwner,
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Admin mention auto reply"
    },
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ api, event, message }) {
    try {
      // 👑 ADMIN DATA
      const admins = [
        {
          uid: "100091413057011",
          triggers: [
            "@মালয়েশিয়া সিঙ্গেল বয়",
            "@hriday hassan shanto",
            "হৃদয়",
            "@রিতু মনি",
            "@mim",
            "হৃদয় ভাই",
            "boss hrida",
            "হৃদয় boss",
            "হৃদয়",
            "হৃদয় ভাই",
            "@lamiya",
            "রিদয় ভাই",
            "বট অ্যাডমিন কে"
          ]
        }
      ];

      const senderID = String(event.senderID);

      // 👑 IGNORE ADMIN SELF
      if (admins.some(a => String(a.uid) === senderID)) return;

      const text = (event.body || "").toLowerCase().trim();
      if (!text) return;

      const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(id => String(id)) : [];

      // 🔍 DETECT
      const triggeredAdmin = admins.find(admin =>
        mentionedIDs.includes(String(admin.uid)) ||
        admin.triggers.some(trigger => text.includes(trigger.toLowerCase()))
      );

      if (!triggeredAdmin) return;

      // 💬 TEXTS
      const captions = [
        "🇲🇾 মালয়েশিয়া সিঙ্গেল বয়কে বেশি মেনশন দিও না, মানুষটা এখনো GF খুঁজতাছে! 😹💔",
        "🥀 মালয়েশিয়া সিঙ্গেল বয় অনলাইনে আছে, কিন্তু তার ভাগ্য অফলাইনে! 🤧",
        "😎 বস মালয়েশিয়া সিঙ্গেল বয় এখন বিজি, প্রেমের আবেদন পরে জমা দিন! 📩",
        "💔 মালয়েশিয়া সিঙ্গেল বয়কে ডাকিস না, পুরান স্মৃতি মনে পড়ে যায়! 🥺",
        "🤭 এত মেনশন না দিয়ে একটা ভালো মনের মানুষ খুঁজে দে বসের জন্য!",
        "🇲🇾 মালয়েশিয়া সিঙ্গেল বয় এখন কাজে ব্যস্ত, হৃদয়টা ফাঁকা আছে! 😂",
        "😹 বসের ইনবক্স খালি, কিন্তু মনটা অনেক আগেই ফুল ছিল!",
        "🔥 মালয়েশিয়া সিঙ্গেল বয়কে মেনশন করলে ১০ টাকা জরিমানা, আর হাসলে ফ্রি!",
        "🫂 সিঙ্গেল লাইফ চলছে, তাই বেশি ডিস্টার্ব না করাই ভালো!",
        "🥺 মালয়েশিয়া সিঙ্গেল বয় হাসে ঠিকই, কিন্তু রাতের গল্পটা আলাদা! 💔🌙"
      ];

      // 🎲 RANDOM TEXT
      const rawCaption = captions[Math.floor(Math.random() * captions.length)];

      // ✨ STYLE
      const styledCaption = `\n✿•≫────────────≪•✿\n『 ${rawCaption} 』\n✿•≫────────────≪•✿\n`;

      // 🔄 GET VIDEO INDEX
      let currentIndex = 0;
      if (fs.existsSync(indexFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(indexFile, "utf8"));
          currentIndex = data.index || 0;
        } catch (e) {
          console.error("Failed to read index file:", e);
        }
      }

      // 🎬 SELECT VIDEO
      const selectedVideo = videoList[currentIndex];
      const videoPath = path.join(CACHE_DIR, selectedVideo.file);

      // 🔄 SAVE NEXT INDEX
      let nextIndex = currentIndex + 1;
      if (nextIndex >= videoList.length) {
        nextIndex = 0;
      }

      fs.writeFileSync(indexFile, JSON.stringify({ index: nextIndex }));

      // 📤 SEND
      if (fs.existsSync(videoPath)) {
        await message.reply({
          body: styledCaption,
          attachment: fs.createReadStream(videoPath)
        });
      } else {
        // 📥 IF MISSING DOWNLOAD AGAIN
        try {
          const response = await axios({
            method: "GET",
            url: selectedVideo.url,
            responseType: "stream",
            timeout: 30000
          });

          const writer = fs.createWriteStream(videoPath);
          response.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });

          await message.reply({
            body: styledCaption,
            attachment: fs.createReadStream(videoPath)
          });
        } catch (err) {
          console.log("Video Send Error:", err.message);
          await message.reply(styledCaption);
        }
      }
        } catch (err) {
      console.log("AdminMention Error:", err);
    }
  }
};
