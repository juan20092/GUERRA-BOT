global.salas = global.salas || {}

let handler = async (m, { conn, text }) => {
    let id = m.chat

    // Espera que el usuario indique país y hora separados por |
    // Ejemplo: /16vs16 MEXICO | 10 PM
    if (!text || !text.includes('|')) {
        return conn.sendMessage(m.chat, { 
            text: 'Por favor indica el país y la hora separados por "|", ejemplo:\n/16vs16 MEXICO | 10 PM' 
        }, { quoted: m })
    }

    let [pais, hora] = text.split('|').map(t => t.trim())

    // Inicializa la sala 16vs16
    global.salas[id] = {
        jugadores: [],
        suplentes: [],
        pais: pais,
        horario: hora,
        msgId: null
    }

    let teks = `*16 𝐕𝐒 16*

*𝐏𝐀Í𝗦:* ${pais}
*⏰ 𝐇𝐎𝐑𝐀:* ${hora}

*𝐉𝐔𝐆𝐀𝐃𝐎𝗥𝐄𝗦 𝐏𝐑𝐄𝗦𝐄𝗡𝐓𝐄𝗦*;

*𝗘𝗦𝗖𝗨𝐀𝐃𝗥𝐀 1*
👑 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇

*𝗘𝗦𝗖𝗨𝐀𝐃𝗥𝐀 2*
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇

ㅤʚ *𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝗦*:
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇ 
🥷🏻 ┇

*𝖱𝖾𝖺𝖼𝖼𝗂𝗈𝗇𝖺:*
❤️ Participar
👍 Suplente
👎 Salir
❌ Reiniciar`

    let msg = await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
    global.salas[id].msgId = msg.key.id
}

handler.command = ['16vs16']
export default handler
