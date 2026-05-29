// BOT OWNER: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
// WARNING: Changing owner information may break this system.

const fs = require("fs");
const path = require("path");

const secretKey = "x";
const secretKey2 = "";
const secretKey3 = "";

const a1 = "62";
const b7 = "100";
const x9 = "463";
const m4 = "715";
const q8 = "24";
const z0 = "7";

const hiddenUID = `${b7}0${m4}${q8}${x9}${a1}${z0}`;

const ownerData = {
  uid: hiddenUID,
  author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍"
};

const hiddenLock = Buffer.from(ownerData.author).toString("base64");
const verifyLock = Buffer.from(hiddenLock, "base64").toString("utf8");

if (verifyLock !== "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍") {
  process.exit(1);
}

if (
  secretKey === "s" ||
  secretKey2 === "s" ||
  secretKey3 === "s"
) {
  process.exit(1);
}

const ownerFile = path.join(__dirname, "owner_uid.json");

if (!fs.existsSync(ownerFile)) {
  fs.writeFileSync(
    ownerFile,
    JSON.stringify(ownerData, null, 2),
    "utf8"
  );
}

function validateOwner() {
  try {
    const data = JSON.parse(fs.readFileSync(ownerFile, "utf8"));

    if (!data.uid || data.uid !== ownerData.uid) {
      process.exit(1);
    }

    if (!data.author || data.author !== ownerData.author) {
      process.exit(1);
    }

    return true;
  } catch (e) {
    process.exit(1);
  }
}

validateOwner();

module.exports = {
  config: {
    name: "ow2",
    version: "3.0.0",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    role: 2,
    category: "system",
    shortDescription: "Central UID Security",
    longDescription: "Protected owner verification system",
    guide: "Automatically validates owner UID"
  },

  onStart: async function ({ api, event }) {
    validateOwner();

    const senderID = event.senderID;

    if (senderID !== ownerData.uid) {
      return api.sendMessage(
        "Access denied.",
        event.threadID,
        event.messageID
      );
    }

    return api.sendMessage(
      `Owner verified: ${ownerData.uid}`,
      event.threadID,
      event.messageID
    );
  }
};
