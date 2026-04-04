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
      return m.reply('❌ Solo administradores pueden cerrar el grupo.')
    }

    if (!isBotAdmin) {
      return m.reply('❌ Necesito ser admin para cerrar el grupo.')
    }

    await conn.groupSettingUpdate(m.chat, 'announcement')

    await conn.sendMessage(m.chat, {
      text: `🔒 *GRUPO CERRADO*\n\nSolo administradores pueden enviar mensajes.`
    })

  } catch (error) {
    console.log(error)
    m.reply('❌ Error al cerrar el grupo.')
  }
}

handler.help = ['close']
handler.tags = ['group']
handler.command = ['close']

export default handler
