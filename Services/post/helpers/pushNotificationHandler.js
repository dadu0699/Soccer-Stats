const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const favoriteModel = require('../models/favorite.model');

const sendPushNotification = (req, _res) => {
  const url = new URL(process.env.PUSH_NOTIFICATIONS_URL);
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.PUSH_NOTIFICATIONS_TOKEN}`,
    },
    body: '',
  };
  const body = {
    app_id: process.env.PUSH_NOTIFICATIONS_ID,
    include_external_user_ids: [],
    channel_for_external_user_ids: 'push',
    data: {
      notificacion: '',
    },
    contents: {
      en: '',
      es: '',
    },
    headings: {
      en: 'Soccer Stats',
      es: 'Soccer Stats',
    },
  };

  favoriteModel.obtenerUsuarios(req.body, async (err, results) => {
    let favorite = '';

    body['include_external_user_ids'] = results.map((result) => {
      favorite = result['nombre'];
      return result.usuarioID.toString();
    });
    body['data'][
      'notificacion'
    ] = `Nueva noticia de tu equipo favorito: ${favorite}`;
    body['contents']['en'] = `New news from your favorite team: ${favorite}`;
    body['contents']['es'] = `Nueva noticia de tu equipo favorito: ${favorite}`;

    settings.body = JSON.stringify(body);

    if (!err) {
      try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();

        if (data['errors']) console.log(data['errors']);
      } catch (error) {
        console.log(error);
      }
    }
  });
};

module.exports = { sendPushNotification };
