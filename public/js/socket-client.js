//referencias al documento html
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');
//SOCKET DEL CLIENTE
const socket=io();

//Listener
//Con ON Escuchamos
socket.on('connect',()=>{
    console.log('Conectado al server');
    lblOffline.style.display='none';
    lblOnline.style.display='';

})

socket.on('disconnect',()=>{
    console.log('Desconectado al server');
    lblOnline.style.display='none';
    lblOffline.style.display='';
})
socket.on('enviar-mensaje',(payload) => {
    console.log(payload)
})



btnEnviar.addEventListener('click',()=> {
    
    const mensaje=txtMensaje.value;
    //Para emitir un mensaje al backend
    const payload ={
        mensaje,
        id: "1234",
        //fecha: new Date().getTime()
        fuente: "frontend"
    }
    //Usa como 3er parametro un callback que sera ejcutado en el servidor
    socket.emit('enviar-mensaje',payload, (respuestaServer)=>{
        console.log('Desde el Servidor:', respuestaServer)
    });
    
})