var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const cors = require("cors")
require("dotenv").config()
var jwt = require("jsonwebtoken")

const swaggerDocument = YAML.load("./docs/swagger.yaml")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var menuRouter = require("./routes/menu")
var restaurantRouter = require("./routes/restaurants")
var orderRouter = require("./routes/orders")

var app = express()

const corsOptions = {
  origin: ["http://localhost:3002"],
  credentials: true,
}

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(cors(corsOptions))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  if (req.path === "/signin" || req.path === "/users") {
    return next()
  } else {
    try {
      const jwtToken = req.cookies.token
      if (!jwtToken) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      // Verify the JWT token
      const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)
      if (!payload) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      req.user = payload
      next()
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" })
    }
  }
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/menu", menuRouter)
app.use("/restaurants", restaurantRouter)
app.use("/orders", orderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ error: "Error" })
})

module.exports = app
