const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js')
const fs = require('fs');
client.login('Njg0ODU4MDEzMzAzMDQ2Mjgz.XmANyg.5HAi9QyG0lj5ht8QuBw_699aHOg')
var prefix = "!";

const warns = JSON.parse(fs.readFileSync('./warns.json'))

client.on("ready", () => {
    console.log("[+] TEST BOT FINALY Connnecté Avec Succès !");
    client.user.setActivity('!help| Ower: ?M™', {type: "STREAMING", url:"https://twitch.tv/username" }).catch(console.error);

  })

  client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
  
  client.on('message', message => {
   
  //help
     if(message.content.startsWith(prefix + "help")){
          var embed = new Discord.RichEmbed()
              .setTitle("Help")
              .setDescription("Bot de ?M™ & 𝕯𝖗 . 𝔸𝓬𝖊")
              .setAuthor(client.user.username)
              .addField("**:hammer: Modération !**",)
              .addField("***!warn***","*Permet de prévenir une personne de sa faute !*",)
              .addField("***!infractions***","*Permet de voir les faute de la personne !*",)
              .addField("***!ban***","*Permet de faire quitter une personne de force !*",)
              .addField("***!kick***","*Permet d'exclues une personne de force!*",)
              .addField("***!clear***","*Supprime tous les message du salon !*",)
              .addField("***!dm***","*Envoie un message prv a toute ta communauté !*")
              .addField("**:scales: Fun !**",)
              .addField("***!infoDisocrd***","*Pour avoir toute les info sur le server !*",)
              .addField("***!ping***","*Indique ton ms !*",)
              .addField("***SOON***","*SOON*",)
              .addField("NOM", message.author.username, true)
              .addField("ID", message.author.id, true)
              .setColor("#ABF6AA")
              .setFooter(client.user.username + " ")
              .setThumbnail(message.author.avatarURL)
              .setTimestamp()
            message.channel.sendEmbed(embed);   
        }
      })})
      
//accueil
      client.on('guildMemberAdd', function (member) {
        let embed = new Discord.RichEmbed()
            .setDescription('**' + member.user.username + '** Viens de rejoindre ' + member.guild.name)
            .setFooter('Nous sommes désormais ' + member.guild.memberCount)
            .setColor("#ABF6AA")
        member.guild.channels.get('685105079191076876').send(embed)
        member.addRole('685105156165337113')
        message.channel.sendEmbed(embed);  
    })
    
//au~revoir
    client.on('guildMemberRemove', function (member) {
        let embed = new Discord.RichEmbed()
            .setDescription('**' + member.user.username + '** est partie sans auscun raison de ' + member.guild.name)
            .setFooter('Nous sommes désormais ' + member.guild.memberCount)
            .setColor("#ABF6AA")
        member.guild.channels.get('685105087953109003').send(embed)
        message.channel.sendEmbed(embed);  
    })

    //kick
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
  
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(":x: Vous n'avez pas la permission d'utiliser cette commande !;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send(":file_folder:  Veuillez mentionner un utilisateur")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send(":x: Je ne peux pas exclure cet utilisateur :frowning: ")
       member.kick()
       message.channel.send('**' + member.user.username + '** :Valide: a été exclu ')
    }
  })
  
//ban
client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'ban') {
     if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**:x: Vous n'avez pas la permission d'utiliser cette commande !**")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("**:file_folder: Veuillez mentionner un utilisateur**")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
     if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
     message.guild.ban(member, {days: 7})
     message.channel.send('**' + member.user.username + '**:white_check_mark: a été banni')
  }
})

client.on("message", function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  //warn
  if (args[0].toLowerCase() === prefix + "warn") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x: Vous n'avez pas la permission d'utiliser cette commande**")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("**:file_folder: Veuillez mentionner un membre**")
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send(":x: Vous ne pouvez pas warn ce membre")
      let reason = args.slice(2).join(' ')
      if (!reason) return message.channel.send("**:paperclips: Veuillez indiquer une raison**")
      if (!warns[member.id]) {
          warns[member.id] = []
      }
      warns[member.id].unshift({
          reason: reason,
          date: Date.now(),
          mod: message.author.id
      })
      fs.writeFileSync('./warns.json', JSON.stringify(warns))
      message.channel.send(":white_check_mark: User" + " a été warn pour " + reason)
  }

  //infractions
  if (args[0].toLowerCase() === prefix + "infractions") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x: Vous n'avez pas la permission d'utiliser cette commande**")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("**:file_folder: Veuillez mentionner un membre**")
      let embed = new Discord.RichEmbed()
          .setAuthor(member.user.username, member.user.displayAvatarURL)
          .addField('10 derniers warns', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "**:white_check_mark: Ce membre n'a aucun warns**"))
          .setColor("#ABF6AA")
          .setTimestamp()
      message.channel.send(embed)
  }
})

