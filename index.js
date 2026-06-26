const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  AttachmentBuilder,
  ActivityType
} = require("discord.js");

const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

// ===== CONFIG =====
const TOKEN = "MTQ1MjI5Mzg4MzE5ODQ0MzY0Mw.GZh5RQ.LEprqnklR3prdCehwqp_zSezn3Ne7yq4L0QADI";

const FEEDBACK_CHANNEL = "1452651656440447066";
const TICKET_CHANNEL = "1452314580314362018";
const TRANSCRIPT_CHANNEL = "1518662178486489118";
const SUPPORT_ROLE = "1518662174879252541";
const TICKET_CATEGORY = "1518662187999170750";

// ==================

let counter = 1;

function ticketName(user) {
  return `ticket-${String(counter++).padStart(3, "0")}-${user.username.toLowerCase()}`;
}

function orderCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let end = "";

  for (let i = 0; i < 4; i++) {
    end += chars[Math.floor(Math.random() * chars.length)];
  }

  return `ANT${Date.now()}${end}`;
}

client.once("ready", () => {
  console.log(`${client.user.tag} đã online!`);

  client.user.setActivity("Anntonia Market", {
    type: ActivityType.Watching
  });
});
const panelEmbed = new EmbedBuilder()
.setColor("#2ECC71")
.setAuthor({
  name: "AnntoniaMarket"
})
.setTitle("AnntoniaMarket - Tickets panel")
.setDescription(`
<a:verified:1266676550925942825>**Sử Dụng Tickets Với Những Mục Đích Sau**<a:verified:1266676550925942825>

• <a:Package_Arrived1:1396386981403033700> **Mua hàng**

• <:blurpleBot:1169656236422221896>**Hỗ trợ về mặt hàng, bảo hành sản phẩm,...**

• <:58892developer:1350805877401321625>Thiết bị gặp lỗi, trục trặc cần hỗ trợ

• <:moderator:1513446698779807805>Các ticket troll sẽ bị mute 27d nên hãy suy nghĩ trước khi create

• <:shop:1513522050931753093>Hãy mô tả vấn đề ngay có thể chứ đừng tạo để "hỏi", việc này sẽ giúp các support dễ hiểu vấn đề hơn

• <:owner:1518677469945663678>**Mọi quyền trong đây thuộc về <@1195292985416503347> và <@1302568518268616775>**

<a:WumpusWavingHi:1310632445485256724>***Bọn tôi luôn hân hạnh chào đón bạn!***<a:WumpusWavingHi:1310632445485256724>
`)
.setImage("https://cdn.discordapp.com/attachments/1454148689017700423/1518866272400441365/file_00000000fbb0720984c3b64fbcd9d7de.png?ex=6a3f6e72&is=6a3e1cf2&hm=f564bcc103f263bf1bf5c5e56307b16f9bb3f38511699ca73c72103c83af2100&")
.setFooter({
  text: "Powered by Anntonia Market"
});
