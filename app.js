const express = require('express')
const app = express()

app.use(express.static('./dist/ngApp'));

app.listen(3000, function () {
});