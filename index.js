const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// Mở cổng cho Render
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log('Bot đã đăng nhập thành công!');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!thằng đú') {
        message.reply('tao nghe!');
    }

    if (message.content === '!join') {
        if (message.member.voice.channel) {
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            message.reply('Đã kết nối vào kênh Voice!');
        } else {
            message.reply('Bạn cần vào một kênh Voice trước đã!');
        }
    }
});

client.login(process.env.TOKEN);
