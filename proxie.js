const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMTEyNzA3Nzk2OTAwMjU0NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjAzNTg3MDU5fQ.CBYXQlpFDTtB0ceT_WLcdF-NthEyNcBN-Dvn4Erorfk', client );
client.queue = new Map()
const logs = require('discord-logs');
logs(client);
const ms = require("ms")

client.conf = {
    "token": "NzAxMTI3MDc3OTY5MDAyNTQ3.Xps9eQ.UX89oxRjbZjXowzl_K08Zxh7l_M",
     "prefix": "p!",
      "sahip": "588414969364873236",
      "oynuyor": "p!yardım | p!yenilikler",
      "durum": "online",// durumu
      "renk": `4A4A4A`,
      "botadı": "Proxie",
      "davetlinki": "https://bit.ly/proxiebot",
      "sunuculinki": "https://bit.ly/tekyurekfunn",
      "desteklinki": "https://discord.com/invite/5g4jszC",
      "apikey": "AIzaSyAr7LaiwC2BXl6pHqBh7-fN26-2X38j488",
      "oylinki": "https://top.gg/bot/701127077969002547/vote",
      "ameapi": "7b32424cb42115243eabba63d61278cfe6308e0ba0ee964ce31a88e635be671131033d156caf78a0c2b994c55357bf3787b7cb798d266938c99e5628410e5032",
      "destekekibi": ["588414969364873236","481522576569532436","405086344344502282","378913166098169861"]
    }
    var prefix = client.conf.prefix
    client.avatarURL = `https://cdn.discordapp.com/attachments/693878967844864008/774282028048842752/proxielogo.png`

client.en = require("./en.js");

client.tr = require("./tr.js");




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

//---------------------------------KOMUTLAR---------------------------------\\



const dblhook = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMTEyNzA3Nzk2OTAwMjU0NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjAzNTg3MDU5fQ.CBYXQlpFDTtB0ceT_WLcdF-NthEyNcBN-Dvn4Erorfk", { webhookPort: 5000, webhookAuth: 'beratmice123' });
dblhook.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dblhook.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

/// SA - AS SİSTEMİ

