// const { Schema, model } = require("mongoose");//Este trecho de código está importando o Schema e model do Mongoose. O Schema é usado para definir a estrutura dos documentos no MongoDB, enquanto o model é usado para criar um modelo baseado nesse esquema.

// // TODO: Please make sure you edit the user model to whatever makes sense in this case
// const userSchema = new Schema({// Aqui, um novo esquema (userSchema) é criado usando o construtor Schema do Mongoose. Este esquema define a estrutura dos documentos que serão armazenados na coleção do MongoDB.
//   username: {
//     type: String,
//     trim: true,//trim: true remove espaços em branco no início e no final do valor. 
//     require: [true, 'Username is required.'],//significa que o campo é obrigatório, e uma mensagem personalizada será exibida se não for fornecido
//     unique: true,//garante que nenhum outro documento na coleção tenha o mesmo valor para esse campo.
//   },
//   passwordHash: {
//     type: String,
//     require: [true, 'Password is required']
//   }
// });

// const User = model("User", userSchema);//Aqui, um modelo User é criado usando o model do Mongoose. Esse modelo é uma instância do esquema userSchema e será usado para interagir com a coleção "users" no MongoDB. O primeiro argumento é o nome da coleção no MongoDB (neste caso, "User"), e o segundo argumento é o esquema que define a estrutura dos documentos.

// module.exports = User;//Finalmente, o modelo User é exportado para que possa ser usado em outros arquivos do seu aplicativo.

// //*** Em resumo, esse código define um esquema de usuário com campos de username e passwordHash usando o Mongoose, cria um modelo baseado nesse esquema e exporta o modelo para uso em outras partes do código. Esse modelo pode ser usado para realizar operações no banco de dados MongoDB relacionadas aos usuários, como criar, ler, atualizar e excluir registros.*/


// models/User.model.js
const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("User", userSchema);
