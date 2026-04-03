// Archivo: clan.js
global.clanes = global.clanes || {}  // Guardamos los clanes de los jugadores

let handler = async (m, { conn, text }) => {
    let user = m.sender

    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `❌ Por favor escribe el nombre de tu clan.\nEjemplo: *.clan GuerrerosZ*`
        }, { quoted: m })
    }

    // Limitar longitud del nombre del clan
    if (text.length > 20) {
        return conn.sendMessage(m.chat, {
            text: `⚠️ El nombre del clan no puede exceder 20 caracteres.`
        }, { quoted: m })
    }

    // Guardar el clan del usuario
    global.clanes[user] = text

    // Mensaje profesional gamer
    let teks = `╭━━━〔 👑 BLOOD STRIKE CLAN 〕━━━⬣
┃ ✦ Usuario: ${user.split("@")[0]}
┃ ✦ ¡Has creado tu clan con éxito!
┃ ✦ Nombre del clan: ${text.toUpperCase()}
┃
┃ 🔥 Este es tu sello personal en Blood Strike.
┃ 🛡️ Protege tu clan y domina las partidas con tu equipo.
╰━━━━━━━━━━━━━━━━━━━━⬣`

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = ['clan']
export default handler
