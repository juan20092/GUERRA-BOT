import ytdl from 'ytdl-core'
import yts from 'yt-search'
import fs from 'fs'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Escribe el nombre de la canción o el link de YouTube.')

    try {
        let videoUrl = text

        // Si no es link de YouTube, buscamos por nombre
        if (!text.includes('youtube.com') && !text.includes('youtu.be')) {
            const r = await yts(text)
            if (!r || !r.videos.length) return m.reply('❌ No se encontró la canción.')
            videoUrl = r.videos[0].url
        }

        // Obtener info del video
        const info = await ytdl.getInfo(videoUrl)
        const title = info.videoDetails.title
        const thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url
        const length = new Date(info.videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8)

        // Archivo temporal
        const path = `/tmp/${info.videoDetails.videoId}.mp3`

        // Descargar audio
        const stream = ytdl.downloadFromInfo(info, { filter: 'audioonly' })
        stream.pipe(fs.createWriteStream(path)).on('finish', async () => {
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(path),
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: `Duración: ${length}`,
                        mediaType: 2,
                        thumbnail: (await (await fetch(thumbnail)).arrayBuffer())
                    }
                }
            }, { quoted: m })

            fs.unlinkSync(path)  // limpiar archivo temporal
        })

    } catch (err) {
        console.log(err)
        m.reply('❌ Ocurrió un error al buscar o descargar la canción.')
    }
}

handler.command = ['play']
export default handler