client.on("message", async msg => {
  if(!msg.guild) return;

    const selam = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setDescription(`<a:kirmizi:710454822129893416> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:kirmizi:710454822129893416>`)
    const hg = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setDescription(`<a:kirmizi:710454822129893416> Nasılsın? \`${msg.author.tag}\` <a:kirmizi:710454822129893416>`)
    const i = await db.fetch(`ssaass_${msg.guild.id}`);
      if (i == 'acik') {
        if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'sea') {
        
          return msg.channel.send(selam).then(hgmesaj => {
            setTimeout(() => {
                hgmesaj.delete()
              }, 5000);
      })
    }
  }
})
  ///// SA - AS SİSTEMİ
  // GÜNAYDIN SİSTEMİ
      client.on("message", async msg => {
        if(!msg.guild) return;
      
        const selam = new Discord.MessageEmbed()
        .setColor(client.conf.renk)
        .setDescription(`<a:kirmizi:710454822129893416> \`${msg.author.tag}\` Sana da günaydın kuşum. <a:kirmizi:710454822129893416>`)
          const i = await db.fetch(`gunaydın_${msg.guild.id}`);
            if (i == 'acik') {
              if (msg.content.toLowerCase() == 'gunaydın' || msg.content.toLowerCase() == 'günaydın') {
                  try {
        
                          return msg.channel.send(selam).then(x => x.delete({timeout: 5000}))
                  } catch(err) {
                    console.log(err);
                  }
              }
            }
            else if (i == 'kapali') {
            
            }
            if (!i) return;
        
            });
  // SUNUCU PANEL SİSTEMİ


  client.on("guildMemberAdd", async(member) => {
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').cache.size}`)
        botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).cache.size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })
  //DEVTR
  client.on("guildMemberRemove", async(member) => {
    if(!member.guild) return
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.
      cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })
  
  client.on("voiceStateUpdate", async(member) => {
    if(!member.guild) return
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })
  client.on("guildBanAdd", async(member) => {
    if(!member.guild) return
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.
      cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })
  
  // SUNUCU PANEL SİSTEMİ BİTİŞ
  // DESTEK SİSTEMİ
  client.on("message", async msg => {
    if (!msg.guild) return;
   
    let prefix;
    
  if (db.has(`prefix_${msg.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${msg.guild.id}`)
  }
    
  if (db.has(`prefix_${msg.guild.id}`) === false) {
    prefix = client.conf.prefix
  }
   
    if (!msg.guild.channels.cache.get(db.fetch(`destekK_${msg.guild.id}`))) return;
    var s = "tr";
    var r = "Destek Ekibi";
    var k = "destek-kanalı";
    if (db.has(`dil_${msg.guild.id}`) === true) {
      var s = "en";
      var r = "Support Team";
      var k = "support-channel";
    }
    const dil = s;
   
    let rol = "";
    let kanal = "";
   
    if (db.has(`destekK_${msg.guild.id}`) === true) {
      kanal = msg.guild.channels.cache.get(db.fetch(`destekK_${msg.guild.id}`)).name;
    }
   
    if (db.has(`destekK_${msg.guild.id}`) === false) {
      kanal = k;
    }
   
    if (db.has(`destekR_${msg.guild.id}`) === true) {
      rol = msg.guild.roles.cache.get(db.fetch(`destekR_${msg.guild.id}`));
    }
   
    if (db.has(`destekR_${msg.guild.id}`) === false) {
      rol = r;
    }
   
    const reason = msg.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (msg.channel.name == kanal) {
      if (msg.author.bot) return;
      /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
              m2.delete(5000)});*/
      if (
        msg.guild.channels.cache.find(
          c =>
            c.name ===
            `yardım-${msg.author.id}`
        )
      ) {
        msg.delete()
        msg.author.send(
          `**{kisi}** bu sunucuda zaten açık bir Destek Talebin bulunuyor bulunan talebin kapanmadan yeni açamazsın! \nBulunan Destek Talebin: {kanal}`
            .replace("{kisi}", msg.author.tag)
            .replace(
              "{kanal}",
              `${msg.guild.channels.cache.get(
                msg.guild.channels.cache.find(
                  c =>
                    c.name ===
                    `yardım-${msg.author.id}`
                ).id
              )}`
            )
        );
        msg.guild.channels
          .cache.find(
            c =>
              c.name ===
              `yardım-${msg.author.id}`
          )
          .send(
            `**{kisi}** adlı kullanıcı zaten açık bir Destek Talebi (bu kanal) olduğu halde \`{sebep}\` sebebi ile tekrar Destek Talebi açmaya çalışıyor!`
              .replace("{kisi}", msg.author.tag)
              .replace("{sebep}", msg.content)
          );  
   
        msg.delete();
        return;
      }
      if (
        msg.guild.channels.cache.find(c => c.name === `Destek Talepleri`)
      ) {
        msg.guild
          .channels.create(
            `yardım-${msg.author.id}`, {type: 'text', reason: `${msg.author.tag} için destek kanalı oluşturuldu!`}
          )
          .then(c => {
            const category = msg.guild.channels.cache.find(
              c => c.name === `Destek Talepleri`
            );
            c.setParent(category.id);
            let role = msg.guild.roles.cache.find(r => r.name === rol.name);
            let role2 = msg.guild.roles.cache.find(r => r.name === "@everyone");
            c.overwritePermissions([
              {
                id: role2.id,
                deny: ['VIEW_CHANNEL'],
              },
              {
                id: role.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
              },
              {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
              },
            ])
  /*          msg.guild
            .channels.create(
              `sesli-yardım-${msg.author.discriminator}`,
              "voice"
            )
            .then(c => {
              const category = msg.guild.channels.find(
                c => c.name === `Destek Talepleri`
              );
              c.setParent(category.id);
              let role = msg.guild.roles.find(r => r.name === rol.name);
              let role2 = msg.guild.roles.find(r => r.name === "@everyone");
              c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });
              c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
              });
              c.overwritePermissions(msg.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              })
            })*/
            const embed = new Discord.MessageEmbed()
              .setColor(client.conf.renk)
              .setAuthor(
                `${client.user.username} | Destek Sistemi`,
                client.user.avatarURL({dynamic: true})
              )
              .setTitle(`_Merhaba ${msg.author.username}!_`)
              .addField(
                `» Destek Talebi Hakkında Bilgilendirme «`,
                `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep kapat\` yazabilirsiniz`
              )
              .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
              .addField(
                `» Destek Talebini Açan Kullanıcı «`,
                `<@${msg.author.id}>`,
                true
              )
              .setFooter(
                `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
               msg.guild.iconURL()
             );
           c.send(embed);
           c.send(
             `** @here | Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
           );
           msg.delete();
         })
         .catch(console.error);
     }
    }
   
   if (msg.channel.name == kanal) {
     if (
       !msg.guild.channels.cache.find(
         c => c.name === `Destek Talepleri`
       )
     ) {
       msg.guild
         .channels.create(`Destek Talepleri`, {type: 'category', reason: 'Destek sistemi'})
         .then(category => {
           category.setPosition(1);
           let every = msg.guild.roles.cache.find(c => c.name === "@everyone");
           category.overwritePermissions([
            {
              id: every.id,
              deny: ['SEND_MESSAGES',`READ_MESSAGE_HISTORY`,`VIEW_CHANNEL`],
            },
          ])
           msg.guild
             .channels.create(
               `yardım-${msg.author.id}`, {type: 'text'}
             )
             .then(c => {
               c.setParent(category.id);
               let role = msg.guild.roles.cache.find(c => c.name === rol.name);
               let role2 = msg.guild.roles.cache.find(c => c.name === "@everyone");
               c.overwritePermissions([
                {
                  id: role.id,
                  allow: ['SEND_MESSAGES',`READ_MESSAGE_HISTORY`,`VIEW_CHANNEL`],
                },
                {
                  id: role2.id,
                  deny: ['SEND_MESSAGES',`READ_MESSAGE_HISTORY`,`VIEW_CHANNEL`],
                },
                {
                  id: msg.author.id,
                  allow: ['SEND_MESSAGES',`READ_MESSAGE_HISTORY`,`VIEW_CHANNEL`],
                }
              ])
   
               const embed = new Discord.MessageEmbed()
                 .setColor(client.conf.renk)
                 .setAuthor(
                   `${client.user.username} | Destek Sistemi`,
                   client.user.avatarURL({dynamic: true})
                 )
                 .setTitle(`_Merhaba ${msg.author.username}!_`)
                 .addField(
                   `» Destek Talebi Hakkında Bilgilendirme «`,
                   `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep kapat\` yazabilirsiniz`
                 )
                 .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
                 .addField(
                   `» Destek Talebini Açan Kullanıcı «`,
                   `<@${msg.author.id}>`,
                   true
                 )
                 .setFooter(
                   `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
                    msg.guild.iconURL
                  );
                c.send({ embed: embed });
                c.send(
                  `** @here | Destek Talebi ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
                );
                msg.delete();
              })
              .catch(console.error);
          });
      }
    }
  });
   
  client.on("message", async message => {
    if(!message.guild) return;
    if (!message.guild.channels.cache.get(db.fetch(`destekK_${message.guild.id}`)))
      return;
   
    if (!message.guild) return;
   
    let prefix;
    
  if (db.has(`prefix_${message.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${message.guild.id}`)
  }
    
  if (db.has(`prefix_${message.guild.id}`) === false) {
    prefix = client.conf.prefix
  }
   
    var s = "tr";
    var r = "Destek Ekibi";
    if (db.has(`dil_${message.guild.id}`) === true) {
      var s = "en";
      var r = "Support Team";
    }
    const dil = s;
   
    if (message.content.toLowerCase().startsWith(prefix + `talep kapat`)) {
      if (!message.channel.name.startsWith(`yardım-`))
        return message.channel.send(
          `Bu komut sadece Destek Talebi kanallarında kullanılabilir.`
        );
     //   let channel = message.guild.channels.get()
      const embed = new Discord.MessageEmbed()
        .setColor(client.conf.renk)
        .setAuthor(`Destek Talebi Kapatma İşlemi!`)
        .setDescription(
          `Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`
        )
        .setFooter(
          `${client.user.username} | Destek Sistemi`,
          client.user.avatarURL({dynamic: true})
        );
      message.channel.send({ embed }).then(m => {
        message.channel
          .awaitMessages(response => response.content === "evet", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit("Destek talebi kapatma isteği zaman aşımına uğradı.").then(
              m2 => {
                m2.delete();
              },
              3000
            );
          });
      });
    }
  });
  // DEDSTEK SİSTEMİ BİTİŞ
  // LOG SİSTEMİ 
  
  client.on("guildMemberAdd", member => {
    if(!member.guild) return;
    //if (member.author.bot) return;
  
    // if (!logA[member.guild.id]) return;
  
    var user = member.user;
    var tarih = "";
    if (moment(user.createdAt).format("MM") === "01") {
      var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "02") {
      var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "03") {
      var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "04") {
      var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "05") {
      var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "06") {
      var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "07") {
      var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "08") {
      var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "09") {
      var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "10") {
      var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "11") {
      var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "12") {
      var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }


  
    //var kanal = member.guild.channels.get(logA[member.guild.id].log);

    if (db.has(`log_${member.guild.id}`) === false) return;
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    var DURATION    = require("humanize-duration")
    var TIMESTAMP   = kurulus
    var RESULT  = DURATION(TIMESTAMP, { language: "tr", round: true, conjunction: " , ", serialComma: false })
    var kanal = member.guild.channels.cache.get(db.fetch(`log_${member.guild.id}`));
    if (!kanal) return;
    var kontrol;
    if (kurulus > 1296000000) kontrol = `Güvenli`;
    if (kurulus < 1296000000) kontrol = `Güvensiz`;
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL({dynamic: true}))
      .addField("Kullanıcı Tag", member.user.tag, true)
      .addField("ID", member.user.id, true)
      .addField("Discord Kayıt Tarihi", tarih, true)
      .addField(`Güvenlilik: ${kontrol}`, RESULT ,true)
      .setThumbnail(member.user.avatarURL({dynamic: true})
      .replace(`webp`, `png`));
    kanal.send(embed);
  });
  
  client.on("guildMemberRemove", async member => {
    if(!member.guild) return;
    //if (member.author.bot) return;
  
    // if (!logA[member.guild.id]) return;
  
    var user = member.user;
    var tarih = "";
    if (moment(user.createdAt).format("MM") === "01") {
      var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "02") {
      var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "03") {
      var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "04") {
      var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "05") {
      var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "06") {
      var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "07") {
      var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "08") {
      var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "09") {
      var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "10") {
      var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "11") {
      var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "12") {
      var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
  
    //var kanal = member.guild.channels.get(logA[member.guild.id].log);
    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
    });
    const fetchedLogs2 = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_BAN_ADD',
    });
    const kickLog = fetchedLogs.entries.first();
    const banLog = fetchedLogs2.entries.first();
    const { executor, target } = kickLog;
    if (db.has(`log_${member.guild.id}`) === false) return;
    if (target.id === member.id) {
      const kurulus = new Date().getTime() - user.createdAt.getTime();
      var DURATION    = require("humanize-duration")
      var TIMESTAMP   = kurulus
      var RESULT  = DURATION(TIMESTAMP, { language: "tr", round: true, conjunction: " , ", serialComma: false })
      var kanal = member.guild.channels.cache.get(db.fetch(`log_${member.guild.id}`));
      if (!kanal) return;
      var kontrol;
      if (kurulus > 1296000000) kontrol = `Güvenli`;
      if (kurulus < 1296000000) kontrol = `Güvensiz`;
      const embed = new Discord.MessageEmbed()
        .setColor(client.conf.renk)
        .setAuthor(`Sunucudan Bir Kullanıcı Atıldı!`, member.user.avatarURL({dynamic: true}))
        .addField("Kullanıcı Tag", member.user.tag, true)
        .addField("ID", member.user.id, true)
        .addField("Discord Kayıt Tarihi", tarih, true)
        .addField(`Güvenlilik: ${kontrol}`, RESULT ,true)
        .addField(`Atan:`, executor)
        .setThumbnail(member.user.avatarURL({dynamic: true})
        .replace(`webp`,`png`));
      return kanal.send(embed);

    }

    if (banLog.target.id === member.id) {
      const kurulus = new Date().getTime() - user.createdAt.getTime();
      var DURATION    = require("humanize-duration")
      var TIMESTAMP   = kurulus
      var RESULT  = DURATION(TIMESTAMP, { language: "tr", round: true, conjunction: " , ", serialComma: false })
      var kanal = member.guild.channels.cache.get(db.fetch(`log_${member.guild.id}`));
      if (!kanal) return;
      var kontrol;
      if (kurulus > 1296000000) kontrol = `Güvenli`;
      if (kurulus < 1296000000) kontrol = `Güvensiz`;
      const embed = new Discord.MessageEmbed()
        .setColor(client.conf.renk)
        .setAuthor(`Sunucudan Bir Kullanıcı Yasaklandı!`, member.user.avatarURL({dynamic: true}))
        .addField("Kullanıcı Tag", member.user.tag, true)
        .addField("ID", member.user.id, true)
        .addField("Discord Kayıt Tarihi", tarih, true)
        .addField(`Güvenlilik: ${kontrol}`, RESULT ,true)
        .addField(`Yasaklayan:`, banLog.executor)
        .setThumbnail(member.user.avatarURL({dynamic: true})
        .replace(`webp`,`png`));
      return kanal.send(embed);

    }


    if(kickLog) {
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    var DURATION    = require("humanize-duration")
    var TIMESTAMP   = kurulus
    var RESULT  = DURATION(TIMESTAMP, { language: "tr", round: true, conjunction: " , ", serialComma: false })
    var kanal = member.guild.channels.cache.get(db.fetch(`log_${member.guild.id}`));
    if (!kanal) return;
    var kontrol;
    if (kurulus > 1296000000) kontrol = `Güvenli`;
    if (kurulus < 1296000000) kontrol = `Güvensiz`;
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL({dynamic: true}))
      .addField("Kullanıcı Tag", member.user.tag, true)
      .addField("ID", member.user.id, true)
      .addField("Discord Kayıt Tarihi", tarih, true)
      .addField(`Güvenlilik: `, RESULT ,true)
      .setThumbnail(member.user.avatarURL({dynamic: true})
      .replace(`webp`,`png`));
    return kanal.send(embed);

    }
  });
  
  client.on("messageDelete", async message => {
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });
    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;
    if(!message.guild) return;
    if (message. attachments.size > 0) return;
    if (message.author.bot) return;
  
    db.set(`atan_${message.channel.id}`, `${message.author.tag}`);
    db.set(`mesaj_${message.channel.id}`, message.content);
  
    //if (!logA[message.guild.id]) return;
  
    var user = message.author;
  
    //var kanal = message.guild.channels.get(logA[message.guild.id].log);
  
    if (db.has(`log_${message.guild.id}`) === false) return;
  
    var kanal = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`));
    if (!kanal) return;
  
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL({dynamic: true}))
      .addField("Kullanıcı Tag", message.author.tag, true)
      .addField("ID", message.author.id, true)
      .addField("Silinen Mesaj",message.content)
      .addField(`Silen kullanıcı:`, executor, true)
      .setThumbnail(message.author.avatarURL({dynamic: true})
      .replace(`webp`, `png`));
    kanal.send(embed);
  });
  
  client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (oldMsg.author.bot) return;
    if (oldMsg. attachments.size > 0) return;
    // if (!logA[oldMsg.guild.id]) return;
  
    var user = oldMsg.author;
  
    //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);
    if(!oldMsg.guild) return;
    if (db.has(`log_${oldMsg.guild.id}`) === false) return;
  
    var kanal = oldMsg.guild.channels.cache.get(db.fetch(`log_${oldMsg.guild.id}`));
    if (!kanal) return;
  
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL({dynamic: true}))
      .addField("Kullanıcı Tag", oldMsg.author.tag, true)
      .addField("ID", oldMsg.author.id, true)
      .addField("Eski Mesaj",oldMsg.content)
      .addField("Yeni Mesaj",newMsg.content)
      .setThumbnail(oldMsg.author.avatarURL({dynamic: true})
      .replace(`webp`, `png`));
    kanal.send(embed);
  });
  
  client.on("roleCreate", async role => {
    // if (!logA[role.guild.id]) return;
    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: 'ROLE_CREATE',
    });
    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;
    if (db.has(`log_${role.guild.id}`) === false) return;
  
    var kanal = role.guild.channels.cache.get(db.fetch(`log_${role.guild.id}`));
    if (!kanal) return;

    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
      .addField("Rol", `\`${role.name}\``, true)
      .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
      .addField(`Rol id`, executor, true)
      .addField(`Rolü oluşturan`, executor)
    kanal.send(embed);
  });
  
  client.on("roleDelete", async role => {
    // if (!logA[role.guild.id]) return;
  	const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: 'ROLE_DELETE',
    });
    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;
    if (db.has(`log_${role.guild.id}`) === false) return;
  
    var kanal = role.guild.channels.cache.get(db.fetch(`log_${role.guild.id}`));
    if (!kanal) return;
  
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
      .addField("Rol", `\`${role.name}\``, true)
      .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
      .addField(`Rol id`, role.id)
      .addField(`Rolü silen`, executor)
    kanal.send(embed);
  });
  
  client.on("roleUpdate", async role => {
    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: 'ROLE_UPDATE',
    });
    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;
    // if (!logA[role.guild.id]) return;
  
    if (db.has(`log_${role.guild.id}`) === false) return;
  
    var kanal = role.guild.channels.cache.get(db.fetch(`log_${role.guild.id}`));
    if (!kanal) return;
  
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
      .addField("Rol", `\`${role.name}\``, true)
      .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
      .addField(`Rol id`, role.id)
      .addField(`Rolü güncelleyen`, executor)
    kanal.send(embed);
  });
  
  // LOG SİSTEMİ BİTİŞ 
  
  // KÜFÜR ENGELLEME SİSTEMİ
  
  client.on('message', async msg => {//dawn
    if(!msg.guild) return;
    const filtre = await db.fetch(`${msg.guild.id}.kufur`)
       if (filtre) {
           const kufurler = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","OC","0C","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"];
           let kelimeler = msg.content.toLowerCase().split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(küfür => küfür === kelime))  {
             try {   
               if (!msg.member.hasPermission("ADMINISTRATOR")) {
                     msg.delete();
                     let aktif = new Discord.MessageEmbed()
                     .setDescription(`${msg.author} bu sunucuda küfür edemessin!`)
                     .setAuthor(client.conf.botadı)
                     .setColor(client.conf.renk)
                         return msg.channel.send(aktif).then(x => x.delete({timeout: 5000}))
             }              
             } catch(err) {
               console.log(err);
             }
           }
       })
      }
       if (!filtre) return;
   });
   client.on("messageUpdate", (oldMessage, newMessage) => {
    if(!newMessage.guild) return;
     
    const filtre = db.fetch(`${newMessage.guild.id}.kufur`)
       if (filtre) {//dawn
           const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",`amına`,`am`,`sikiş`,`siki`,`sikiyim`,`yarrak`,`yarak`,`yaram`,`amın`];
           let kelimeler = newMessage.content.toLowerCase().split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(küfür => küfür === kelime))  {
             try {   
               if (!msg.member.hasPermission("ADMINISTRATOR")) { //buradaki izni editleyebilirsiniz
                     msg.delete();
                     let aktif = new Discord.MessageEmbed()
                     .setDescription(`${newMessage.author} bu sunucuda küfür edemessin!`)
                     .setAuthor(client.conf.botadı)
                     .setColor(client.conf.renk)
                         return msg.channel.send(aktif).then(x => x.delete({timeout: 5000}))
             }              
             } catch(err) {
               console.log(err);
             }
           }
       })
      } 
       if (!filtre) return;
   });
  
  // KÜFÜR ENGELLEME SİSTEMİ BİTİŞ 
  
  
  // LİNK ENGELLEME SİSTEMİ
  
           client.on("message", async msg => {
            if(!msg.guild) return;
            
            const i = await db.fetch(`${msg.guild.id}.reklam`)
               if (i) {
                   const kufur = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",".gg",`invite`,`http`,`https`];
                   if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
                     try {
                       if (!msg.member.hasPermission("ADMINISTRATOR")) {
                             msg.delete();
                             let aktif = new Discord.MessageEmbed()
                             .setDescription(`${msg.author} bu sunucuda reklam yapamazsın!`)
                             .setAuthor(client.conf.botadı)
                             .setColor(client.conf.renk)
                         return msg.channel.send(aktif).then(x => x.delete({timeout: 5000}))
                       }              
                     } catch(err) {
                       console.log(err);
                     }
                   }
               }
               if (!i) return;
           });
           
           client.on("messageUpdate", (oldMessage, newMessage) => {
            if(!newMessage.guild) return;
             
            const i = db.fetch(`${newMessage.guild.id}.reklam`)
               if (i) {
                   const kufur = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",".gg",`invite`,`http`,`https`];
                   if (kufur.some(word => newMessage.content.toLowerCase().includes(word))) {
                     try {
                       if (!newMessage.member.hasPermission("ADMINISTRATOR")) {
                             newMessage.delete();
                             let aktif = new Discord.MessageEmbed()
                             .setDescription(`${newMessage.author} bu sunucuda reklam yapamazsın!`)
                             .setAuthor(client.conf.botadı)
                             .setColor(client.conf.renk)
                         return newMessage.channel.send(aktif).then(x => x.delete({timeout: 5000}))
                       }              
                     } catch(err) {
                       console.log(err);
                     }
                   }
               }
               if (!i) return;
           });
  // GİRİŞ ÇIKIŞ SİSTEMİ
  client.on("guildMemberAdd", async member => {
    if(!member.guild) return;
    //if (member.author.bot) return;
  
    // if (!logA[member.guild.id]) return;
  
    var user = member.user;
    var tarih = "";
    if (moment(user.createdAt).format("MM") === "01") {
      var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "02") {
      var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "03") {
      var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "04") {
      var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "05") {
      var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "06") {
      var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "07") {
      var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "08") {
      var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "09") {
      var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "10") {
      var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "11") {
      var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "12") {
      var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
  
  
    //var kanal = member.guild.channels.get(logA[member.guild.id].log);
  
    if (db.has(`gc_${member.guild.id}`) === false) return;
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    var DURATION    = require("humanize-duration")
    var TIMESTAMP   = kurulus
    var RESULT  = DURATION(TIMESTAMP, { language: "tr", round: true, conjunction: " , ", serialComma: false })
    var kanal = member.guild.channels.cache.get(db.fetch(`gc_${member.guild.id}`));
    if (!kanal) return;
    var kontrol;
    if (kurulus > 1296000000) kontrol = `Güvenli`;
    if (kurulus < 1296000000) kontrol = `Güvensiz`;
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL({dynamic: true}))
      .addField("Kullanıcı Tag", member.user.tag, true)
      .addField("ID", member.user.id, true)
      .addField("Discord Kayıt Tarihi", tarih, true)
      .addField(`Güvenlilik: ${kontrol}`, RESULT ,true)
      .setThumbnail(member.user.avatarURL({dynamic: true})
      .replace(`webp`, `png`));
    kanal.send(embed);
  });
  
  client.on("guildMemberRemove", async member => {
    if(!member.guild) return;
    //if (member.author.bot) return;
  
    // if (!logA[member.guild.id]) return;
  
    var user = member.user;
    var tarih = "";
    if (moment(user.createdAt).format("MM") === "01") {
      var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "02") {
      var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "03") {
      var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "04") {
      var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "05") {
      var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "06") {
      var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "07") {
      var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "08") {
      var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "09") {
      var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "10") {
      var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "11") {
      var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(user.createdAt).format("MM") === "12") {
      var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
        user.createdAt
      ).format("YYYY HH:mm:ss")} `;
    }
    //var kanal = member.guild.channels.get(logA[member.guild.id].log);
  
    if (db.has(`gc_${member.guild.id}`) === false) return;
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    var DURATION    = require("humanize-duration")
    var TIMESTAMP   = kurulus
    var RESULT  = DURATION(TIMESTAMP, { language: "tr", round: true, conjunction: " , ", serialComma: false })
    var kanal = member.guild.channels.cache.get(db.fetch(`gc_${member.guild.id}`));
    if (!kanal) return;
    var kontrol;
    if (kurulus > 1296000000) kontrol = `Güvenli`;
    if (kurulus < 1296000000) kontrol = `Güvensiz`;
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL({dynamic: true}))
      .addField("Kullanıcı Tag", member.user.tag, true)
      .addField("ID", member.user.id, true)
      .addField("Discord Kayıt Tarihi", tarih, true)
      .addField(`Güvenlilik: ${kontrol}`, RESULT ,true)
      .setThumbnail(member.user.avatarURL({dynamic: true})
      .replace(`webp`, `png`));
    kanal.send(embed);
  });
  // GİRİŞ ÇIKIŞ SİSTEMİ BİTİŞ
  // EVENTS TEST 
  client.on("message", async message => {
    if(!message.guild) return;
    if (message.content === "p!fake") {
      const yetki = new Discord.MessageEmbed()
      .setAuthor(client.conf.botadı, client.avatarURL)
      .setColor(client.conf.renk)
      .setDescription(`Sanırım sen Berat değilsin!`)
      if(message.author.id !== client.conf.sahip && !client.conf.destekekibi.includes(message.author.id)) message.channel.send(yetki);
    message.react(`✅`)
      client.emit(
        "guildMemberAdd",
        message.member || (await message.guild.fetchMember(message.author))
      );
    }
  });
  client.on("message", async message => {
    if(!message.guild) return;
    if (message.content === "p!feyk") {
      const yetki = new Discord.MessageEmbed()
      .setAuthor(client.conf.botadı, client.avatarURL)
      .setColor(client.conf.renk)
      .setDescription(`Sanırım sen Berat değilsin!`)
      if(message.author.id !== client.conf.sahip && !client.conf.destekekibi.includes(message.author.id)) return message.channel.send(yetki);
    message.react(`✅`)
      client.emit(
        "guildMemberRemove",
        message.member || (await message.guild.fetchMember(message.author))
      );
    }
  });
  
  // EVENT BİTİŞ
  
  // KAYIT SİSTEMİ 
  
  client.on("guildMemberAdd", async member => {
    if (!member.guild) return;
    let mesaj = db.fetch(`ksistemi_${member.guild.id}`);
      if (!mesaj) {
      return;
    }
  if (mesaj) {
    let prefix;
    
  if (db.has(`prefix_${member.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${member.guild.id}`)
  }
    
  if (db.has(`prefix_${member.guild.id}`) === false) {
    prefix = client.conf.prefix
  }
    if (db.has(`kaK_${member.guild.id}`) === false) return;
  
    const kaK = await db.fetch(`kaK_${member.guild.id}`);
    if (!kaK) return;
  
    const giris = db.fetch(`kayıtM_${member.guild.id}`);
    if (!member.guild.channels.cache.get(kaK)) return;
    if (db.has(`üyelikk_${member.id}`)) {
      member.guild.channels.cache.get(kaK).send(new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setDescription(
        db.has(`kayıtM_${member.guild.id}`)
          ? giris
              .replace("{kullanıcı}", `<@${member.user.id}>`)
              .replace("{user}", `<@${member.user.id}>`)
              .replace("{sunucu}", `**${member.guild.name}**`)
              .replace("{kişisayısı}", `**${member.guild.members.size}**`)
          : `<@${member.user.id}> Kayıta Hazır! \`${prefix}kayıt-mesaj-ayarla\` komutu ile mesajı değiştirilebilir.`
      ))
      member.guild.channels.cache.get(kaK).send(`<@${member.user.id}>`).then(member => member.delete());
    } else
      member.guild.channels.cache.get(kaK).send(new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setDescription(
        db.has(`kayıtM_${member.guild.id}`)
          ? giris
              .replace("{kullanıcı}", `<@${member.user.id}>`)
              .replace("{user}", `<@${member.user.id}>`)
              .replace("{sunucu}", `**${member.guild.name}**`)
              .replace("{kişisayısı}", `**${member.guild.members.size}**`)
          : `<@${member.user.id}> Kayıta Hazır! \`${prefix}kayıt-mesaj-ayarla\` komutu ile mesajı değiştirilebilir.`
      ))
  }
  });
  // KAYIT SİSTEMİ BİTİŞ
  
  // SUSTURMA SİSTEMİ
  client.on('guildMemberAdd', async(member) => {
    const ms = require("ms");
    if(!member.guild) return;
    let mute = member.guild.roles.cache.find(r => r.id === db.fetch(`cezalıR_${member.id}`));
   let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
   let süre = db.fetch(`süre_${member.id + member.guild.id}`)
   if (!mutelimi) return;
   if (mutelimi == "muteli") {
   member.roles.add(mute.id)
    
   member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
    setTimeout(function(){
       // msg.channel.send(`<@${user.id}> Muten açıldı.`)
   db.delete(`muteli_${member.guild.id + member.id}`)
       member.send(`<@${member.id}> Muten açıldı.`)
       member.removeRole(mute.id);
      }, ms(süre));
   }
   })
   // susturma sistemi bitiş
  // sayaç sistemi
  client.on("message", async message => {
    if(!message.guild) return;
    let sayackanal = db.fetch(`sayacK_${message.guild.id}`)
   let sayacsayi = db.fetch(`sayacS_${message.guild.id}`)
   let sayackanalı = message.guild.channels.cache.get(sayackanal);
   if(sayackanal) {
       if(sayacsayi <= message.guild.members.size) {
           const embed = new Discord.MessageEmbed()
               .setDescription(`Tebrikler, başarılı bir şekilde ${sayacsayi} kullanıcıya ulaştık!`)
               .setColor(client.conf.renk)
               .setTimestamp()
           sayackanalı.send({embed})
db.delete(`sayacK_${message.guild.id}`)
db.delete(`sayacS_${message.guild.id}`)
       }
   }
 })
 client.on("guildMemberRemove", async member => {
   if(!member.guild) return;
let sayackanal = db.fetch(`sayacK_${member.guild.id}`)
let sayacsayi = db.fetch(`sayacS_${member.guild.id}`)
let sayackanalı = member.guild.channels.cache.get(sayackanal);
 if (sayackanal) {
 try {

   sayackanalı.send(new Discord.MessageEmbed()
   .setColor(client.conf.renk)
   .setDescription(`<a:kristal:710462661158240356> ${member.user.tag}, aramızdan ayrıldı! **${sayacsayi}** kişi olmamıza **${sayacsayi - member.guild.memberCount}** kişi kaldı!` ));
 } catch (e) {
   return 
 }
}
 });
 
 client.on("guildMemberAdd", async member => {
   if(!member.guild) return;
   let sayackanal = db.fetch(`sayacK_${member.guild.id}`)
   let sayacsayi = db.fetch(`sayacS_${member.guild.id}`)
   let sayackanalı = member.guild.channels.cache.get(sayackanal);
 
 if (sayackanal) {
 
 try {
   sayackanalı.send(new Discord.MessageEmbed()
   .setColor(client.conf.renk)
   .setDescription(`<a:yesil:701521851498627202> ${member.user.tag}, aramıza katıldı **${sayacsayi}** kişi olmamıza **${sayacsayi - member.guild.memberCount}** kişi kaldı!` ));
 } catch (e) {
   return 
 }
}
 });
  // sayaç sistemi bitiş


  // OTOROL SİSTEMİ 
  client.on("guildMemberAdd", async member => {
    if(!member.guild) return;
    let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
    if(!db.fetch(`otoR_${member.guild.id}`)) return
    if (mutelimi) { return }
    else {
if(db.fetch(`otoR_${member.guild.id}`)) {
  if(db.fetch(`otoK_${member.guild.id}`)) {
    
    let otorolkanal = member.guild.channels.cache.get(db.fetch(`otoRK_${member.guild.id}`))
    let otorol = member.guild.roles.cache.get(db.fetch(`otoR_${member.guild.id}`))
    member.roles.add(db.fetch(`otoR_${member.guild.id}`))
    let otorolmesaj = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setDescription(`<a:yesil:701521851498627202> ${member}, Hoşgeldin ${otorol} adlı rolün verildi!`)

    otorolkanal.send(otorolmesaj)

  } else {

    member.roles.add(db.fetch(`otoR_${member.guild.id}`))

  }


}
  }
  })
  // OTOROL SİSTEMİ BİTİŞ
  // AFK SİSTEMİ
  
  client.on("message" , async msg => {
    if (msg.author.bot) return
    if (!msg.guild) return;
    let prefix;
    
    if (db.has(`prefix_${msg.guild.id}`) === true) {
      prefix = db.fetch(`prefix_${msg.guild.id}`)
    }
      
    if (db.has(`prefix_${msg.guild.id}`) === false) {
      prefix = client.conf.prefix
    }
    if(msg.content.startsWith(prefix+"afk")) return;
   
    let afk = msg.mentions.users.first()
   
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
   
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
   let embedafk = Discord.MessageEmbed()
   .setColor(client.conf.renk)
   .setAuthor(client.conf.botadı, client.avatarURL)
   .setDescription(`Etiketlediğiniz kullanıcı şu anda ${sebep} sebebi ile size yanıt veremeyecek durumda!`)
         msg.channel.send(embedafk)
     }
   }
    if(msg.author.id === kisi){
   
         msg.reply(`AFK durumundan çıktınız`)
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
     msg.member.setNickname(isim)
     
   }
   
  });
  
  
  // AFK SİSTEMİ BİTİŞ
  

  // İSİM TEMİZLEME SİSTEMİ
  
  client.on('guildMemberAdd', (member) => {
    if(!member.guild) return
    if(member.bot) return
    let sistem = db.fetch(`isimduzeltme_${member.guild.id}`)
    if(sistem) {
      member.setNickname(member.user.username.replace(/[^a-z0-9]/ig, " ")).catch()
     } else {
         return;
     }
  });

  // İSİM TEMİZLEME SİSTEMİ BİTİŞ 
  
  // BOT İSTATİSTİK
  

  
  // BOT İSTATİSTİK BİTİŞ
  
