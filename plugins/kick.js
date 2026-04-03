let handler = async (m, { conn, participants, groupMetadata }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos')

  let bot = participants.find(p => p.id == conn.user.jid)
  let user = participants.find(p => p.id == m.sender)

  if (!bot?.admin) return m.reply('❌ El bot no es admin')
  if (!user?.admin) return m.reply('❌ Tú no eres admin')

  let users = m.mentionedJid.length 
    ? m.mentionedJid 
    : m.quoted 
    ? [m.quoted.sender] 
    : []

  if (!users.length) {
    return m.reply('⚠️ Menciona o responde a alguien para expulsarlo')
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

💀 Acción ejecutada`

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: users.concat([m.sender])
  }, { quoted: m })

  // expulsar usuarios
  await conn.groupParticipantsUpdate(m.chat, users, 'remove')
}

handler.command = ['kick']
handler.tags = ['group']
handler.admin = true
handler.group = true

export default handler
