import Contenedor from './contenedores/ContenedorDB.js'
import { options as optionsSQLite3 } from  './options/SQLite3.js'
import { options as optionsMariaDB } from  './options/mariaDB.js'

//const Contenedor = require(__dirname + '/contenedores/ContenedorDB.js')
//const { options } = require(__dirname + '/options/SQLite3.js')


const tablaMensajes = 'mensajes';
const tablaProductos = 'productos';
const sqlMensajes = new Contenedor(optionsSQLite3, tablaMensajes)
const sqlProductos = new Contenedor(optionsMariaDB, tablaProductos)

async function crearTablaMensajes() {
  return await sqlMensajes.knex.schema.dropTableIfExists(sqlMensajes.tabla)
    .finally(() => {
      return sqlMensajes.knex.schema.createTable(sqlMensajes.tabla, table => {
        table.increments('id').primary();
        table.string('email', 50).notNullable();
        table.string('mensaje', 100);
        table.string('fechaHora', 50).notNullable();
        
      })
    })
}


async function crearTablaProductos() {
  return await sqlProductos.knex.schema.dropTableIfExists(sqlProductos.tabla)
    .finally(() => {
      return sqlProductos.knex.schema.createTable(sqlProductos.tabla, table => {
        table.increments('id').primary();
        table.string('title', 50).notNullable();
        table.float('price');
        table.string('thumbnail', 100).notNullable();
        
      })
    })
}







try {
  
  await crearTablaMensajes();
  await crearTablaProductos();

  console.log(" Tablas creadas")

  /*
  const mensajesParaInsertar = [
    { email: 'lucas@gmail.com', fechaHora: "30/9/2021", mensaje: 'Hola'},
    { email: 'rodrigo@gmail.com', fechaHora: "30/9/2021", mensaje: 'Hola, como estas?'},
    { email: 'lucas@gmail.com', fechaHora: "30/9/2021", mensaje: 'Todo bien y vos?'},
    { email: 'rodrigo@gmail.com', fechaHora: "30/9/2021", mensaje: 'Todo bien por suerte'},
    { email: 'lucas@gmail.com', fechaHora: "30/9/2021", mensaje: 'En que andabas?'}        
  ]

  const articulosParaInsertar = [
    { title: 'Leche', price: 23.60, thumbnail: 'http:www.prod.com.ar/leche.png'},
    { title: 'Harina', price: 12.80, thumbnail: 'http:www.prod.com.ar/harina.png'},
    { title: 'DDL', price: 32.30, thumbnail: 'http:www.prod.com.ar/ddl.png'},
    { title: 'Fideos', price: 42.70, thumbnail: 'http:www.prod.com.ar/fideos.png'},
    { title: 'Crema', price: 67.90, thumbnail: 'http:www.prod.com.ar/crema.png'}        
  ]

  await sqlMensajes.save(mensajesParaInsertar)
  await sqlProductos.save(articulosParaInsertar)
  console.log("2) articulos insertados")
  */

  
/*
  
  //const articulosLeidos = await sqlMensajes.getAll()
  const articulosLeidos = await sqlProductos.getAll()
  console.log("3) articulos listado")
  console.table(articulosLeidos)
/*
  const nuevo = {
      title: 'QUESO',
      price: 19.99,
      thumbnail: 'http://www.prod.com.ar/queso.png'
  }
 */ 
  //const anterior = await sqlMensajes.changeById(2, nuevo)

  //const articulosLeidoss = await sqlMensajes.getAll()
  //console.log("3) articulos listado")
  //console.table(articulosLeidoss)
  //await sql.deleteById(2);
  //const productoId = await sql.getById(3);
  //console.log('Producto por ID', productoId);

  //await sql.deleteAll()

  //const articulosLeidoss = await sql.getAll()
  //console.log("3) articulos listado")
  //console.table(articulosLeidoss)

} catch (error) {
  console.log(error)
} finally {
  sqlMensajes.close()
  sqlProductos.close()
}
