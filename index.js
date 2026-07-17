const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
        GatewayIntentBits.GuildVoiceStates //
      ]
  });
    client.on('messageCreate', (message) => {
    // Kiểm tra xem người nhắn có phải là bot không, nếu phải thì bỏ qua
    if (message.author.bot) return;

    // Lệnh của bạn
    if (message.content === '!thằng đú') {
        message.reply('tao nghe!');
    }

    // THÊM LỆNH JOIN VÀO ĐÂY:
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

client.once('ready', () => {
    console.log(`Bot đã đăng nhập thành công!`);
});

client.on('messageCreate', (message) => {
    // Kiểm tra xem người nhắn có phải là bot không, nếu phải thì bỏ qua
    if (message.author.bot) return;

    // Kiểm tra nội dung tin nhắn có phải là !ping không
    if (message.content === '!thằng đú') {
        // Trả lời lại Pong!
        message.reply('tao nghe!');
    }
});

// THAY ĐỔI DÒNG NÀY: Lấy Token thật từ Discord Portal
client.login(process.env.TOKEN);
