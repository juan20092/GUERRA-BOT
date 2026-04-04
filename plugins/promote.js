let handler = async (m, { conn }) => {
  try {
    if (!m.isGroup) {
      return m.reply('❌ Solo funciona en grupos.')
    }

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participants = groupMetadata.participants

    const senderData = participants.find(user => user.id === m.sender)
    const botData = participants.find(user => user.id === conn.user.jid)

    const isAdmin = senderData?.admin === 'admin' || senderData?.admin === 'superadmin'
    const isBotAdmin = botData?.admin === 'admin' || botData?.admin === 'superadmin'

    if (!isAdmin) return m.reply('❌ Solo admins.')
    if (!isBotAdmin) return m.reply('❌ El bot debe ser admin.')

    let user = m.mentionedJid[0]

    if (!user && m.quoted) {
      user = m.quoted.sender
    }

    if (!user) {
      return m.reply('❌ Etiqueta o responde al usuario.')
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    await conn.sendMessage(m.chat, {
      text: `✅ Nuevo admin:\n@${user.split('@')[0]}`,
      mentions: [user]
    })

  } catch (error) {
    console.log(error)
    m.reply('❌ Error al promover usuario.')
  }
}

handler.help = ['promote']
handler.tags = ['group']
handler.command = ['promote']

export default handler
