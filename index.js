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
  AttachmentBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

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

// ================= CONFIG =================

const TOKEN = "MTQ1MjI5Mzg4MzE5ODQ0MzY0Mw.GZh5RQ.LEprqnklR3prdCehwqp_zSezn3Ne7yq4L0QADI";

const FEEDBACK_CHANNEL = "1452651656440447066";
const TICKET_CHANNEL = "1452314580314362018";
const TRANSCRIPT_CHANNEL = "1518662178486489118";
const SUPPORT_ROLE = "1518662174879252541";
const TICKET_CATEGORY = "1518662187999170750";

// =========================================

let counter = 1;

function ticketName(user){
    return `ticket-${String(counter++).padStart(3,"0")}-${user.username.toLowerCase()}`;
}

function orderCode(){

    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let end="";

    for(let i=0;i<4;i++)
        end+=chars[Math.floor(Math.random()*chars.length)];

    return `ANT${Date.now()}${end}`;
}

client.once("ready",()=>{

console.log(`${client.user.tag} Online`);

});
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

const TOKEN = "MTQ1MjI5Mzg4MzE5ODQ0MzY0Mw.GZh5RQ.LEprqnklR3prdCehwqp_zSezn3Ne7yq4L0QADI";

client.once("ready", () => {
  console.log(`${client.user.tag} đã online!`);

  client.user.setActivity("Anntonia Market", {
    type: 3 // Đang xem
  });
});

client.login(TOKEN);

