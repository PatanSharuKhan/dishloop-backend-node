var express = require("express")
var router = express.Router()
var User = require("../models/user.model")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")

router.post("/signin", async function (req, res, next) {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }
    // Here you would normally compare the password with a hashed version
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(422).json({ error: err.message })
      }
      if (!result) {
        return res.status(422).json({ error: "Invalid password" })
      }
      // Passwords match, proceed with JWT generation
      const token = jwt.sign(
        { email: user.email, password: user.password },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )
      // Here you would generate a JWT token and send it back to the client
      res.status(200).json({ message: "Signin success", jwtToken: token })
    })
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
})

module.exports = router
