import users from "../models/user.js"

class UserController {

  static listUsers = (req, res) => {
    users.find()
      /* .populate('address') */
      .exec((err, users) => {
        if(err) {
          res.status(400).send({message: `${err.message} - Id de usuario não encontrado. `})
        } else {
          res.status(200).json(users)
        }
      }
  )}

  static listUserById = (req, res) => {
    const id = req.params.id;
    users.findById(id)
    /* Lembrar de deixar o nome do esquema em singular, por ex menus é o esquema porem abaixo usamos menu */
     /*  .populate('menu', 'name') */
      .exec((err, users) => {
        if(err) {
          res.status(400).send({message: `${err.message} - Id do usuario não encontrado. `})
        } else {
          res.status(200).send(users)
        }
      }
    );
  }

  static createUser = (req, res) => {
    /* para lembrar users aqui se refere ao schema/coleção que criamos no mongoose em models como referencia */
    let user = new users(req.body);
    user.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao cadastrar usuario.`})
      } else {
        res.status(201).send(user.toJSON())
      }
    })
  }

  static updateUser = (req, res) => {
    const id = req.params.id;
    users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err){
        res.status(200).send({message: 'usuario atualizado com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteUser = (req, res) => {
    const id = req.params.id;
    users.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: `usuario ${id} removido com sucesso!`})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static listUserByEmail = (req, res) => {
    const email = req.query.email;

    users.find({'email': email}, {}, (err, users) => {
      if(!err){
        res.status(200).send(users)
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

}

export default UserController;