//PREFİX BAŞLANGIÇ

  client.on("message", async (msg, member, guild) => {
    if (!msg.guild) return;
    let prefix2 = await db.fetch(`prefix_${msg.guild.id}`) || client.conf.prefix;
  var prefix = new Discord.MessageEmbed()
  .setTitle(client.conf.botadı)
  .setColor(client.conf.renk)
  .setDescription(`Prefixim: \`${prefix2}\`\nVarsayılan prefixim: \`${client.conf.prefix}\`\nKomutlarıma bakmak için \`${prefix2}yardım\`\nVerileri sıfırlamak için <@${client.user.id}> sıfırla\n\nLütfen komutları özel mesajlarda kullanma!`)
  const bahset= new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (msg.content.match(bahset)) {
      return msg.channel.send(prefix);
    }})
  // Prefix bitiş
  

  
  // SUNUCUYA GİRİNCE MESAJ ATTIRMA
  client.on('guildCreate', guild => {
    var embed = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setAuthor(client.conf.botadı, client.avatarURL)
    .setDescription(`Merhaba sunucuya yeni eklendim!\nHerhangi bir özellik eklenmesini istersen \`p!öneri <öneriniz>\` yazarak belirtebilirsiniz\n\`p!yardım\` ile bütün komutlarımı görebilirsin!\n\`p!komutlar\` yazarak komut sayıma bakabilirsin!`)
    let random = guild.channels.cache.filter(c => c.type === "text").random()
    random.send(embed)
  });
  
  
  client.on('guildCreate', async guild => { 
    let kurucu = client.users.cache.get(guild.owner.id)
    let embedgiris = new Discord.MessageEmbed()
   .setColor(client.conf.renk)
    .setAuthor(`${guild} adlı sunucuya giriş yaptım!`)
  .addField(`Sunucu idisi:`,`${guild.id} `)
  .addField(`Sunucu üye sayısı:`, guild.memberCount)
  .addField(`Sunucu kurucusu:`, `${kurucu} | \`${kurucu.tag}\``)
  .addField(`Sunucu kurucu id:`, guild.owner.id)
  client.channels.cache.get('737646836029980723').send(embedgiris)
})
  
  // atıldım
  client.on('guildDelete', async guild => { 
    let kurucu = client.users.cache.get(guild.owner.id)
    let embedcikis = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
     .setAuthor(`${guild} adlı sunucudan çıkış yaptım!`)
   .addField(`Sunucu idisi:`,`${guild.id} `)
   .addField(`Sunucu üye sayısı:`, guild.memberCount)
   .addField(`Sunucu kurucusu:`, `${kurucu} | \`${kurucu.tag}\``)
   .addField(`Sunucu kurucu id:`, guild.owner.id)
   client.channels.cache.get('737646836029980723').send(embedcikis)
  })
  
   client.on("guildCreate", guild => {
    //let kurucu = guild.members.cache.get(guild.owner.id)
    const e = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setDescription(
        `Hey, ben ${client.conf.botadı}. Az önce beni ekledin.\n${prefix}yardım yazarak bilgi alabilirsin.`
      )
      .setFooter("Sunucu kurucusu olduğunuzdan dolayı sadece size gönderildi.");
  
    //  kurucu.send(e).catch()
  });
  
  // SUNUCUYA GİRİNCE MESAJ ATTIRMA BİTİŞ
  // CAPSLOCK SİSTEMİ


  client.on("message", async msg => {
    if (!msg.guild) return;
  if (db.has(`capsE_${msg.guild.id}`) === true) {
    if (msg.author.bot) return;
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
  let embed = new Discord.MessageEmbed()
  .setColor(client.conf.renk)
  .setAuthor(client.conf.botadı, client.avatarURL)
  .setDescription(`${msg.author} bu sunucuda büyük harf engeli açık büyük mesaj yazamassın!`)
        let y = await msg.channel.send(embed)
        .then(x => x.delete({timeout: 5000}))
        return;
      }
    }
  }
  })
  // CAPSLOCK SİSTEMİ BİTİŞ
  // GÜVENLİK SİSTEMİ
  client.on("guildMemberAdd", async member => {
    let user = client.users.cache.get(member.id);
    let chan = client.channels.cache.get(db.fetch(`guvenlik3_${member.guild.id}`));
    const Canvas = require("canvas");
    const canvas = Canvas.createCanvas(360, 100);
    const ctx = canvas.getContext("2d");
    let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
    const resim1 = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/621045237137276929/621046566106431488/tes3.png"
    );
    const resim2 = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/621045237137276929/621046061875724298/tes1.png"
    );
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D");
    var kontrol;
    if (kurulus > 1296000000) kontrol = resim2;
    if (kurulus < 1296000000) kontrol = resim1;
  
    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/621045237137276929/621045305089064980/arka.png"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({dynamic: true})
    .replace(`webp`, `png`));
    ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(avatar, 143, 10, 73, 72);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "proxie-güvenlik3.png"
    );
    if (db.has(`blacklist.${user.id}`)) {
      member.guild.channels
        .cache.get(memberChannel)
        .send("Yasaklı kullanıcı geldi. Lütfen DİKKATLİ olun");
      if (!member.guild.channels.cache.get(memberChannel)) return;
    } else if (db.has(`üyelikk_${user.id}`)) {
      return;
    } else if (!member.guild.channels.cache.get(memberChannel)) return;
    member.guild.channels.cache.get(memberChannel).send(attachment);
  });
  client.on("guildMemberAdd", async member => {
    let user = client.users.cache.get(member.id);
    let chan = client.channels.cache.get(db.fetch(`guvenlik3_${member.guild.id}`));
    const Canvas = require("canvas");
    const canvas = Canvas.createCanvas(360, 100);
    const ctx = canvas.getContext("2d");
    let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
    const resim1 = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/621045237137276929/621046566106431488/tes3.png"
    );
    const resim2 = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/621045237137276929/621046061875724298/tes1.png"
    );
    const gold = await Canvas.loadImage(
      "https://www.osmaniyerehberim.com/wp-content/uploads/2018/11/506-gold-uyelik-arkadaslik-sitesi.png"
    );
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D");
    var kontrol;
    if (kurulus > 1296000000) kontrol = resim2;
    if (kurulus < 1296000000) kontrol = resim1;
  
    const background = await Canvas.loadImage(
      "https://i.hizliresim.com/7Br6Av.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({dynamic: true})
    .replace(`webp`, `png`));
    ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(avatar, 143, 10, 73, 72);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "proxie-güvenlik3.png"
    );
    const embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
  
      .setDescription(
        `<a:mavi:701521632534986803> ${member.user.username} Adlı Gold üye Katıldı. <a:mavi:701521632534986803>`
      );
    if (db.has(`üyelikk_${user.id}`)) {
      if (!member.guild.channels.cache.get(memberChannel)) return;
      member.guild.channels.cache.get(memberChannel).send(attachment);
      member.guild.channels.cache.get(memberChannel).send(embed);
    } else return;
  });
  // GÜVENLİK SİSTEMİ BİTİŞ

  // SEVİYE SİSTEMİ
  client.on("message", async message => {
  if(!message.guild) return
    var id = message.author.id;
    var gid = message.guild.id;
  
    let hm = await db.fetch(`seviyekontrol_${gid}`);
    let kanal = await db.fetch(`svlog_${gid}`);
    let xps = await db.fetch(`verilecekxp_${gid}`);

  
    if (!hm) return;
    if (message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
  
    var xp = await db.fetch(`xp_${id}_${gid}`);
    var lvl = await db.fetch(`lvl_${id}_${gid}`);
    var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  
    if (!lvl) {
      if (xps) {
        db.set(`xp_${id}_${gid}`, xps);
      }
      db.set(`xp_${id}_${gid}`, 4);
      db.set(`lvl_${id}_${gid}`, 1);
      db.set(`xpToLvl_${id}_${gid}`, 300);
    } else {
      if (xps) {
        db.add(`xp_${id}_${gid}`, xps);
      }
      db.add(`xp_${id}_${gid}`, 4);
  
      if (xp > xpToLvl) {
        db.add(`lvl_${id}_${gid}`, 1);
        db.add(
          `xpToLvl_${id}_${gid}`,
          (await db.fetch(`lvl_${id}_${gid}`)) * 100
        );
        if (kanal) {
          client.channels
            .cache.get(kanal).send(
              message.member.user.username +
                `** Seviye Atladı! Yeni seviyesi; \`${lvl}\` Tebrikler! :tada: **`
            ).catch(error => {
            })
  
        }
      }
    }
  })
  // SEVİYE SİSTEMİ BİTİŞ
//


client.on('userUpdate', async (oldUser, newUser) => {//
if(oldUser.avatarURL({dynamic: true}) !== newUser.avatarURL({dynamic: true})) {


client.guilds.cache.forEach(async guild => {
if(await db.fetch(`otogif.${guild.id}`)) {

const ch = guild.channels.cache.get(await db.fetch(`otogif.${guild.id}`))
if(!ch) return;
if(!newUser.avatarURL()) return;


ch.send(new Discord.MessageEmbed()
.setAuthor(oldUser.username, newUser.avatarURL({dynamic: true}))
.setDescription(`[Resim linki](${newUser.avatarURL({dynamic: true}).replace(`webp`,`png`)})`)
.setImage(newUser.avatarURL({dynamic: true})
.replace(`webp`, `png`))
.setColor(client.conf.renk)
.setFooter(newUser.tag + ` (${newUser.id})`))

} else return;

})  }

})//






  client.on('error', error => {
    console.error('WebSocket bir hatayla karşılaştı:', error);
});


client.on('voiceStateUpdate', (oldState, newState) => {

  let prefix;
    
  if (db.has(`prefix_${oldState.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${oldState.guild.id}`)
  }
    
  if (db.has(`prefix_${oldState.guild.id}`) === false) {
    prefix = client.conf.prefix
  }
  if(!oldState.guild.id) return
  let panel = db.fetch(`özeloda.${oldState.guild.id}`)
  if(panel) {
  // todo create channel
  let everyone = oldState.guild.roles.cache.find(r => r.name === `@everyone`);
  let kategori = oldState.guild.channels.cache.find(r => r.name === '• Özel Oda Oluştur')
  let zatenvarmi = oldState.guild.channels.cache.find(r => r.name === `║👤 ${newState.member.displayName}`)
  let zatenvarmi2 = oldState.guild.channels.cache.find(r => r.name === `║👤 ${oldState.member.displayName}`)
  if (newState.member.voice.channel != null && newState.member.voice.channel.name.startsWith('👪 ║ Oda Oluştur')) {
    if(zatenvarmi) { return newState.member.voice.setChannel(zatenvarmi.id)  }
    newState.guild.channels.create(`║👤 ${newState.member.displayName}`, {type: 'voice'}).then(kanal => {
      kanal.setParent(kategori.id)
      kanal.overwritePermissions([
        {
          id: everyone.id,
          deny: ['CONNECT'], 
        },    
        {
          id: oldState.id,
          allow: ['CONNECT'],
        },
      ])
      newState.member.voice.setChannel(kanal.id);   
    })
    let bilgilendirme =  `__Bilgilendirme__`
    let bilgilendirmealt = `<a:grihypesquad:755090087510802453> \`${prefix}davet\` | ${client.conf.botadı}'yi sunucunuza eklersiniz\n<a:hypesquad:755090087510802453> \`${prefix}botbilgi\` | Botun istatistiklerini gösterir`
    let hatabildir = `<a:grihypesquad:755090087510802453> Herhangi bir hata ile karşılaşırsanız \`${prefix}hata-bildir <hatanız>\` yazınız!\n\n[Beni Ekle!](${client.conf.davetlinki}) **|** [CSGO Sunucusu](${client.conf.sunuculinki}) **|** [Destek Sunucusu](${client.conf.desteklinki})\n\n`

    let özeloda = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setAuthor(client.conf.botadı+` Oyun Sunucusu Komutları`,client.user.avatarURL({dynamic:true}))
    .addField(`__Özel Oda Limit__`,`<a:grisonsuzluk:755088186497302548> \`${prefix}özel-oda-limit\`\nKanalın limitini ayarlar.`)
    .addField(`__Özel Oda İzin__`,`<a:grisonsuzluk:755088186497302548> \`${prefix}özel-oda-izin\`\nEtiketlediğiniz kullanıcının odaya girişini açar.`)
    .addField(`__Özel Oda Yasakla__`,`<a:grisonsuzluk:755088186497302548> \`${prefix}özel-oda-yasakla\`\nEtiketlediğiniz kullanıcının odaya girişini kapar.`)
    .addField(`__Özel Oda Kilit Aç__`,`<a:grisonsuzluk:755088186497302548> \`${prefix}özel-oda-kilit aç\`\nOdaya herkesin girebilmesini sağlar.`)
    .addField(`__Özel Oda İzin Kapat__`,`<a:grisonsuzluk:755088186497302548> \`${prefix}özel-oda-kilit kapat\`\nEtiketlediğiniz kullanıcının herkesin girebilmesini engeller.`)
    .addField(`__Özel Oda At__`,`<a:grisonsuzluk:755088186497302548> \`${prefix}özel-oda-at @etiket\`\nEtiketlediğiniz kullanıcıyı odadan atar.`)
    .addField(bilgilendirme,bilgilendirmealt)
    .setFooter(client.conf.botadı+ ` | Botumuz sizin isteklerinizle gelişiyor.`)
    .setImage(`https://cdn.discordapp.com/attachments/745966148117331980/751727069670408222/proxieyardm.jpg`)
    oldState.member.send(özeloda)
  }
  // ! leave
}
client.on("voiceChannelLeave", (member, channel) => {
  if(channel.name.startsWith(`║👤 ${member.displayName}`)) {
    channel.delete()
  }

});
})

client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
  if(oldChannel.name.startsWith(`║👤 ${member.displayName}`)) {
    oldChannel.delete()
  }
});




