# ESTADIO - SERVIDOR

### REQUERIMIENTOS:

- nodejs
- npm

### PUERTO:

- 5004

### DEPENDENCIAS:

- aws-sdk
- cors
- cross-env
- dotenv
- express
- jsonwebtoken
- morgan
- mysql

### DEPENDENCIAS DE DESARROLLO:

- nodemon
- jest
- supertest

<br>

### INSTALAR DEPENDENCIAS:
Posicionarse en la carpeta inicial del proyecto y escribir el siguiente comando:
```
npm install
```

### EJECUTAR APLICACION:

```
npm run start
```

### EJECUTAR APLICACION PARA DESARROLLO:

```
npm run dev
```

### EJECUTAR PRUEBAS:

```
npm run test
```

<br>

### CONEXION A MYSQL

El archivo **src->keys_db.js** contiene las credencias de la base de datos.

```javascript
let db_credentials = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
}
```

El archivo **src->db_connection.js** hace la conexion a la base de datos.

- Se importa el modulo de mysql, credenciales de base de datos y se hace la conexion.

```javascript
var mysql = require("mysql");
var keys = require("./keys_db");
var pool = mysql.createPool(keys);

pool.getConnection(function(err){
    if(err) throw err;
    console.log("DB MySQL is connected");
});

module.exports = pool;
```

<br>

### AUTORIZACION A RUTAS

El archivo **src->utils->jwt.js** se encarga de dar acceso a las rutas, segun el rol del usuario.

- Metodo **verificarToken**:
  - Valida si viene cabecera de autorizacion.
  - Valida si el token esta vacio.
  - Verifica si el token es correcto.

- Metodo **isAdminOrEmployee** se encarga de verificar el rol del usuario.

- Metodo **userID** devuelve el id del usuario, que contiene el token.

<br>

### GUARDAR EN BITACORA

El archivo **src->utils->binnacle.js** se encarga de guardar las acciones del usuario en BD.

- Metodo **saveBinnacle** guarda los datos en tabla bitacora en DB.

<br>

### GUARDAR EN S3

Importamos modulos y hacemos la conexion a s3 usando las credenciales:

```javascript
const aws = require('aws-sdk');
const s3 = new aws.S3({region: process.env.S3_REGION, accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY});
```

Como se desea guardar imagenes, se formatea la base 64, para quitar la parte de: **data:image/png;base64,**

```javascript
let inicio = photo.indexOf(',')+1;
let fin = photo.length;
const newBase64 = await photo.substring(inicio,fin);
```

Se converte a base64:

```javascript
let buffer = await new Buffer.from(newBase64, 'base64'); 
```

Creamos parametros para s3:

- **Bucket**: nombre del bucket en s3.
- **Key**: ruta y nombre donde queremos guardar imagen.
- **Body**: base64 de la imagen.

```javascript
let params ={
    Bucket: process.env.S3_BUCKET,
    Key: "estadios/"+nombre+"."+extension,
    Body: buffer
};
```

Guardamos en s3:

```javascript
await s3.putObject(params).promise()
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
```

<br>

### CONSUMO DE ENDPOINTS:

En la carpeta **src->routes** podemos encontrar los distintos archivos para el consumo de endpoints:

- **create.route.js**: Crear estadio.
- **delete.rouste.js**: Eliminar estadio.
- **get.all.js**: Obtener todos los estadios.
- **get.one.js**: Obtener un estadio.
- **update.route.js**: Actualizar estadio.

Dentro de estos archivos se encuentra la logica segun su objetivo, como por ejemplo en endpoint encargado de eliminar estadio:

```javascript
router.delete('/', [verificarToken,isAdminOrEmployee], (req, res) => { ............ }
```

- Tiene tipo de peticione.
- Con los metodos mencionados anteriormente, verifica token y valida rol de usuario.
- Realiza accion en DB segun objetivo.
- Si todo va bien, guarda accion en bitacora en DB.

<br>

### PRUEBAS UNITARIAS

Se realizaron con Jest y Supertest, podemos encontrar las pruebas realizadas en **tests->index.spec.js**

- **test**: Contiene la prueba a realizar, ya sea post, update, get o delete
- **describe**: Es como un bloque, el cual contiene un conjunto de test.
- **expect**: Valida si lo que se quiere obtener o comparar es asi.

Para realizarlas, se importa el servidor de express y el modulo de supertest.

```javascript
const app = require("../src/index");
const request = require("supertest");
```

En este caso, en el describe, como su nombre lo dice, se describe el tipo de peticion y a que ruta queremos hacerla, por ejemplo:

```javascript
describe('POST /stadium', () => {
    //aca los test
});  
```

En el test, se describe que deberia o que esperamos de la prueba, por ejemplo:

```javascript
test('Should respond with a 500 status code', async () => {
    //aca la peticion y lo que se espera
});
```

Para el tipo de pepticion, se realiza de la siguiente forma:

- **set**: Por medio de este se puede enviar una cabecera.
- **send**: Se hace la peticion, y se puede enviar un objeto json dentro del mismo, .send( { id: 2, name: "name" } ) 

```javascript
const response = await request(app).post('/stadium')
    .set('Authorization','token')
    .send()
```

Con el expect, se hacen validacion como:

- Verificar que un campo este definido dentro del json que retorna el servidor.

```javascript
expect(response.body.msg).toBeDefined();
```

- Verificar un estado de codigo.

```javascript
expect(response.statusCode).toBe(500);
```

- Verificar un tipo de dato, en este caso un Array

```javascript
expect(response.body.data).toBeInstanceOf(Array);
```






