let handler = async (m, { conn }) => {
    // Solo grupos
    if (!m.isGroup) {
        return m.reply('❌ Este comando solo funciona en grupos.')
    }

    try {
        const groupMetadata = await conn.groupMetadata(m.chat)
        const botNumber = conn.user.jid

        // Revisar si el bot ya es admin
        const isAdmin = groupMetadata.participants.find(p => p.jid === botNumber)?.admin
        if (isAdmin) {
            return m.reply('✅ Ya soy administrador en este grupo.')
        }

        // Intentar promover al bot (solo funciona si hay otro admin que ejecute este comando)
        await conn.groupMakeAdmin(m.chat, [botNumber])
        m.reply('✅ Activado AutoAdmin: ahora soy administrador en este grupo. Podrás usar comandos de administración.')
    } catch (error) {
        console.log(error)
        m.reply('❌ No pude obtener permisos de administrador. Asegúrate de que haya un admin ejecutando el comando o de darme permisos manualmente.')
    }
}

// Definir comando
handler.command = ['autoadmin']
export default handler
