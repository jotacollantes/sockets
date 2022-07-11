const express = require('express')
const cors =require('cors');
const { socketController } = require('../sockets/controller');
// const {dbConnection}=require('../database/config');
// const fileUpload = require('express-fileupload');
class Server {
    
    constructor() {
        this.app = express()
        this.port=process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io =require('socket.io')(this.server);


        // this.usuariosPath='/api/usuarios';
        // this.authPath='/api/auth';
        //Mejor defino un objeto de JS para los paths
        this.appPaths={
            // auth: '/api/auth',
            // buscar: '/api/buscar',
            // usuarios:'/api/usuarios',
            // categorias:'/api/categorias',
            // productos:'/api/productos',
            // uploads:'/api/uploads',
        }

        
        //Middlewares
        this.middlewares();
       //Rutas de mi aplicacion
        this.routes();
        this.sockets();
        
    }


 

    //Estos middlewares se ejecutan antes de llegar a las rutas
    middlewares(){
        //Aqui se configuran los middlewares
        //Directorio Publico
        //Aqui se publicara el index.html que esta en la carpeta publica.
        this.app.use(express.static('public'));
        //Cors para controlar los accesos

        this.app.use(cors());
    }
    routes()
    {
          //Creamos las rutas  para el crud de usuarios y para la autenticacion haciendo sus respectivos requires
          //this.app.use(this.appPaths.auth,require('../routes/auth')) 
        }

    sockets() {
            //this.io.on( 'connection',(socket) =>{})
            //ahora el callback lo manejamos dentro del controlador socketController
            //this.io.on se encarga de enviar el objeto socket al contorlador socketController
            this.io.on( 'connection',socketController)
    }

    listen()
    {
        this.server.listen(this.port,() => {
        console.log(`Corriendo en puerto: ${this.port}`)
    })}
}
module.exports=Server;