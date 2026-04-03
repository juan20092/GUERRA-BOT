global.salas = global.salas || {}

let handler = async (m, { conn, text }) => {
    let id = m.chat

    // Verifica que se indique país y hora separados por "|"
    if (!text || !text.includes('|')) {
        return conn.sendMessage(m.chat, { 
            text: '❌ Por favor indica el país y la hora separados por "|", ejemplo:\n/2vs2 MEXICO | 10 PM' 
        }, { quoted: m })
    }

    let [pais, hora] = text.split('|').map(t => t.trim())

    // Inicializa la sala 2vs2
    global.salas[id] = {
        jugadores: [],
        suplentes: [],
        pais: pais,
        horario: hora,
        msgId: null
    }

    // Mensaje de la sala con reacciones
    let teks = `*2 𝐕𝐒 2*

*🌎 PAÍS:* ${pais}
*⏰ HORA:* ${hora}

*🎮 JUGADORES PRESENTES*;

*🛡️ ESCUADRA ÚNICA*
👑 ┇ 
🥷🏻 ┇

ㅤʚ *SUPLENTES*:
🥷🏻 ┇

*⚡ REACCIONES:*  
❤️ Participar  
👍 Suplente  
👎 Salir  
❌ Reiniciar`

    // Enviar mensaje
    let msg = await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
    global.salas[id].msgId = msg.key.id
}

handler.command = ['2vs2']
export default handler
