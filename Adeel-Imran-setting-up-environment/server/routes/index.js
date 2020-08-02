const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
    const route = path.resolve(__dirname, '../../dist/index.html');
    res.sendFile(route);
});

module.exports = router;
