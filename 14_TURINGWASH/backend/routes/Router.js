const express = require("express")
const router = express()

router.use("/api/admins", require("./AdminRoutes"))
router.use("/api/users", require("./UserRoutes"))
router.use("/api/cars", require("./CarRoutes"))

// test route
router.get("/", (req, res) => {
  res.send("API Working!")
})

module.exports = router