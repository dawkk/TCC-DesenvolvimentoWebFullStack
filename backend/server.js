import app from './src/app.js'

const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})