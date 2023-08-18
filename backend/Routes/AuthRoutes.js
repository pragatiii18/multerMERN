const { Signup , Login} = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const filter = require("../util/filterBad");




const User = require("../Models/UserModel");

router.post("/check-username", async (req, res) => {
  const { username } = req.body;
  

  try {
    if (filter.isProfane(username)) {
      return res.status(400).json({
        isValidUsername: false,
        error: "Username cannot contain profanity",
      });
    }

    res.json({ isValidUsername: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while checking the username.",
    });
  }
});




router.post("/signup", Signup);
router.post('/login', Login)
router.post('/',userVerification)


router.get("/users", async (req, res) => {
    try {
      const users = await User.find({}, "username email image"); 
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "An error occurred while fetching users." });
    }
  });

  


  

module.exports = router;




// authRoutes.js





