const socketController=(socket)=>
{
    
    console.log('Cliente Conectado',socket.id)
    socket.on('disconnect', ()=>{
        console.log('Cliente desconectado', socket.id);
    })
    console.log('cliente conectado', socket.id);

    //Ingresamos el nombre del emit que usa el cliente para recibirlo en el mensaje
    //Aqui se escucha cuando el cliente emite el mensaje
    socket.on('enviar-mensaje',(payload,callback)=> {
        const id=123456789;

        const respuesta ={
            
            id: id,
            //fecha: new Date().getTime(),
            fuente: "backend",
            payload
        }


        callback(respuesta);
        //callback(id);
        //console.log(payload)
        //Aqui el Servidor de sockets emite el mensaje
        //Aqui ya no se necesita el this.io primero porque no tiene acceso al this, segundo el io es para conexiones individuales especificas como una llamada api rest, en su lugar usamos socket directamente 
        //El metodo broadcasr le envia el mensaje a todos los clientes conectados menos al que lo origino
        socket.broadcast.emit('enviar-mensaje', payload)

        // **************CONClUCION**************
        // Tanto el callbacl como el emit hacen practicamente lo mismo porque el emit ejecutado por el cliente en el front end ejecuta envia un callback que el socket.on('enviar-mensaje') lo envia de vuelta.
        // La funcion socketController.broadcast.emit de igual manera pero a todos clientes conectados menos al que lo origino
        // 'enviar-mensaje' esta vnculado tanto en el frontend como en el backend
        // **************************************




    })
    
}
module.exports={
    socketController
}