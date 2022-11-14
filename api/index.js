const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const routes = require('./src/routes/dogs')


// const app = express();
// //concexion a la bd
// try {
//   await conn.authenticate();
//   console.log("conexiòn correcta a la bd")
// } catch (error) {
//   console.log(error);
// }
// Syncing all the models at once.


conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

// server.listen("3001", async () => {
//   await conn.sync();
//   console.log("listening on port 3001")
// })
