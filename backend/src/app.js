import express from "express";
import db from "./config/dbConnect.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso")
})

const app = express();
app.use(express.json())
/* routes(app); */

const dishes = [
  {id:1 , "nome": "Risoto de parmesão", "descrição": "Risoto ao ponto da casa finalizado com manteiga e parmesão da casa", "preço": 50},
  {id:2 , "nome": "Camarão ao molho", "descrição": "Camarão ao ponto da casa finalizado com molho especial", "preço": 70}
]

function getDishes(id) {
  return dishes.findIndex(dish => dish.id == id)
}


app.get('/', (req,res) => {
  res.status(200).send('Prato encontrado')
})

app.get('/dishes', (req, res) => {
  res.status(200).json(dishes)
})

app.get('/dishes/:id', (req, res) => {
  let index = getDishes(req.params.id);
  res.json(dishes[index]);
})

app.post('/dishes', (req, res) => {
  dishes.push(req.body);
  res.status(200).send('Prato cadastrado com sucesso')
})

app.put('/dishes/:id', (req, res) => {
  let index = getDishes(req.params.id);

  res.json(dishes);
})

app.delete('/dishes/:id', (req, res) => {
  let {id} = req.params;
  let index = getDishes(id);
  dishes.splice(index, 1);
  res.send(`Prato ${id} removido com sucesso`)

  res.json(dishes);
})


export default app