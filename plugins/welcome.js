let handler = {}

handler.participantsUpdate = async ({ id, participants, action }, { conn }) => {
  if (action !== 'add') return

  let metadata = await conn.groupMetadata(id)
  let groupName = metadata.subject
  let total = metadata.participants.length

  for (let user of participants) {
    let pp

    try {
      pp = await conn.profilePictureUrl(user, 'image')
    } catch {
      pp = 'https://i.imgur.com/0zKXG6K.jpeg'
    }

    let name = await conn.getName(user)

    let teks = `╭━━━〔 🌟 BIENVENIDO 🌟 〕━━━⬣
┃ 🛸 Grupo: ${groupName}
┃ 👤 Nuevo: @${user.split('@')[0]}
┃ 👥 Miembros: ${total}
╰━━━━━━━━━━━━━━━━⬣

┏━━━〔 ⚡ MENSAJE ⚡ 〕━━━⬣
┃ 🔥 Hola ${name}, bienvenido al grupo
┃ ⚔️ Aquí no venimos a perder el tiempo
┃ 🚀 Activo o eliminado 😈
┗━━━━━━━━━━━━━━━━⬣

👑 GUERRA BOT • SYSTEM 👑`

    await conn.sendMessage(id, {
      image: { url: pp },
      caption: teks,
      mentions: [user]
    })
  }
}

export default handler
