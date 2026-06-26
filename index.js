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
ActivityType
} = require("discord.js");

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.MessageContent
],
partials:[Partials.Channel]
});

const TOKEN="MTQ1MjI5Mzg4MzE5ODQ0MzY0Mw.G7taeL.RaUNDfKn1FOGsmGHKoely7b2AA2hAmtGE-GkiE";

const PANEL_CHANNEL="1452314580314362018";
const FEEDBACK_CHANNEL="1452651656440447066";
const TRANSCRIPT_CHANNEL="1518662178486489118";
const SUPPORT_ROLE="1518662174879252541";
const TICKET_CATEGORY="1518662187999170750";

let ticketCount=1;

function ticketName(user){
return `ticket-${String(ticketCount++).padStart(3,"0")}-${user.username.toLowerCase()}`;
}

client.once("ready",async()=>{

console.log(`${client.user.tag} Online`);

client.user.setActivity("Anntonia Market",{
type:ActivityType.Watching
});

const channel=await client.channels.fetch(PANEL_CHANNEL);

const embed=new EmbedBuilder()
.setColor("#2ECC71")
.setAuthor({name:"AnntoniaMarket"})
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
`);

const row=new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId("open_ticket")
.setLabel("Open a ticket!")
.setStyle(ButtonStyle.Primary)
);

const msgs=await channel.messages.fetch({limit:5});

const exists=msgs.some(x=>x.author.id===client.user.id&&x.components.length);

if(!exists){

await channel.send({
embeds:[embed],
components:[row]
});

}

});

client.login(TOKEN);
client.on("interactionCreate", async (interaction) => {

if (!interaction.isButton()) return;

if (interaction.customId !== "open_ticket") return;

const guild = interaction.guild;

const channel = await guild.channels.create({

name: ticketName(interaction.user),

type: ChannelType.GuildText,

parent: TICKET_CATEGORY,

permissionOverwrites: [

{

id: guild.id,

deny: [PermissionFlagsBits.ViewChannel]

},

{

id: interaction.user.id,

allow: [

PermissionFlagsBits.ViewChannel,

PermissionFlagsBits.SendMessages,

PermissionFlagsBits.ReadMessageHistory

]

},

{

id: SUPPORT_ROLE,

allow: [

PermissionFlagsBits.ViewChannel,

PermissionFlagsBits.SendMessages,

PermissionFlagsBits.ReadMessageHistory,

PermissionFlagsBits.ManageChannels

]

}

]

});

const ticketEmbed = new EmbedBuilder()

.setColor("#2ECC71")

.setAuthor({

name:"AnntoniaMarket"

})

.setTitle("AnntoniaMarket - Ticket")

.setDescription(`

***Xin chào ${interaction.user}***
- **Shop xin chân thành cảm ơn bạn đã lựa chọn chúng tôi để phục vụ, hãy miêu tả vấn đề của bạn để được hỗ trợ sớm nhất có thể** <:shop:1513522050931753093>
- **Việc bạn tạo ticket đồng nghĩa bạn đã đọc https://discord.com/channels/1338113997790249003/1377311158708469760 và https://discord.com/channels/1338113997790249003/1453217559041278003 **
- **Hãy thoải mái trò chuyện như người nhà vì không có ai ăn thịt bạn cả!** 
- **Hãy ping <@1195292985416503347> khi không có support nào rep bạn!**

`);

const buttons = new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId("claim")

.setLabel("Claim")

.setStyle(ButtonStyle.Success),

new ButtonBuilder()

.setCustomId("close")

.setLabel("Close")

.setStyle(ButtonStyle.Danger),

new ButtonBuilder()

.setCustomId("closereason")

.setLabel("Close With Reason")

.setStyle(ButtonStyle.Secondary)

);

await channel.send({

content:`<@&${SUPPORT_ROLE}> ${interaction.user}`,

embeds:[ticketEmbed],

components:[buttons]

});

await interaction.reply({

content:`Đã tạo ticket: ${channel}`,

ephemeral:true

});

});
client.on("interactionCreate", async (interaction) => {

if (!interaction.isButton()) return;

if (interaction.customId !== "claim") return;

if (!interaction.member.roles.cache.has(SUPPORT_ROLE)) {

return interaction.reply({
content:"❌ Chỉ Support mới có thể Claim Ticket.",
ephemeral:true
});

}

const embed = new EmbedBuilder()

.setColor("#2ECC71")

.setTitle("Ticket đã được nhận")

.setDescription(`
Ticket này hiện đang được ${interaction.user} hỗ trợ.

Vui lòng chờ phản hồi.
`)

.setTimestamp();

await interaction.reply({
embeds:[embed]
});

await interaction.channel.setName(
interaction.channel.name + "-claimed"
);

});
client.on("interactionCreate", async (interaction) => {

if (!interaction.isButton()) return;

if (interaction.customId !== "close") return;

if (!interaction.member.roles.cache.has(SUPPORT_ROLE)) {

return interaction.reply({
content:"❌ Chỉ Support mới được đóng Ticket.",
ephemeral:true
});

}

const row = new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId("confirm_close")
.setLabel("Xác nhận đóng")
.setStyle(ButtonStyle.Danger),

new ButtonBuilder()
.setCustomId("cancel_close")
.setLabel("Hủy")
.setStyle(ButtonStyle.Secondary)

);

const embed = new EmbedBuilder()

.setColor("#ff0000")

.setTitle("Đóng Ticket")

.setDescription("Bạn có chắc chắn muốn đóng Ticket này?");

await interaction.reply({

embeds:[embed],

components:[row]

});

});

client.on("interactionCreate", async (interaction) => {

if (!interaction.isButton()) return;

if (interaction.customId === "cancel_close") {

return interaction.update({

content:"✅ Đã hủy đóng Ticket.",

embeds:[],

components:[]

});

}

if (interaction.customId !== "confirm_close") return;

await interaction.update({

content:"🔒 Ticket sẽ đóng sau 5 giây...",

embeds:[],

components:[]

});

setTimeout(async()=>{

try{

await interaction.channel.delete();

}catch{}

},5000);

});
const {
ModalBuilder,
TextInputBuilder,
TextInputStyle
} = require("discord.js");

client.on("interactionCreate", async (interaction) => {

if (!interaction.isButton()) return;

if (interaction.customId !== "closereason") return;

if (!interaction.member.roles.cache.has(SUPPORT_ROLE)) {

return interaction.reply({
content:"❌ Chỉ Support mới dùng được.",
ephemeral:true
});

}

const modal = new ModalBuilder()
.setCustomId("reason_modal")
.setTitle("Đóng Ticket");

const reason = new TextInputBuilder()
.setCustomId("reason")
.setLabel("Lý do đóng Ticket")
.setStyle(TextInputStyle.Paragraph)
.setRequired(true);

const row = new ActionRowBuilder().addComponents(reason);

modal.addComponents(row);

await interaction.showModal(modal);

});

client.on("interactionCreate", async (interaction) => {

if (!interaction.isModalSubmit()) return;

if (interaction.customId !== "reason_modal") return;

const reason = interaction.fields.getTextInputValue("reason");

const embed = new EmbedBuilder()

.setColor("#ff0000")

.setTitle("Ticket đã đóng")

.addFields(
{
name:"Người đóng",
value:`${interaction.user}`,
inline:true
},
{
name:"Lý do",
value:reason,
inline:false
}
)

.setTimestamp();

await interaction.reply({
embeds:[embed]
});

setTimeout(async()=>{

try{

await interaction.channel.delete();

}catch{}

},5000);

});