//----------------------------------GEÇİCİ KANAL----------------------------// 


// MÜZİK BOT BAŞLANGIÇ
  
/*client.on('message', async msg => {
  if (!msg.guild) return;
  let prefix;
  
if (db.has(`prefix_${msg.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${msg.guild.id}`)
}
  
if (db.has(`prefix_${msg.guild.id}`) === false) {
  prefix = client.conf.prefix
}

const youtube = new YouTube(client.conf.apikey);
// let prefix = client.conf.prefix
  if (msg.author.bot) return
  if (!msg.content.startsWith(prefix)) return
  const args = msg.content.split(' ');
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length)

  if (command === 'çal' || command === 'play' || command === 'p') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    const voiceChannel = msg.member.voiceChannel;
    let sesligir = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Bu komutu kullanabilmek için bir sesli odada olman gerekli.**")
    .setColor(client.conf.renk)
    if (!voiceChannel) return msg.channel.send(sesligir);
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
      let yetkiyok = new Discord.MessageEmbed()
      .setDescription('**<a:unlem:730484050288181329> Odaya Girme Yetkim Yok**')
      .setColor(client.conf.renk)
      return msg.channel.send(yetkiyok);
    }
    if (!permissions.has('SPEAK')) {
      let konusmayetkiyok = new Discord.MessageEmbed()
      .setDescription('**<a:unlem:730484050288181329> Bu Odada Konuşma Yetkim Yok**')
      .setColor(client.conf.renk)
      return msg.channel.send(konusmayetkiyok);
    }
    let şarkıyaz = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> Aratacağım şarkıyı yazman gerek!")
    .setColor(client.conf.renk)
    if (!args[1]) return msg.channel.send(şarkıyaz);

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      let sırayaeklendi = new Discord.MessageEmbed()
      .setDescription(`**✅ Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
      .setColor(client.conf.renk)
      return msg.channel.send(sırayaeklendi);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          msg.channel.send(new Discord.MessageEmbed()                  
          .setTitle('Şarkı Seçimi')
          .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
          .setFooter('Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!')
          .setColor(client.conf.renk));
          // eslint-disable-next-line max-depth
          try {
            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
              time: 10000,
              errors: ['time']
            });
          } catch (err) {
            console.error(err);
            let degeryok = new Discord.MessageEmbed()
            .setDescription('<a:unlem:730484050288181329> **Bir sayı değeri seçilmediği için komut iptal edilmiştir.**')
            .setColor(client.conf.renk)
            return msg.channel.send(degeryok);
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          let sonucyok = new Discord.MessageEmbed()
          .setDescription("<a:unlem:730484050288181329> **Youtube'de arama yaptım fakat sonuç bulamadım!**")
          .setColor(client.conf.renk)
          return msg.channel.send(sonucyok);
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === 'geç' || command === 'skip' || command === 's') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    let sesligir = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Bu komutu kullanabilmek için bir sesli odada olman gerekli.**")
    .setColor(client.conf.renk)
    if (!msg.member.voiceChannel) return msg.channel.send(sesligir);
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    if (!serverQueue) return msg.channel.send(muzikyok);
    let gecildi = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Sıradaki müziğe geçildi.**")
    .setColor(client.conf.renk)
    serverQueue.connection.dispatcher.end('**Sıradaki müziğe geçildi.**');
    msg.channel.send(gecildi)
    return undefined;
  } else if (command === 'dur' || command === 'durdur') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    let sesligir = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Bu komutu kullanabilmek için bir sesli odada olman gerekli.**")
    .setColor(client.conf.renk)
    if (!msg.member.voiceChannel) return msg.channel.send(sesligir);
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    if (!serverQueue) return msg.channel.send(muzikyok);
    let durduruldu = new Discord.MessageEmbed()
    .setDescription(`<a:unlem:730484050288181329> **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu!`)
    .setColor(client.conf.renk)
    msg.channel.send(durduruldu);
    serverQueue.songs = [];
    let bitti = new Discord.MessageEmbed()
    .setDescription(`<a:unlem:730484050288181329> Müzik bitti!`)
    .setColor(client.conf.renk)
    serverQueue.connection.dispatcher.end(bitti);
    return undefined;
  } else if (command === 'ses' || command === 'volume' || command === 'bass') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    let sesligir = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Bu komutu kullanabilmek için bir sesli odada olman gerekli.**")
    .setColor(client.conf.renk)
    if (!msg.member.voiceChannel) return msg.channel.send(sesligir);
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    if (!serverQueue) return msg.channel.send(muzikyok);
    let simdikises = new Discord.MessageEmbed()
    .setDescription(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor(client.conf.renk)
    if (!args[1]) return msg.channel.send(simdikises);
    let yuzdenfazla = new Discord.MessageEmbed()
    .setDescription(`<a:unlem:730484050288181329> Sesi \`100\`den fazla yapamazsın!`)
    .setColor(client.conf.renk)
    if (args[1] > 100) return msg.channel.send(yuzdenfazla)
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    let ses = new Discord.MessageEmbed()
    .setDescription(`:loud_sound: Ses seviyesi ayarlanıyor: **${args[1]}**`)
    .setColor(client.conf.renk)
    return msg.channel.send(ses);
  } else if (command === 'çalan') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    if (!serverQueue) return msg.channel.send(muzikyok);
    let calan = new Discord.MessageEmbed()
    .setDescription(`<a:unlem:730484050288181329> Şuanda Çalan Müzik: **${serverQueue.songs[0].title}**`)
    .setColor(client.conf.renk)
    return msg.channel.send(calan);
  } else if (command === 'kuyruk' || command === 'sıra' || command === 'queue') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    if (!serverQueue) return msg.channel.send(muzikyok);
    return msg.channel.send(new Discord.MessageEmbed()                  
    .setTitle('Müzik Sırası')
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title} **-** ${song.requester}`).join('\n')}\n\n**Şuanda Çalan Müzik:** ${serverQueue.songs[0].title}`)
    .setColor(client.conf.renk));
  } else if (command === 'duraklat' || command === 'stop') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let duraklatıldı = new Discord.MessageEmbed()
      .setDescription("<a:unlem:730484050288181329> **Müzik başarılı bir şekilde duraklatıldı!**")
      .setColor(client.conf.renk)
      return msg.channel.send(duraklatıldı);
    }
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    return msg.channel.send(muzikyok);
  } else if (command === 'devam' || command === 'resume') {
    if(msg.author.id == db.fetch(`blacklist.${msg.author.id}`)) {
      if(!msg.content.startsWith(prefix)) return
      }
    if(msg.channel.id == db.fetch(`destekK_${msg.guild.id}`)) return
    if(db.fetch(`komutK_${msg.guild.id}`)) {
      if(!msg.content.startsWith(prefix)) return
    if(msg.channel.id !== db.fetch(`komutK_${msg.guild.id}`)) return
    }
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let devam = new Discord.MessageEmbed()
      .setDescription("<a:unlem:730484050288181329> **Müzik başarılı bir şekilde devam ediyor!**")
      .setColor(client.conf.renk)
      return msg.channel.send(devam);
    }
    let muzikyok = new Discord.MessageEmbed()
    .setDescription("<a:unlem:730484050288181329> **Hiç bir müzik çalmamakta.**")
    .setColor(client.conf.renk)
    return msg.channel.send(muzikyok);
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: (video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`<a:unlem:730484050288181329>  **Odaya giremiyorum: ${error}**`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`<a:unlem:730484050288181329>  **Odaya giremiyorum: ${error}**`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return msg.channel.send(new Discord.MessageEmbed()
    .setDescription(`<a:unlem:730484050288181329> **${song.title}** Adlı müzik kuyruğa başarılı bir şekilde eklendi!`)
    .setColor(client.conf.renk))
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', reason => {
      if (reason === new Discord.MessageEmbed()
      .setDescription(`<a:unlem:730484050288181329> Yayın akış hızı yeterince yeterli değil`)
      .setColor(client.conf.renk)) console.log('Müzik bitti.');
    //  else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(new Discord.MessageEmbed()
  .setDescription(`<a:unlem:730484050288181329> **${song.title}** Adlı müzik başlıyor!`)
  .setColor(client.conf.renk));
}*/


