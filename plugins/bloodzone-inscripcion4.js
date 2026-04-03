global.torneos = global.torneos || {}  // Guardamos los torneos y los inscritos

let handler = async (m, { conn, text }) => {
    let user = m.sender
    let botName = "GUERRA BOT"  // Cambia aquí si tu bot tiene otro nombre

    if (!text) {
        return conn.sendMessage(m.chat, { text: `❌ Usa: *.inscribirse <nombre del torneo>*\nEjemplo: *.inscribirse Torneo Blood Strike 1v1*` }, { quoted: m })
    }

    let torneo = text.trim()

    // Inicializar torneo si no existe
    if (!global.torneos[torneo]) global.torneos[torneo] = []

    // Verificar si ya está inscrito
    if (global.torneos[torneo].includes(user)) {
        return conn.sendMessage(m.chat, { text: `⚠️ Ya estás inscrito en el torneo "${torneo}"` }, { quoted: m })
    }

    // Agregar usuario al torneo
    global.torneos[torneo].push(user)

    // Preparar mensaje profesional gamer
    let inscritos = global.torneos[torneo].map(u => `• ${u.split("@")[0]}`).join("\n")
    let total = global.torneos[torneo].length

    let teks = `╭━━━〔 🏆 ${torneo.toUpperCase()} 〕━━━⬣
┃ ✦ Bot: ${botName}
┃ ✦ Jugador inscrito: ${user.split("@")[0]}
┃ ✦ Total de inscritos: ${total}
┃
┃ ✦ Lista de jugadores:
${inscritos}
┃
┃ 🔥 ¡Prepárate para dominar en Blood Strike!
╰━━━━━━━━━━━━━━━━━━━━⬣`

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = ['inscribirse']
export default handler
