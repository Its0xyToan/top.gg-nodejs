// ******************* Imports
const Discord = require("discord.js")
const DBL = require('dblapi.js');
const config = require("./config.js")

// ******************* Variables
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS'], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const dbl = new DBL(config.topgg.token, { webhookPort: 3012, webhookAuth: config.topgg.mdp });
// ******************* Code

dbl.webhook.on('ready', hook => {
   console.log(`Webhook up and running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.on('error', e => {
   console.log(`Oops! ${e}`);
})

dbl.webhook.on('vote', async vote => {
   const userID = vote.user;
  
   let channelForWebhooks;
   channelForWebhooks = await client.channels.resolve(config.channels.vote);
   if(channelForWebhooks) await channelForWebhooks.send(`Thank you to vote <@${userID}> (\`${userID}\`) ! \n-> <https://top.gg/bot/${config.bot.id}/vote> <-`).then((msg) => { msg.react("❤️")})
})

client.login(config.bot.token)