// MÜZİK SİSTEMİ BİTİŞ


// ÇEKİLİŞ SİSTEMİ


const { GiveawaysManager } = require("giveaways-js");
const message = require('./events/message.js');
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: client.conf.renk,
        embedColorEnd: client.conf.renk,
        reaction: "🎉"
    }
});
// We now have the giveawaysManager to access the manager anywhere.
client.giveawaysManager = manager;


client.on('message', async message => {
  if(!message.guild) return
  let prefixx;
  
  if (db.has(`prefix_${message.guild.id}`) === true) {
    prefixx = db.fetch(`prefix_${message.guild.id}`)
  }
    
  if (db.has(`prefix_${message.guild.id}`) === false) {
    prefixx = client.conf.prefix
  }
  const ms = require("ms"); // npm install ms
  const args = message.content.slice(prefixx.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "çekiliş" || command === "giveaway"){
    if(!message.content.startsWith(prefixx)) return
    if(command !== "çekiliş" && command !== "giveaway") return
    if(message.channel.id == db.fetch(`destekK_${message.guild.id}`)) return
    if(message.author.id == db.fetch(`blacklist.${message.author.id}`)) {
      if(!message.content.startsWith(prefix)) return
      }


    let bilgilendirme =  `__Bilgilendirme__`
    let bilgilendirmealt = `<a:grihypesquad:755090087510802453> \`${prefix}davet\` | ${client.conf.botadı}'yi sunucunuza eklersiniz\n<a:hypesquad:755090087510802453> \`${prefix}botbilgi\` | Botun istatistiklerini gösterir`

    let hicbirseyyok = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setAuthor(client.conf.botadı+` | Çekiliş Yardım`,client.user.avatarURL({dynamic: true}))
    .addField(`__Çekiliş başlat__`,`<a:griayarlar:755087902945443920> \`${prefix}çekiliş başlat\`\nÇekiliş başlatırsınız.`,true)
    .addField(`__Çekiliş düzenle__`,`<a:griayarlar:755087902945443920> \`${prefix}çekiliş düzenle\`\nVar olan çekilişi düzenlersinizs.`,true)
    .addField(`__Çekiliş yeniden çek__`,`<a:griayarlar:755087902945443920> \`${prefix}çekiliş yeniden-çek\`\nÇekilişi tekrar çeker.`,true)
    .addField(`__Çekiliş sil__`,`<a:griayarlar:755087902945443920> \`${prefix}çekiliş sil\`\nÇekilişi silersiniz.`,true)
    .addField(bilgilendirme, bilgilendirmealt)
    .setFooter(client.conf.botadı+ ` | Botumuz sizin isteklerinizle gelişiyor.`)
    .setImage(`https://cdn.discordapp.com/attachments/745966148117331980/751727069670408222/proxieyardm.jpg`)
    if(!args[0]) return message.channel.send(hicbirseyyok)
    if (args[0] !== "başlat" && args[0] !== "start" && args[0] !== "yenidençek" && args[0] !== "yeniden-çek" && args[0] !== "reroll" && args[0] !== "düzenle" && args[0] !== "edit" && args[0] !== "sil" && args[0] !== "temizle" && args[0] !== "delete") return message.channel.send(hicbirseyyok)
    if(args[0] === `başlat` || args[0] === `start`){
      const cekilisyetki = new Discord.MessageEmbed()
      .setAuthor(client.conf.botadı, client.avatarURL)
      .setColor(client.conf.renk)
      .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(cekilisyetki)
      let baslatyanlis = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setTitle(client.conf.botadı + ` | Çekiliş`)
      .setDescription(`<a:unlem:730484050288181329> Yanlış kullanım!\nBir süre, kazanacak sayısı ve ödül yazınız.`)
      .setFooter(`Örnek: ${prefix}çekiliş başlat <süre> <kazanacak> <ödül>`)
      if(!args[1] || !args[2] || !args[3]) return message.channel.send(baslatyanlis)

      let sureyanlis = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setTitle(client.conf.botadı + ` | Çekiliş`)
      .setDescription(`<a:unlem:730484050288181329> Yanlış kullanım!\nLütfen zaman kısmına 1d/1h/1m/1s gibi yazınız.`)
      .setFooter(`Örnek: ${prefix}çekiliş başlat <süre> <kazanacak> <ödül>`)

      if(!args[1].endsWith(`d`) &&
        !args[1].endsWith(`h`) &&
        !args[1].endsWith(`m`) &&
        !args[1].endsWith(`s`)) return message.channel.send(sureyanlis)

      // :?start 1d 2 PS 4!
      // will create a giveaway with a duration of one days, with two winner and the prize will be "PS 4"
let kanal;

if(message.mentions.channels.first()) kanal = message.mentions.channels.first()
else kanal = message.channel
      client.giveawaysManager.start(kanal, {
        time: ms(args[1]),
        prize: args.slice(3).join(" "),
        winnerCount: parseInt(args[2]),
        hostedBy: message.author,
        messages: {
            giveaway: "🎉  **Çekiliş** 🎉",
            giveawayEnded: "🎉 **Çekiliş bitti!** 🎉",
            timeRemaining: `Kalan zaman: **{duration}**!`,
            inviteToParticipate: "🎉 emojisine basarak çekilişe katılabilirsin",
            winMessage: "Başarılı, {winners}! Sen **{prize}** kazandın!\nhttps://discordapp.com/channels/{guildid}/{channelid}/{messageid}",
            embedFooter: "Çekilişler",
            noWinner: "Kimse kazanamadı.\nÇünkü yeterli katılımcı bulunamadı.",
            winners: "kazanan(lar)",
            endedAt: "Bitiş zamanı",
            units: {
                seconds: "saniye",
                minutes: "dakika",
                hours: "saat",
                days: "gün"
            }
        }
        
    }).then((gData) => {
      // {...} (messageid, end date and more)
      })
      .catch((err) => { // If giveaway's ID are not found
        return message.channel.send(`Bir hata oluştu! Lütfen destek sunucuma gelip bunu bildir!`);
    });
      // And the giveaway has started!
  }
}
if(args[0] === "yeniden-çek" || args[0] === "yenidençek" || args[0] === "reroll") {
  
  if(command !== "çekiliş" && command !== "giveaway") return

  const cekilisyetki = new Discord.MessageEmbed()
  .setAuthor(client.conf.botadı, client.avatarURL)
  .setColor(client.conf.renk)
  .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(cekilisyetki)


    let messageID = args[1];
    let idyok = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setTitle(client.conf.botadı + ` | Çekiliş`)
    .setDescription(`<a:unlem:730484050288181329> Yanlış kullanım!\nBir mesaj idisi yazman gerek!`)
    .setFooter(`Örnek: ${prefix}çekiliş yenidençek <id>`)
    if(!messageID) return message.channel.send(idyok)
    client.giveawaysManager.reroll(messageID).then(() => {
        message.channel.send("Başarılı! Çekiliş tekrar çekildi.");
    }).catch((err) => { // If giveaway's ID are not found
        message.channel.send("Bu id de bir çekiliş bulamadım, lütfen tekrar dene!");
    });
}
if(args[0] === `düzenle` || args[0] === `edit`) {
  if(command !== "çekiliş" && command !== "giveaway") return

  const cekilisyetki = new Discord.MessageEmbed()
  .setAuthor(client.conf.botadı, client.avatarURL)
  .setColor(client.conf.renk)
  .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(cekilisyetki)


  let messageID = args[1];
  let kazanacaklar = args[2];
  let yenihediye = args.slice(3).join(" ");

  let düzenleyanlis = new Discord.MessageEmbed()
  .setColor(client.conf.renk)
  .setTitle(client.conf.botadı + ` | Çekiliş`)
  .setDescription(`<a:unlem:730484050288181329> Yanlış kullanım!`)
  .setFooter(`Örnek: ${prefix}çekiliş düzenle <mesaj-id> <yeni-kazanacak> <yeni-ödül>`)
  if(!args[1] || !args[2] || !args[3]) return message.channel.send(düzenleyanlis)


  client.giveawaysManager.edit(messageID, {
      newWinnerCount: kazanacaklar,
      newPrize: yenihediye,
      addTime: 5000
  }).then(() => {
      message.channel.send("Başarılı!");
  }).catch((err) => {
      message.channel.send("Bu id de bir çekiliş bulamadım, lütfen tekrar dene!");
  });

}

if(args[0] === `sil` || args[0] === `delete`) {
  if(command !== "çekiliş" && command !== "giveaway") return

  const cekilisyetki = new Discord.MessageEmbed()
  .setAuthor(client.conf.botadı, client.avatarURL)
  .setColor(client.conf.renk)
  .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(cekilisyetki)


  let messageID = args[1]; // This will ensure if args[0] is a message ID of the giveaway
  let silyanlis = new Discord.MessageEmbed()
  .setColor(client.conf.renk)
  .setTitle(client.conf.botadı + ` | Çekiliş`)
  .setDescription(`<a:unlem:730484050288181329> Yanlış kullanım!`)
  .setFooter(`Örnek: ${prefix}çekiliş sil <mesaj-id>`)
  if(!messageID) return message.channel.send(silyanlis)
  client.giveawaysManager.delete(messageID).then(() => {
      message.channel.send("Başarılı! Çekiliş silindi!");
  }).catch((err) => { // If message ID are not giveaway, it'll give an error
      message.channel.send("Bu id de bir çekiliş bulamadım, lütfen tekrar dene!");
  });

}
});

