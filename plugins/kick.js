let handler = async (m, { conn, participants, groupMetadata }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos')

  let bot = participants.find(p => p.id === conn.user.jid)
  let user = participants.find(p => p.id === m.sender)

  // Verificar admin correctamente
  if (!bot || (bot.admin !== 'admin' && bot.admin !== 'superadmin')) {
    return m.reply('❌ El bot no es admin')
  }

  if (!user || (user.admin !== 'admin' && user.admin !== 'superadmin')) {
    return m.reply('❌ Tú no eres admin')
  }

  // Obtener usuarios a eliminar
  let users = m.mentionedJid && m.mentionedJid.length 
    ? m.mentionedJid 
    : m.quoted 
    ? [m.quoted.sender] 
    : []

  if (!users.length) {
    return m.reply('⚠️ Menciona o responde a alguien para expulsarlo')
  }

  // Evitar expulsar admins
  users = users.filter(u => {
    let p = participants.find(v => v.id === u)
    return p && p.admin !== 'admin' && p.admin !== 'superadmin'
  })

  if (!users.length) {
    return m.reply('⚠️ No puedes expulsar a otros admins')
  }

  let teks = `╭━━━〔 ⚠️ EXPULSIÓN ⚠️ 〕━━━⬣
┃ 🏷️ Grupo: ${groupMetadata.subject}
┃ 👮 Admin: @${m.sender.split('@')[0]}
╰━━━━━━━━━━━━━━━━⬣

┏━━━〔 🚫 USUARIOS ELIMINADOS 🚫 〕━━━⬣
`

  for (let u of users) {
    teks += `┃ ✦ @${u.split('@')[0]}\n`
  }

  teks += `┗━━━━━━━━━━━━━━━━⬣

💀 Acción ejecutada correctamente`

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: users.concat([m.sender])
  }, { quoted: m })

  // Ejecutar kick
  await conn.groupParticipantsUpdate(m.chat, users, 'remove')
}

handler.command = ['kick']
handler.tags = ['group']
handler.group = true
handler.admin = true

export default handler
