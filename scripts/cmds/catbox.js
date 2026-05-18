const axios = require("axios");
const fs = require("fs-extra");
const FormData = require("form-data");
const path = require("path");
const os = require("os");

module.exports = {
  config: {
    name: "catbox",
    aliases: ["ct"],
    version: "3.0",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    countDown: 5,
    role: 0,
    shortDescription: "Upload to Catbox",
    longDescription: "Reply image/video/audio to upload",
    category: "tools",
    guide: {
      en: "{pn} reply to media"
    }
  },

  onStart: async function ({
    api,
    event,
    message
  }) {

    try {

      const reply =
        event.messageReply;

      if (
        !reply ||
        !reply.attachments ||
        !reply.attachments.length
      ) {

        return message.reply(
          "⚠️ | Reply to image/video/audio"
        );
      }

      const attachment =
        reply.attachments[0];

      const fileUrl =
        attachment.url;

      if (!fileUrl) {

        return message.reply(
          "❌ | Media URL not found"
        );
      }

      // REACT
      api.setMessageReaction(
        "📤",
        event.messageID,
        () => {},
        true
      );

      // LOADING
      const loading =
        await message.reply(
          "🦅 | Uploading To Catbox Please Wait ⚡"
        );

      // EXTENSION
      let ext = ".jpg";

      if (
        attachment.type === "video"
      ) ext = ".mp4";

      else if (
        attachment.type === "audio"
      ) ext = ".mp3";

      else if (
        attachment.type === "animated_image"
      ) ext = ".gif";

      // TEMP FILE
      const tempPath =
        path.join(
          os.tmpdir(),
          `catbox_${Date.now()}${ext}`
        );

      // DOWNLOAD
      const response =
        await axios({
          method: "GET",
          url: fileUrl,
          responseType: "stream"
        });

      const writer =
        fs.createWriteStream(
          tempPath
        );

      response.data.pipe(writer);

      await new Promise(
        (
          resolve,
          reject
        ) => {

          writer.on(
            "finish",
            resolve
          );

          writer.on(
            "error",
            reject
          );
        }
      );

      // FORM
      const form =
        new FormData();

      form.append(
        "reqtype",
        "fileupload"
      );

      form.append(
        "fileToUpload",
        fs.createReadStream(
          tempPath
        )
      );

      // UPLOAD
      const upload =
        await axios.post(
          "https://catbox.moe/user/api.php",
          form,
          {
            headers:
              form.getHeaders(),

            maxBodyLength:
              Infinity,

            maxContentLength:
              Infinity
          }
        );

      // DELETE TEMP
      if (
        fs.existsSync(tempPath)
      ) {

        fs.unlinkSync(
          tempPath
        );
      }

      // LINK
      const link =
        upload.data
        ?.toString()
        .trim();

      if (
        !link ||
        !link.startsWith("https://")
      ) {

        throw new Error(
          "Invalid Catbox Link"
        );
      }

      // REACT SUCCESS
      api.setMessageReaction(
        "✅",
        event.messageID,
        () => {},
        true
      );

      // REMOVE LOADING
      try {

        api.unsendMessage(
          loading.messageID
        );

      } catch {}

      // SEND LINK
      return message.reply(
        `✅ | Upload Successful\n\n🔗 ${link}`
      );

    } catch (err) {

      console.log(err);

      api.setMessageReaction(
        "❌",
        event.messageID,
        () => {},
        true
      );

      return message.reply(
        "❌ | Upload failed bro, try again later"
      );
    }
  }
};
