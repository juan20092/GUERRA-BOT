let handler = async (m, { conn, participants, groupMetadata }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos')

  let bot = participants.find(p => p.id === conn.user.jid)
  let user = participants.find(p => p.id === m.sender)

  if (!bot || (bot.admin !== 'admin' && bot.admin !== 'superadmin')) {
    return m.reply('❌ El bot necesita ser admin')
  }

  if (!user || (user.admin !== 'admin' && user.admin !== 'superadmin')) {
    return m.reply('❌ Solo un admin puede usar este comando')
  }

  let users = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid
    : m.quoted
    ? [m.quoted.sender]
    : []

  if (!users.length) {
    return m.reply('⚠️ Menciona o responde al usuario a expulsar')
  }

  users = users.filter(u => {
    let p = participants.find(v => v.id === u)
    return p && p.admin !== 'admin' && p.admin !== 'superadmin'
  })

  if (!users.length) {
    return m.reply('⚠️ No puedes expulsar administradores')
  }

  let teks = `╭━━━〔 🚫 EXPULSIÓN EJECUTADA 🚫 〕━━━⬣
┃ 🏷️ Grupo: ${groupMetadata.subject}
┃ 👮 Admin: @${m.sender.split('@')[0]}
╰━━━━━━━━━━━━━━━━⬣

┏━━━〔 ⚠️ SALIDA DEL GRUPO ⚠️ 〕━━━⬣
`

  for (let u of users) {
    teks += `┃ ✦ @${u.split('@')[0]}\n`
  }

  teks += `┗━━━━━━━━━━━━━━━━⬣

💨 Tu ciclo en este grupo terminó.
🚪 La puerta queda cerrada.
👑 GUERRA BOT ejecutó la acción.`

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: users.concat([m.sender])
  }, { quoted: m })

  await conn.groupParticipantsUpdate(m.chat, users, 'remove')
}

handler.command = ['kick']
handler.tags = ['group']
handler.group = true
handler.admin = true

export default handler
