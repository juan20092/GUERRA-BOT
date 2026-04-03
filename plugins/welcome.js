export async function before(m, { conn, participants, action }) {
  if (!m.isGroup) return

  let chat = global.db.data.chats[m.chat]
  if (!chat.welcome) return

  if (action === 'add') {
    for (let user of participants) {
      let name = await conn.getName(user)

      let teks = `╭━━━〔 👑 BIENVENIDO VIP 👑 〕━━━⬣
┃ ✨ Hola @${user.split('@')[0]}
┃ 🏷️ Bienvenido a este grupo
┃ 🚀 Ahora formas parte de la comunidad
╰━━━━━━━━━━━━━━━━⬣

┏━━━〔 📌 REGLAS BÁSICAS 〕━━━⬣
┃ ⚠️ Respeto obligatorio
┃ 🚫 Nada de spam
┃ 🔥 Participa activamente
┗━━━━━━━━━━━━━━━━⬣

💎 GUERRA BOT • SISTEMA VIP`

      await conn.sendMessage(m.chat, {
        image: { url: 'https://api.dix.lat/media/img_1775195377061_9uFt_bPM2.jpg' },
        caption: teks,
        mentions: [user]
      })
    }
  }

  if (action === 'remove') {
    for (let user of participants) {
      await conn.sendMessage(m.chat, {
        text: `💨 @${user.split('@')[0]} salió del grupo.\n👑 GUERRA BOT registra su salida.`,
        mentions: [user]
      })
    }
  }
}
