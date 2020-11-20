const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const logs = require('discord-logs');
logs(client);
const ms = require("ms")

client.conf = {
    "token": "BOT TOKEN",
     "prefix": "PREFİX",
      "sahip": "DEVELOPER İD",
      "durum": "online",// STATUS
      "renk": `4A4A4A`,// EMBED COLOR
      "botadı": "Proxie",// BOT NAME
      "davetlinki": "https://bit.ly/proxiebot",//İNVİTE LİNK
      "desteklinki": "https://discord.com/invite/5g4jszC",// SUPPORT SERVER LİNK
      "oylinki": "https://top.gg/bot/701127077969002547/vote" // DBL VOTE LİNK
    }
    var prefix = client.conf.prefix
    client.avatarURL = "BOT LOGO"//optional




const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.cache.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.cache.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.cache.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.cache.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === client.conf.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn',function(e) {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error',function(e) {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(client.conf.token)
//---------------------------------KOMUTLAR---------------------------------\\
