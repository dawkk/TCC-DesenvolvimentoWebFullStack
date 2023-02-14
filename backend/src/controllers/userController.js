import users from "../models/user.js"
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  try {
    const secret = process.env.ACESS_TOKEN_SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

class UserController {



  static listUsers = (req, res) => {
    users.find()
      /* .populate('address') */
      .exec((err, users) => {
        if (err) {
          return res.status(400).send({ message: `${err.message} - Id de usuario não encontrado. ` })
        } else {
          return res.status(200).json(users)
        }
      }
      )
  }

  static listUserById = async (req, res) => {
    const id = req.params.id;

    const user = await users.findById(id, '-password')
      /* Lembrar de deixar o nome do esquema em singular, por ex menus é o esquema porem abaixo usamos menu */
      /*  .populate('menu', 'name') */
      .exec((err, users) => {
        if (err) {
          return res.status(400).send({ message: `${err.message} - Id do usuario não encontrado. ` })
        } else {
          return res.status(200).send(users)
        }

      }
      );
  }

  static createUser = async (req, res) => {
    /* para lembrar users aqui se refere ao schema/coleção que criamos no mongoose em models como referencia */
    let user = new users(req.body);
    const userExists = await users.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(422).send({ message: "Por favor, utilize outro e-mail!" });
    } else {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(req.body.password, salt);
      user.password = passwordHash;
      user.save((err) => {
        if (err) {
          return res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuario.` })
        } else {
          return res.status(201).send(user.toJSON())
        }
      })
    }
  }

  static updateUser = (req, res) => {
    const id = req.params.id;
    users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        return res.status(200).send({ message: 'usuario atualizado com sucesso!' })
      } else {
        return res.status(500).send({ message: err.message })
      }
    })
  }

  static deleteUser = (req, res) => {
    const id = req.params.id;
    users.findByIdAndDelete(id, (err) => {
      if (!err) {
        return res.status(200).send({ message: `usuario ${id} removido com sucesso!` })
      } else {
        return res.status(500).send({ message: err.message })
      }
    })
  }

  static listUserByEmail = (req, res) => {
    const email = req.query.email;

    users.find({ 'email': email }, {}, (err, users) => {
      if (!err) {
        return res.status(200).send(users)
      } else {
        return res.status(500).send({ message: err.message })
      }
    })
  }

  /* LOGIN */

  static loginUser = async (req, res) => {
    const { password, email } = req.body;
    const userExists = await users.findOne({ email: req.body.email });

    if (!email) {
      return res.status(422).send({ message: "O email é obrigatório!" });
    } if (!password) {
      return res.status(422).send({ message: "A senha é obrigatória!" });
    } if (!userExists) {
      return res.status(422).send({ message: "Por favor, utilize outro e-mail!" });
    }
    const checkPassword = await bcrypt.compare(req.body.password, userExists.password);
    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    } else {
      try {
      
        const payload = {
          id: users._id,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
        return res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24* 60 * 60 * 1000}).status(200).json({ message: "Autenticação realizada com sucesso!", accessToken, refreshToken });
      } catch(err){
        return res.status(500).json(err.message);
      }
    }
  }
}

export default UserController;