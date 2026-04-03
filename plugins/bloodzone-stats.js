global.stats = global.stats || {}  // Datos de jugadores
global.ranks = global.ranks || {} // Rango según puntos

let handler = async (m, { conn }) => {
    let user = m.sender

    // Inicializar stats si no existen
    if (!global.stats[user]) {
        global.stats[user] = {
            kills: 0,
            partidas: 0,
            victorias: 0,
            derrotas: 0,
            precision: 0 // porcentaje
        }
    }

    if (!global.ranks[user]) global.ranks[user] = { puntos: 0, nivel: 1 }

    let { kills, partidas, victorias, derrotas, precision } = global.stats[user]
    let { puntos, nivel } = global.ranks[user]

    // Asignar rango según puntos
    let rango = ''
    if (puntos >= 3000) rango = 'Mítico'
    else if (puntos >= 2100) rango = 'Leyenda'
    else if (puntos >= 1500) rango = 'Maestro'
    else if (puntos >= 1000) rango = 'Diamante'
    else if (puntos >= 600) rango = 'Platino'
    else if (puntos >= 300) rango = 'Oro'
    else if (puntos >= 100) rango = 'Plata'
    else rango = 'Bronce'

    let teks = `╭━━━〔 🎮 BLOOD STRIKE STATS 〕━━━⬣
┃ ✦ Usuario: ${user.split("@")[0]}
┃ ✦ Nivel: ${nivel} | Rango: ${rango}
┃ ✦ Puntos: ${puntos}
┃
┃ ✦ Kills: ${kills}
┃ ✦ Partidas: ${partidas} (Victorias: ${victorias} | Derrotas: ${derrotas})
┃ ✦ Precisión: ${precision}%
┃
┃ ✦ Progreso: ${rango === 'Mítico' ? '🔥 Máximo Rango 🔥' : '🔝 Sigue subiendo!'}
╰━━━━━━━━━━━━━━━━━━━━⬣`

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = ['stats']
export default handler