//unwarn
client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

if (args[0].toLowerCase() === prefix + "unwarn") {
      let member = message.mentions.members.first()
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x: Vous n'avez pas la permission d'utiliser cette commande.**")
      if(!member) return message.channel.send("**:file_folder: Membre introuvable**")
      if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
      if(!member.manageable) return message.channel.send("**:dart: Je ne pas unwarn ce membre.**")
      if(!warns[member.id] || !warns[member.id].length) return message.channel.send("**:o2: Ce membre n'a actuellement aucun warns.**")
      warns[member.id].shift()
      fs.writeFileSync('./warns.json', JSON.stringify(warns))
      message.channel.send("**:white_check_mark: Le dernier warn de " + "*member*" + " a été retiré :white_check_mark:**")
  }

//clear
if (args[0].toLowerCase() === prefix + "clear") {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
  let count = parseInt(args[1])
  if (!count) return message.channel.send(":file_folder: Veuillez indiquer un nombre de messages à supprimer")
  if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
  if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
  message.channel.bulkDelete(count + 1, true)
}

//mute
if (args[0].toLowerCase() === prefix + "mute") {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
  let member = message.mentions.members.first()
  if (!member) return message.channel.send(":file_folder: Membre introuvable")
  if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
  if (!member.manageable) return message.channel.send("Je ne peux pas mute ce membre")
  let muterole = message.guild.roles.find(role => role.name === 'Muted')
  if (muterole) {
      member.addRole(muterole)
      message.channel.send(member + ' a été mute :white_check_mark:')
  }
  else {
      message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
          message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
              channel.overwritePermissions(role, {
                  SEND_MESSAGES: false
              })
          })
          member.addRole(role)
          message.channel.send(member + ' a été mute :white_check_mark:')
      })
  }
}

//unmute
    if (args[0].toLowerCase() === prefix + "unmute") {
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
      let member = message.mentions.members.first()
      if(!member) return message.channel.send(":file_folder: Membre introuvable")
      if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
      if(!member.manageable) return message.channel.send("Je ne pas unmute ce membre.")
      let muterole = message.guild.roles.find(role => role.name === 'Muted')
      if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
      message.channel.send(member + ' a été unmute :white_check_mark:')
  }})

//info.discord
client.on('message', message => {

  if(message.content.startsWith(prefix + "infoDiscord")){
    var embed = new Discord.RichEmbed()
    .setDescription("Info Du Server Discord",)
    .addField("Nom Du Discord", message.guild.name)
    .addField("Crée Le", message.guild.createdAt)
    .addField("Tu As Rejoin Le ",message.guild.joinedAt)
    .addField("Utilisateurs Sur Le Discord", message.guild.memberCount)
    .setColor("#ABF6AA")
    message.channel.sendEmbed(embed)


}});

//ping
client.on('message', message => {

if (message.content.startsWith(prefix + "ping")) {
  const startTime = Date.now();
  message.channel.send(`:ping_pong: Pong !`)
  .then(msg => {
    const endTime = Date.now();
    msg.edit(`:ping_pong: Pong !(${endTime - startTime}ms)`);
  }
    )
}});

//dm

client.on('message', msg => {

if (msg.content.startsWith(prefix + "mp")) {
  if(!msg.guild.member(msg.author).hasPermission("VIEW_AUDIT_LOG")) return msg.channel.send(noperm);

  if (msg.deletable) msg.delete();
  if (msg.channel.type === "dm") return;
  let args = msg.content.split(" ").slice(1).join(" ");
  console.log('MP', '| Guild Name :', msg.guild.name, '| Message :', args, '| Msg author name :', msg.author.name)
  msg.guild.members.forEach(member => {
    member.send(args).catch(e => {});

      });
    }});