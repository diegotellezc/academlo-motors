const express = require("express")
const usersController = require("../controllers/users.controller")

const router = express.Router()

router.route("/")
    .get(usersController.findUsers)
    .post(usersController.createUser)

router.route("/:id")
    .get(usersController.findUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;