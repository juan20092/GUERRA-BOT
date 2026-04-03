let handler = async (m, { conn }) => {

  let teks = `╭━━━〔 ⚔️ 2 VERSUS 2 ⚔️ 〕━━━⬣
┃ 🕘 Horarios oficiales
┃ 🇲🇽 México: 10 PM
┃ 🇨🇴 Colombia: 11 PM
╰━━━━━━━━━━━━⬣

┏━━━〔 👥 JUGADORES PRESENTES 〕━━━⬣

┃ 👑 Escuadra Única
┃ 👑 ┇
┃ 🥷🏻 ┇

┗━━━━━━━━━━━━⬣

┏━━━〔 🔄 SUPLENTES 〕━━━⬣
┃ 🥷🏻 ┇
┃ 🥷🏻 ┇
┗━━━━━━━━━━━━⬣

╭━━━〔 📌 REACCIONES 〕━━━⬣
┃ ❤️ Participar
┃ 👍 Suplente
┃ 👎 Salir de lista
┃ ❌ Reiniciar lista
╰━━━━━━━━━━━━⬣

🔥 GUERRA BOT • CONTROL DE SALAS 👑`

  await conn.sendMessage(m.chat, {
    text: teks
  }, { quoted: m })
}

handler.command = ['2vs2']
handler.tags = ['games']

export default handler
