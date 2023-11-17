

// // ℹ️ Gets access to environment variables/settings
// // https://www.npmjs.com/package/dotenv
// require('dotenv/config'); //**Este trecho de código usa o pacote dotenv para carregar variáveis de ambiente a partir de um arquivo .env. Variáveis de ambiente são frequentemente usadas para armazenar configurações sensíveis, como chaves de API, URLs de banco de dados, etc. */

// // ℹ️ Connects to the database
// require('./db');

// // Handles http requests (express is node js framework)
// // https://www.npmjs.com/package/express
// const express = require('express');

// // Handles the handlebars
// // https://www.npmjs.com/package/hbs
// const hbs = require('hbs');

// const app = express();

// // ℹ️ This function is getting exported from the config folder. It runs most middlewares
// require('./config')(app);//**Este trecho de código importa e executa um módulo localizado no diretório config. */
// require('./config/session.config')(app);
// // Servidor para arquivos estaticos da pasta "publica - eh um teste para carregar imagens"
// app.use(express.static('public'));//**Este trecho configura o Express para servir arquivos estáticos do diretório "public". Isso é útil para arquivos que não mudam frequentemente, como imagens, folhas de estilo (CSS), e scripts do lado do cliente (JavaScript).  */


// // default value for title local
// const projectName = 'lab-express-basic-auth';
// const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// // 👇 Start handling routes here
// const index = require('./routes/index');
// app.use('/', index);

// // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require('./error-handling')(app);

// module.exports = app;


// :símbolo_informações: Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
// :símbolo_informações: Connects to the database
require("./db");
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();
require("./config/session.config")(app);
// :símbolo_informações: This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);
// default value for title local
const projectName = "lab-express-basic-auth";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;
// :apontando_para_baixo: Start handling routes here
const index = require("./routes/index");
app.use("/", index);
// authRouter needs to be added so paste the following lines:
const authRouter = require("./routes/auth.routes"); // <== has to be added
app.use("/", authRouter); // <== has to be added

const mainRouter = require('./routes/main'); // <== has to be added
app.use('/', mainRouter);

const privateRouter = require('./routes/private'); // <== pra criacao da rota privada.
app.use('/', privateRouter);
// ...
// :exclamação: To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
module.exports = app;
