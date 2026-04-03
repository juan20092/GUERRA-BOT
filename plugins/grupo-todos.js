let handler = async (m, { conn, participants, groupMetadata, text }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos')

  let usuarios = participants.map(v => v.id)
  let total = participants.length
  let groupName = groupMetadata.subject

  let mensaje = text ? text : 'Atención grupo'

  let teks = `┏━━━━━━━━━━━┓
┃  🛸 𝖦𝗋𝗎𝗉𝗈: ${groupName}
┃  👥 𝖬𝗂𝖾𝗆𝖻𝗋𝗈𝗌: ${total}
┗━━━━━━━━━━━┛
┌──⭓ *${mensaje}*\n`

  for (let user of participants) {
    teks += `🍷 @${user.id.split('@')[0]}\n`
  }

  teks += `└───────⭓

𝘎𝘜𝘌𝘙𝘙𝘈 𝘉𝘖𝘛 👑`

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: usuarios
  }, { quoted: m })
}

handler.command = ['todos']
handler.tags = ['group']

export default handler
