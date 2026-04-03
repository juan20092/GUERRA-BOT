let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos')

  let teks = '📢 *Mención general del grupo*\n\n'

  for (let user of participants) {
    teks += `⭔ @${user.id.split('@')[0]}\n`
  }

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map(v => v.id)
  }, { quoted: m })
}

handler.customPrefix = /^(\.?todos)$/i
handler.group = true;
handler.admin = true;
handler.command = new RegExp

export default handler
