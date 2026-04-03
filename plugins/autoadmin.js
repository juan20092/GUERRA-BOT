let handler = async (m, { conn, isOwner }) => {
    // Solo owner
    if (!isOwner) {
        return m.reply('❌ Este comando es solo para el owner.')
    }

    // Solo grupos
    if (!m.isGroup) {
        return m.reply('❌ Este comando solo funciona en grupos.')
    }

    try {
        const groupMetadata = await conn.groupMetadata(m.chat)
        const botNumber = conn.user.jid
        const user = m.sender

        // Verificar si el bot es admin
        const botAdmin = groupMetadata.participants.find(p => p.jid === botNumber)?.admin
        if (!botAdmin) {
            return m.reply('❌ El bot necesita ser administrador para dar admin.')
        }

        // Verificar si el usuario ya es admin
        const userAdmin = groupMetadata.participants.find(p => p.jid === user)?.admin
        if (userAdmin) {
            return m.reply('✅ Ya eres administrador en este grupo.')
        }

        // Dar admin al usuario
        await conn.groupMakeAdmin(m.chat, [user])

        m.reply('✅ AutoAdmin activado: ahora eres administrador del grupo.')

    } catch (error) {
        console.log(error)
        m.reply('❌ No pude darte admin.')
    }
}

handler.command = ['autoadmin']
handler.rowner = true

export default handler
