const {Router} = require("express");
const router = Router();


router.get('/', (req, res) => {
    res.status(200).json({msj: "Hello-World, Server Competition"});
});

module.exports = router;