// ÇEKİLİŞ SİSTEMİ BİTİŞ
// DM LOG

client.on("message", msg => {
  var dm = client.channels.cache.get("760597624625168424")
  if(msg.channel.type === "dm") {
  if(msg.author.id === client.user.id) return;
  const botdm = new Discord.MessageEmbed()
  .setTitle(`${client.conf.botadı} dm-log`)
  .setTimestamp()
  .setColor(client.conf.renk)
  .setThumbnail(`${msg.author.avatarURL({dynamic: true})}`)
  .addField("Gönderen", msg.author.tag)
  .addField("Gönderen ID", msg.author.id)
  .addField("Gönderilen Mesaj", msg.content)
  
  dm.send(botdm)
  
  }
})

// DM LOG BİTİŞ

//


client.on("message", async message => {
  if(!message.guild) return;
        if (message.content.toLowerCase() == '<@!701127077969002547> sıfırla') {
          const yetkisıfırla = new Discord.MessageEmbed()
          .setAuthor(client.conf.botadı, client.avatarURL)
          .setColor(client.conf.renk)
          .setDescription(`Bu komutu sadece Sunucu Sahibi kullanabilir!`)
        if(message.author.id !== message.guild.owner.id) return message.channel.send(yetkisıfırla);
          db.delete(`prefix_${message.guild.id}`)
          db.delete(`${message.guild.id}.kufur`)
          db.delete(`${message.guild.id}.reklam`)
          db.delete(`komutK_${message.guild.id}`)
          db.delete(`ksistemi_${message.guild.id}`)
          db.delete(`kaK_${message.guild.id}`)
          db.delete(`kayıtV_${message.guild.id}`)
          db.delete(`kayıtR_${message.guild.id}`)
          db.delete(`kayıtM_${message.guild.id}`)
          db.delete(`kayıtA_${message.guild.id}`)
          db.delete(`kayıtE_${message.guild.id}`)
          db.delete(`kayıtB_${message.guild.id}`)
          db.delete(`log_${message.guild.id}`)
          db.delete(`ototag_${message.guild.id}`)
          db.delete(`sayacK_${message.guild.id}`)
          db.delete(`svlog_${message.guild.id}`)
          db.delete(`verilecekxp_${message.guild.id}`)
          db.delete(`gc_${message.guild.id}`)
          db.delete(`sayacS_${message.guild.id}`)
          db.delete(`destekK_${message.guild.id}`)
          db.delete(`destekR_${message.guild.id}`)
          db.delete(`seviyekontrol_${message.guild.id}`)
          db.delete(`cezalıR_${message.guild.id}`)
          db.delete(`ssaass_${message.guild.id}`)
          db.delete(`capsE_${message.guild.id}`)
          db.delete(`otoR_${message.guild.id}`)
          db.delete(`otoRK_${message.guild.id}`)
          db.delete(`capsE_${message.guild.id}`)
          message.channel.send(`Tüm verileri siliyorum!\nBirkaç dakika cevap veremeyebilirim!`)
    }
  })
