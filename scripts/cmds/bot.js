const axios = require("axios");

const baseApiUrl = "https://noobs-api.top/dipto/baby";

const header = `👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍👑\n━━━━━━━━━━━━━━`;

const format = (text) => `${header}\n${text}`;

// ───── FULL FIXED REPLIES ─────
const fixedReplies = [
  "𝗵𝗲 𝗯𝗼𝘁 𝗯𝗼𝘁 𝗰𝗵𝗶𝗹𝗹 𝗯𝗿𝗼!",
  "I love you 💝",
  "আমি 𓆩সিয়াম𓆪 বস এর সাথে বিজি আছি-😕😏",
  "আমার বস 𓆩সিয়াম𓆪 কে একটা জি GF দাও-😽🫶",
  "জান তোমার নানি রে আমার হাতে তুলে দিবা-🙊🙆‍♂",
  "𓆩সিয়াম𓆪 বস'এর হবু বউ রে কেও দেকছো?😪",
  "জান হাঙ্গা করবা-🙊😝",
  "ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤",
  "তাকাই আছো কেন চুমু দিবা-🙄🐸😘",
  "বেশি Bot Bot করলে leave নিবো কিন্তু😒",
  "তোর বাড়ি কি কিশোরগঞ্জ, পোড়াবাড়িয়া গ্রাম😵‍💫",
  "মেয়ে হলে বস 𓆩সিয়াম𓆪 কে 𝐊𝐈𝐒𝐒 দে 😒",
  "চুমু খাওয়ার বয়স টা চকলেট🍫খেয়ে উড়িয়ে দিলো 𓆩সিয়াম𓆪 বস 🥺🤗",
  "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
  "জান বাল ফালাইবা-🙂🥱🙆‍♂",
  "আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇",
  "দিনশেষে পরের BOW সুন্দর-☹️🤧",
  "সুন্দর মাইয়া মানেই-🥱আমার বস 𓆩সিয়াম𓆪 এর বউ-😽🫶",
  "হা জানু , এইদিক এ আসো কিস দেই🤭 😘",
  "আরে আমি মজা করার mood এ নাই😒",
  "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘",
  "আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস 𓆩সিয়াম𓆪 কে দান করেন-🥱🐰🍒",
  "ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧",
  "অনুমতি দিলে কল দিতাম..!😒",
  "জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽",
  "বস 𓆩সিয়াম𓆪 এর সাথে কথা বলবো এখন , ডিস্টার্ব করিস না 😒",
  "বেশি বেশি বকবক করলে তোকে ব্লক মেরে দেবো কিন্তু-🐸",
  "জানু তোমার জন্য আমার মনটা আই ঢাই করে 💖",
  "ওই যে দেখো 𓆩সিয়াম𓆪 বস যাচ্ছে , এক বালতি প্রেম দিয়ে দাও 🤭"
];

// ───── Typing ─────
async function typing(api, threadID) {
  try {
    if (api.sendTypingIndicator) {
      await api.sendTypingIndicator(threadID, true);
      await new Promise(r => setTimeout(r, 800));
      await api.sendTypingIndicator(threadID, false);
    }
  } catch {}
}

// ───── API ─────
async function askAPI(text, senderID) {
  const res = await axios.get(baseApiUrl, {
    params: {
      text,
      senderID,
      font: 1
    },
    timeout: 15000
  });

  return res.data?.reply || "আমি বুঝিনি 😶";
}

module.exports = {
  config: {
    name: "bot",
    aliases: ["বট"], // ❌ removed "baby" to fix conflict
    version: "12.1.0",
    author: "Milon + Fixed",
    role: 0,
    countDown: 0,
    category: "ai"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    const { body, senderID, threadID, messageID } = event;
    if (!body) return;

    const text = body.trim().toLowerCase();

    const isTrigger =
      text.startsWith("bot") ||
      text.startsWith("বট");

    // ───── STEP 2: REPLY → API ─────
    if (event.messageReply) {
      try {
        await typing(api, threadID);

        const reply = await askAPI(body, senderID);

        return api.sendMessage(
          format(reply),
          threadID,
          messageID
        );
      } catch {
        return api.sendMessage(format("API Busy!"), threadID, messageID);
      }
    }

    // ───── STEP 1: FIXED REPLY ─────
    if (!isTrigger) return;

    const rand =
      fixedReplies[Math.floor(Math.random() * fixedReplies.length)];

    return api.sendMessage(
      format(rand),
      threadID,
      messageID
    );
  }
};
