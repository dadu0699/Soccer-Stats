const {Router} = require("express");
const router = Router();


router.get('/', (req, res) => {
    res.status(200).json({msg: "Hello-Worl, Server Player"});
});

module.exports = router;