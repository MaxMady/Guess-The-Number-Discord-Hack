const { Client, Permissions } = require("discord.js-selfbot-v13");
const chalk = require(`chalk`)
class gtn {
  constructor(token, channel) {
    this.token = token;
    this.BL = [];
    this.run = false;
    this.channel = channel;
    this.range = [0, 0];
  }
  login() {
    const client = new Client({ checkUpdate: false, readyStatus: false });

    client.on("ready", async () => {
      console.log(`Logged in to ` + chalk.red(client.user.tag) + `!`);
      console.log(`Star https://github.com/MaxMady for updated AI version`);
      client.user.setStatus("invisible");
      const channel = await client.channels.cache.get(this.channel);
      if (!channel) return console.log(`Channel ID is wrong!`);
    });
    client.login(this.token);
    this.client = client;
  }
  start() {
    this.client.on("messageCreate", async (message) => {
        if(message.content === `-bl`) console.log(this.BL)
        console.log(`?`)
      if (message.channel.id === this.channel) {
        if (this.run === false) return;
        let i = parseInt(message.content);
        if (!isNaN(i)) {
          if (i >= this.range[0] && i <= this.range[1]) {
            if (this.BL.includes(i)) return;
            this.BL.push(i);
            console.log(`Checked ${this.BL.length} numbers`);
          }
        }
      }
      if (message.content.toLowerCase().startsWith(`-start`)) {
        let args = message.content.split(" ");
        let min = parseInt(args[1]);
        let max = parseInt(args[2]);
        this.range = [min, max];
        this.run = true;
        let c = await this.client.channels.cache.get(this.channel)
        let n = 0;
        setInterval(async () => {
            let i =  Math.floor(Math.random() * (this.range[1] - this.range[0] + 1)) + this.range[0];
            n = i
            while(this.BL.includes(n)) {
                n = Math.floor(Math.random() * (this.range[1] - this.range[0] + 1)) + this.range[0];
            }
            c.send(`${n}`)
        }, 1750);
        await message.react(`💀`);
      }
      if (message.content.toLowerCase().startsWith(`-edit`)) {
        let args = message.content.split(" ");
        let min = parseInt(args[1]);
        let max = parseInt(args[2]);
        this.range = [min, max];
        message.react(`💀`)
      }
      if(message.content.toLowerCase() === `-stats`) {
        message.react(`💀`)
        message.reply('```'+`\t Guess the Number Bot by Dux\n> Commands\n• \`start\` - Start the bot | \`Args: [Minimum Range, Maximum Range]\`\n• \`edit\`  - Edit the range | \`Args: [Minimum Range, Maximum Range]\`\n• \`stop\`  - Stops the bot\n• \`stats\` - Shows this message \n\n> Stats\n• Status: ${this.run?`🟢`:`🔴`}\n• Range: ${this.range[0]} - ${this.range[1]}\n• Numbers checked: ${this.BL.length}\n\n> https://github.com/MaxMady`+'```')
      }
      if (message.content.toLowerCase().startsWith(`-stop`)) {
        this.run = false
        this.BL = []
        this.range = [0, 0];
        message.react(`💀`)
        message.reply(`Check out https://github.com/MaxMady for more selfbots!`)
      }
    });
  }
}
bot = new gtn(`token`, `channelId`)//Change this

bot.login()
bot.start()
