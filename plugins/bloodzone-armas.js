// Archivo: armas.js
global.bloodStrikeArmas = global.bloodStrikeArmas || {
    bloqueadas: []  // armas que ya eligieron en la sala
}

let handler = async (m, { conn, text }) => {
    let id = m.chat
    let elegido = text?.trim().toLowerCase()
    
    // Lista de armas disponibles (nombres en minúsculas para comparación)
    const armasDisponibles = [
        "ak47", "kag-6", "m4a1", "scar", "vss", "ar97",          // Assault Rifles
        "p90", "vector", "urb", "inp-9",                         // SMG
        "origin-12", "mp155",                                   // Shotguns
        "kala", "m700", "bow",                                  // Sniper Rifles
        "glock", "deagle",                                      // Pistolas
        "dagger", "katana", "axe", "baseball bat"               // Cuerpo a cuerpo
    ]

    if (!elegido) {
        return conn.sendMessage(m.chat, { text: `╭━━━〔 🔫 BLOOD STRIKE ARMAS 〕━━━⬣
┃ ✦ Elige un arma entre las siguientes:
┃
┃ • Rifles de asalto: AK47, KAG-6, M4A1, SCAR, VSS, AR97
┃ • SMG: P90, Vector, URB, INP-9
┃ • Escopetas: Origin-12, MP155
┃ • Francotiradores: Kala, M700, Bow
┃ • Pistolas: Glock, Deagle
┃ • Cuerpo a cuerpo: Dagger, Katana, Axe, Baseball Bat
╰━━━━━━━━━━━━━━━━⬣
Usa: *.armas <nombre del arma>* para elegir.` }, { quoted: m })
    }

    // Validar si existe el arma en la lista
    if (!armasDisponibles.includes(elegido)) {
        return conn.sendMessage(m.chat, { text: `❌ Arma no encontrada. Usa una de la lista oficial del juego.` }, { quoted: m })
    }

    // Verificar si ya está bloqueada
    if (global.bloodStrikeArmas.bloqueadas.includes(elegido)) {
        return conn.sendMessage(m.chat, { text: `⚠️ Esa arma ya ha sido elegida por otro jugador para este torneo.` }, { quoted: m })
    }

    // Bloquear el arma para la sala
    global.bloodStrikeArmas.bloqueadas.push(elegido)

    let teks = `✅ *Arma Seleccionada para Blood Strike*
• ${elegido.replace(/-/g, " ").toUpperCase()}  
• Estado: 🛡️ BLOQUEADA para otros jugadores en este torneo

🔫 Si quieres cancelar esta arma usa: *.armas reset*`

    // Permite resetear la lista
    if (elegido === "reset") {
        global.bloodStrikeArmas.bloqueadas = []
        teks = `♻️ Todas las armas han sido *desbloqueadas* y ahora pueden ser elegidas de nuevo.`
    }

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = ['armas']
export default handler
