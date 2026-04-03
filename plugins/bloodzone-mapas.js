let handler = async (m, { conn }) => {
    let teks = `╭━━━〔 🌍 MAPAS OFICIALES – BLOOD STRIKE 〕━━━⬣
┃ ✦ Deserted Valley (Mapa principal):
┃ - Sakura Valley
┃ - Rocket Base
┃ - Port
┃ - Missile Basement
┃ - Satellite Base
┃ - Wastewater Plant
┃ - Airforce Base
┃ - Energy Station
┃ - Trade Zone
┃
┃ ✦ Nuevos mapas:
┃ - Playa Cielo (Skyline Beach)
╰━━━━━━━━━━━━━━━━━━━━⬣`

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = ['mapas']
export default handler
