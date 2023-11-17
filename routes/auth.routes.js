const mongoose = require('mongoose');//É a biblioteca que permite a interação com o MongoDB.
const { Router } = require('express');// É um objeto de roteador do Express usado para definir rotas.
const router = new Router();
const bcryptjs = require('bcryptjs')//É usado para hash e criptografar e guardar senhas de forma segura
const saltRounds = 10;//Define o número de "rounds" usados no algoritmo de hash bcrypt.
const User = require('../models/User.model');//É o modelo de usuário definido em algum lugar do seu código (provavelmente usando o Mongoose).

router.get("/signup", (req, res) => res.render("signup-form"));

router.get('/login', (req, res) => res.render('login-form'));//Estas rotas respondem a requisições GET para "/signup" e "/login", renderizando as respectivas páginas de cadastro e login.

// POST Routes
router.post("/signup", (req, res, next) => {//Esta rota vai basicamente coletar os dados do usuario e registra-lo em nosso banco de dados.
  
    const { username, email, password } = req.body;

    if (!email || !password) {
        res.render('signup-form', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
      }
  
    bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          email,
          username,
          passwordHash: hashedPassword
        });
      })
      .then((userFromDB) => {
        // console.log("Newly created user is: ", userFromDB);
        res.redirect("/userProfile");
      })
      .catch((error) => next(error));
  });

  router.post('/login', (req, res, next) => {//Esta rota responde a requisições POST para "/login". Ela verifica se o nome de usuário existe no banco de dados, compara a senha fornecida com o hash armazenado, e, se for bem-sucedido, armazena informações do usuário na sessão e redireciona para a página de perfil.
    console.log('SESSION =====> ', req.session);

    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.render('login-form', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
   
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log("Username not registered. ");
          res.render('login-form', { errorMessage: 'User not found and/or incorrect password.' });
          return;

        } else if (bcryptjs.compareSync(password, user.passwordHash)) {

            req.session.currentUser = user;
          res.render('user-profile', { user });

        } else {
          console.log("Incorrect password. ");
          res.render('login-form', { errorMessage: 'User not found and/or incorrect password.' });
        }
      })
      .catch(error => next(error));
  });

  router.post('/logout', (req, res, next) => {//Esta rota responde a requisições POST para "/logout". Ela destroi a sessão do usuário e redireciona para a página inicial
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  });

  router.get("/userProfile", (req, res) => {//Esta rota responde a requisições GET para "/userProfile" e renderiza a página de perfil do usuário, utilizando dados armazenados na sessão.
    res.render('user-profile', { userInSession: req.session.currentUser });
});

module.exports = router;//Exporta o roteador para ser usado em outros arquivos do seu projeto.

//**Este código faz parte de um sistema de autenticação básico, onde os usuários podem se cadastrar, fazer login, fazer logout e visualizar seus perfis. A segurança é melhorada com o uso de bcryptjs para o hashing de senhas. Certifique-se de que o modelo de usuário (User) está bem definido em algum lugar no seu código, e que você configurou o Express-session para armazenar informações da sessão do usuário. */