let handler = async (m, { conn }) => {
  try {
    if (!m.isGroup) {
      return m.reply('❌ Este comando solo funciona dentro de grupos.')
    }

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participants = groupMetadata.participants

    const senderData = participants.find(user => user.id === m.sender)
    const botData = participants.find(user => user.id === conn.user.jid)

    const isAdmin = senderData?.admin === 'admin' || senderData?.admin === 'superadmin'
    const isBotAdmin = botData?.admin === 'admin' || botData?.admin === 'superadmin'

    if (!isAdmin) {
      return m.reply('❌ Solo los administradores pueden abrir el grupo.')
    }

    if (!isBotAdmin) {
      return m.reply('❌ Necesito ser administrador para abrir el grupo.')
    }

    await conn.groupSettingUpdate(m.chat, 'not_announcement')

    await conn.sendMessage(m.chat, {
      text: `✅ *GRUPO ABIERTO*\n\nAhora todos los participantes pueden enviar mensajes.`
    })

  } catch (error) {
    console.log(error)
    m.reply('❌ Ocurrió un error al abrir el grupo.')
  }
}

handler.help = ['open']
handler.tags = ['group']
handler.command = ['open']

export default handler
