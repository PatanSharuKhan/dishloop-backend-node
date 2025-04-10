var express = require("express")
var messages = require("./messages")
var router = express.Router()
var User = require("../models/user.model.ts")

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({})
    res.status(200).json({ message: messages.success.fetch, users })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.get("/:id", async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ message: messages.success.fetch, user })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.post("/", async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password })
    res.status(200).json({ message: messages.success.create })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.put("/:id", async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.updateOne({ _id: req.params.id }, { email, password })
    if (user.acknowledged) {
      res.status(200).json({ message: messages.success.update, user })
    } else {
      res.status(403).json({ message: 'something went wrong', user })
    }
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: messages.success.delete, user })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

module.exports = router
