// Archivo: rank.js
global.ranks = global.ranks || {}  // Guardamos los rangos de jugadores

let handler = async (m, { conn }) => {
    let user = m.sender  // ID del usuario que pidió el rank
    global.ranks[user] = global.ranks[user] || {
        nivel: 1,
        puntos: 0,
        rango: 'Recluta'
    }

    let { nivel, puntos, rango } = global.ranks[user]

    let teks = `╭━━━〔 🔫 BLOOD STRIKE 〕━━━⬣
┃ ✦ Usuario: ${user.split("@")[0]}
┃ ✦ Nivel: ${nivel}
┃ ✦ Puntos: ${puntos}
┃ ✦ Rango: ${rango}
╰━━━━━━━━━━━━⬣`

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = ['rank']
export default handler
