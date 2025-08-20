import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import agoraToken from 'agora-token';

dotenv.config();

const { RtcTokenBuilder, RtcRole } = agoraToken;

const app = express();
app.use(cors()); // Habilita CORS para permitir peticiones desde tu frontend

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

app.get('/', (req, res) => {
  res.send('Servidor de Agora Token funcionando correctamente');
});

app.get('/token', (req, res) => {
  const channelName = req.query.channel;
  if (!channelName) {
    return res.status(400).json({ error: 'Channel name is required' });
  }

  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
