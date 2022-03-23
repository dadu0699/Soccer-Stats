const {Router} = require("express");
const router = Router();


router.get('/', (req, res) => {
    res.status(200).json({msg: "Hello-World, Server Team"});
});

module.exports = router;