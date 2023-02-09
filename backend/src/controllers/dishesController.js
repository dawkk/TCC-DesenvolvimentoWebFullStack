import dishes from "../models/dish.js";

class DishController {

  static listDishes = (req, res) => {
    dishes.find((err, dishes) => {
      res.status(200).json(dishes)
  })}

  static listDishById = (req, res) => {
    const id = req.params.id;
    dishes.findById(id, (err, dishes) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do prato não encontrado. `})
      } else {
        res.status(200).send(dishes)
      }

    });

  }

  static createDish = (req, res) => {
    /* para lembrar dishes aqui se refere ao schema/coleção que criamos no mongoose em models como referencia */
    let dish = new dishes(req.body);
    dish.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao cadastrar prato.`})
      } else {
        res.status(201).send(dish.toJSON())
      }
    })
  }

  static updateDish = (req, res) => {
    const id = req.params.id;
    dishes.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err){
        res.status(200).send({message: 'Prato atualizado com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteDish = (req, res) => {
    const id = req.params.id;
    dishes.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: `Prato ${id} removido com sucesso!`})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

}

export default DishController;