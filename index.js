const express = require('express')
const port = 8080

const app = express()

app.use(express.static('./dist'))

app.listen(port, function(){
    console.log(`App listening at http://localhost:${port}`)
})