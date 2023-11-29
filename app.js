// invocar o importar express
const express = require('express');
const app = express();

// Permite capturar los datos de nuestros formularip media uriencoded
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//invocar o importar dotenv
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

//directorio public
app.use('/', express.static('public'));
app.use('/', express.static(__dirname + '/public'));

//Establecer motor de plantillas ejs
app.set('view engine', 'ejs');

//invoacr bcryptjs
const bcryptjs = require('bcryptjs');

//variable de session
const session = require('express-session');
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
/// invocar el modulo de conexion de nuestra db
const connection =require('./database/db')

/*app.get('/', (req, res)=>{
    res.send('Hello world');
})*/

app.get('/' , (req, res)=>{
    res.render('index');
})

app.get('/login' , (req, res)=>{
    res.render('login');
})

app.get('/register' , (req, res)=>{
    res.render('register');
})

//register
app.post('/register', async(req, res)=>{
    const user = req.body.user
    const name = req.body.name
    const rol = req.body.rol
    const pass = req.body.pass
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query ('INSERT INTO users SET ?' , {
        user:user, name:name, rol:rol, pass:passwordHash}, async(error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.send('Succesful resgistration')
        
        }
        
    })
})

app.listen(3000, (req, res)=>{
    console.log('Server running on https://localhost:3000/');
})


