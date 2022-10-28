//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const {Occupation} = require('../api/src/db');

const getAllOccup = async () => {
  const occApi = await axios.get('https://breakingbadapi.com/api/characters');
  let occu = occApi.data.map(el => el.occupation).flat();
  const occ = [];
  for (let i = 0; i < occu.length; i++) {
    if(!occ.includes(occu[i])) occ.push(occu[i]);
  }
  const occs = occ.map(el => {
    return {
      name: el
    }
  });
  return occs;
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
     const occsDb = await Occupation.findAll();
    if(!occsDb.length) {
      let occs = await getAllOccup();
      await Occupation.bulkCreate(occs);
    }
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
