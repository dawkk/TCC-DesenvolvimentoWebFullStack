import express from "express";
import dishes from "./dishRoutes.js"
import menus from "./menuRoutes.js"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({})
  })

  app.use(
    express.json(),
    dishes,
    menus
  )
}

export default routes;