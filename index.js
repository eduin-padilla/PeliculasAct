const express = require('express')
const { getConnection } = require('./db/db-connection-mongo');
const app = express()
const port = 4000


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

getConnection();

app.use('/moduloDirector', require('./routes/moduloDirector'));
app.use('/moduloGenero', require('./routes/moduloGenero'));
app.use('/moduloTipo', require('./routes/moduloTipo'));
app.use('/moduloProductora', require('./routes/moduloProductora'))
app.use('/moduloMedia', require('./routes/moduloMedia'));

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
})

