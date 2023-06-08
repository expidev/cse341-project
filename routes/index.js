const homeController = require("../controllers/homeController")
const express = require("express")


const routes = express.Router()

routes.get('/', homeController.sendName)

module.exports = routes;

