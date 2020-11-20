const Discord = require("discord.js");
let talkedRecently = new Set();
const db = require('quick.db')

module.exports = message => {
	if(!message.guild) return
  let client = message.client;
  let prefix;
  
  if (db.has(`prefix_${message.guild.id}`) === true) {
	prefix = db.fetch(`prefix_${message.guild.id}`)
  }
	
  if (db.has(`prefix_${message.guild.id}`) === false) {
	prefix = client.conf.prefix
  }
  if (message.author.bot) return;
  if (!message.guild) return
  if(message.channel.id == db.fetch(`destekK_${message.guild.id}`)) return
  if(message.author.id == db.fetch(`blacklist.${message.author.id}`)) {
	if(!message.content.startsWith(prefix)) return
	if(message.author.id === client.conf.sahip) {} else {
return message.channel.send(`Sen botun kara listesindesin!`)
	}	
  }
  if(db.fetch(`botbakım`)) {
	  if(!message.content.startsWith(prefix)) return
	  if(message.author.id === client.conf.sahip) {}
	  else {
	  return message.channel.send(`Şu anda bot bakımda lütfen daha sonra tekrar deneyiniz!`).catch(error => {
	  })
	  }
  }
  if(db.fetch(`komutK_${message.guild.id}`)) {
	  if(!message.content.startsWith(prefix)) return

	if(message.channel.id !== db.fetch(`komutK_${message.guild.id}`)) {
		if(!message.member.hasPermission("ADMINISTRATOR")) {
			if(message.content.toLowerCase() === `${prefix}4k`
			|| message.content.toLowerCase() === `${prefix}pgif`
			|| message.content.toLowerCase() === `${prefix}anal`
			|| message.content.toLowerCase() === `${prefix}ass`
			|| message.content.toLowerCase() === `${prefix}pussy`
			|| message.content.toLowerCase() === `${prefix}hentai`
			|| message.content.toLowerCase() === `${prefix}hass`
			|| message.content.toLowerCase() === `${prefix}hanal`
			|| message.content.toLowerCase() === `${prefix}gonewild`
			|| message.content.toLowerCase() === `${prefix}hkitsune`
			|| message.content.toLowerCase() === `${prefix}hd`
			|| message.content.toLowerCase() === `${prefix}am`
			|| message.content.toLowerCase() === `${prefix}boobs`
			|| message.content.toLowerCase() === `${prefix}meme`
			|| message.content.toLowerCase() === `${prefix}göt`
			|| message.content.toLowerCase() === `${prefix}sil`) {} else {
		if(message.channel.name.startsWith(`yardım-`)) {} else {
		return message.channel.send(`Komutları <#${db.fetch(`komutK_${message.guild.id}`)}> kanalında kullanman gerek!`).then(mesaj => {
		message.delete()
		setTimeout(() => {
			mesaj.delete()
		  }, 5000)
		})
		
	}
}
	}
}
  }
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
   if (cmd.conf.enabled === false) {
      if (!client.conf.sahip.includes(message.author.id) && !client.conf.sahip.includes(message.author.id)) {
        const embed = new Discord.MessageEmbed()
                    .setDescription(`:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED")
                message.channel.send({embed})
                return
      }
    }
    
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
          .setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu fynx kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {	
			if (!client.conf.sahip.includes(message.author.id)) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu sadece **sahibim** kullanabilir!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

  let veri = db.fetch(`botbakım`)
  if(veri) {
   if(message.author.id !== client.conf.sahip) {
	let embed31 = new Discord.MessageEmbed()
	.setTitle('Bakımdayız :x:')
	.setDescription('Bot şu anda bakımda lütfen daha sonra tekrar dene!')
	.addField('Bakım Sebebi:', veri)
	.setColor(client.conf.renk)
	 return   message.channel.send(embed31).then(m => m.delete(10000))

   } 
	
  }
};

