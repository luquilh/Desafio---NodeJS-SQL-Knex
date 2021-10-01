//const express = require('express')
//const { Server: HttpServer } = require('http')
//const { Server: Socket } = require('socket.io')

import express from 'express'
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

import Contenedor from './contenedores/ContenedorDB.js'
import {options as optionsSQLite3} from './options/SQLite3.js'
import { options as optionsMariaDB } from './options/mariaDB.js'

const tablaMensajes = 'mensajes';
const tablaProductos = 'productos';

const chatCont = new Contenedor(optionsSQLite3, tablaMensajes);
const productosCont = new Contenedor(optionsMariaDB, tablaProductos)

//const productosCont = new Contenedor('./productos.txt');
//const chatCont = new Contenedor('./historialChat.txt');


let productos = [];
const catalogo = await productosCont.getAll()
productos = catalogo.slice();

let mensajes=[];
const historial = await chatCont.getAll();
mensajes = historial.slice();


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', productos);
    // carga inicial de mensaje
    socket.emit('mensajes', mensajes);

    // actualizacion de productos
    socket.on('update', producto => {
        productosCont.save(producto);
        productos.push(producto)
        io.sockets.emit('productos', productos);
    })

    //actualizacion de mensajes
    socket.on('nuevo-mensaje', data => {
        chatCont.save(data);
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