//
// SAHİP MESAJ ATMA 
const talkedRecently = new Set();
client.on("message", async msg => {  
  let prefix;
  if(!msg.guild) return
  if (db.has(`prefix_${msg.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${msg.guild.id}`)
  }
    
  if (db.has(`prefix_${msg.guild.id}`) === false) {
    prefix = client.conf.prefix
  }
  if (msg.author.id !== client.conf.sahip) return;
  if(msg.content.startsWith(prefix)) return
  if (talkedRecently.has(msg.author.id)) {
} else {
 
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.conf.botadı} `, "https://media.discordapp.net/attachments/737265633493909524/744887204207394837/730805533216342038.gif")
  
   .setColor(client.conf.renk)
   .setDescription(`<a:kristal:732289189198037024> Kralım hoşgeldin! <a:kristal:732289189198037024>`)
 msg.channel.send(embed).then(x => x.delete({timeout: 15000}))
 
 talkedRecently.add(msg.author.id);
 setTimeout(() => {
  //msg.delete();
   // Removes the user from the set after a minute
   talkedRecently.delete(msg.author.id);
 }, 60000*60);// Şuan 10 dakikadır Değiştirebilirsiniz.
}
  }
)

// rol sildirme

client.on("message", async message => {
let veri = db.fetch(`gunlukoy2.${message.author.id}`)
let veri2 = db.fetch(`gunlukoyverenler2`)
if(!veri) return
let cooldown = 1000*60*60*12, // 24 Saat
amount = Math.floor(Math.random() * 1000) + 4000;
let kullanıcı = client.guilds.cache.get("693459942937460736").members.cache.get(message.author.id)
let lastDaily = veri
if (lastDaily !== null && cooldown - (Date.now() - lastDaily) <= 0) {
let timeObj = ms(cooldown - (Date.now() - lastDaily));
db.delete(`gunlukoy2.${message.author.id}`)
let ex = [];
veri2.forEach(veriler => {
if(veriler.kullanici === message.author.id) return;
ex.push(veriler)
db.set(`gunlukoyverenler2`, ex)
})
kullanıcı.roles.remove("769888498500894730").catch()
message.member.send(new Discord.MessageEmbed()
.setColor(client.conf.renk)
.setDescription(`Oy verdikten sonra 12 saat geçti lütfen tekrar oy verin ve [destek](${client.conf.desteklinki}) sunucumuza gelip \`p!oy-verdim\` yazarak tekrar rolünü alabilirsin!`)).catch()

}
})
client.on("message", async message => {
  if(!message.guild) return;
  let prefixx;
  
  if (db.has(`prefix_${message.guild.id}`) === true) {
    prefixx = db.fetch(`prefix_${message.guild.id}`)
  }
    
  if (db.has(`prefix_${message.guild.id}`) === false) {
    prefixx = client.conf.prefix
  }
  if(message.channel.id == db.fetch(`destekK_${message.guild.id}`)) return

  if(message.author.id == db.fetch(`blacklist.${message.author.id}`)) {
    if(!message.content.startsWith(prefix)) return
    }
  const skyhan = require('quick.db')
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
    let komutlar = skyhan.fetch(`skyhan.özelkomut.${message.guild.id}`);
    if (!komutlar || komutlar.length == 0) return;
    if(message.content.startsWith(prefixx)) {
    let komut = message.content
    
    let yanıt = komutlar.find(a => a.komut === komut.split(prefixx)[1]);
    if (!yanıt) return;
    else {
      let embed = new Discord.MessageEmbed()
      .setColor(client.conf.renk)
      .setTitle(client.conf.botadı + ` | Özel Komut sistemi`)
      .setDescription(yanıt.cevap)
      message.channel.send(embed);
    };
    };
}) 
  //


  client.login(client.conf.token)