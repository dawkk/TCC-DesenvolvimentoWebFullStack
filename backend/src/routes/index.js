import express from "express";
import dishes from "./dishRoutes.js"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({})
  })

  app.use(
    express.json(),
    dishes
  )
}

export default routes;