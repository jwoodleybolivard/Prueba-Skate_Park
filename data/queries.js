// const bcrypt = require("bcrypt");
require("dotenv").config({ path: ".env" });

const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

client.connect();

// Función asincrónica para consultar todos los usuarios
const getUsuarios = async () => {
    try {
        const usuarios = await client.query("SELECT * FROM skaters");
        return usuarios.rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

// //hash para encriptar el password
// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
// };

// Función asincrónica para ingresar un usuario
const nuevoUsuario = async (email, nombre, password, anos_experiencia, especialidad, foto) => {
    // let passwordHash = await hashPassword(password);
    let params = {
        text: `INSERT INTO skaters 
(email,nombre,password,anos_experiencia,especialidad,foto,estado)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *`,
        values: [
            email,
            nombre,
            password, // passwordHash
            anos_experiencia,
            especialidad,
            `./public/uploads/${foto}`, //guardar la ruta completa de la imagen en la base de datos
            false,
        ],
    };
    // console.log('valores de params: ', params);
    try {
        const result = await client.query(params);
        return result.rows[0];
    } catch (e) {
        // if (e.code === "22001") {
        //     throw {
        //         error: "debido a la encriptación de la contrasena el campo debes actualizar el campo 'password' con un valor de al menos 255 caracteres o más.",
        //         code: 500,
        //     };
        // }
        console.log(e);
        throw e;
    }
};

//ruta asincrónica para cambiar status de usuario
const setUsuarioStatus = async (estado, id) => {
    try {
        let params = {
            text: "UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *",
            values: [estado, id],
        };
        const result = await client.query(params);
        return result.rows[0];
    } catch (e) {
        console.log(e);
        throw e;
    }
};

//ruta asincrónica para consultar un usuario
const getUsuario = async (email, password) => {
    try {
        let params = {
            text: "SELECT * FROM skaters WHERE email = $1",
            values: [email],
        };
        const result = await client.query(params);
        if (result.rowCount > 0) {
            // const isSame = await compare(password, result.rows[0].password);
            if (result.rows[0].password === password) {
                return result.rows;
            } else {
                return [];
            }
        } else {
            return result.rows;
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

//ruta asincrónica para actualizar datos de perfil
const setDatosUsuario = async (email, nombre, password, anos_experiencia, especialidad) => {
    try {
        // let passwordHash = await hashPassword(password);
        let params = {
            text: `UPDATE skaters SET nombre = $1, password =$2, anos_experiencia = $3, especialidad = $4  WHERE email = $5 RETURNING *`,
            values: [nombre, password, anos_experiencia, especialidad, email],
        };
        const result = await client.query(params);
        return result.rows[0];
    } catch (e) {
        console.log(e);
        throw e;
    }
};

//ruta para eliminar usuario
const deleteCuenta = async (email) => {
    try {
        let params = {
            text: "DELETE FROM skaters WHERE email = $1",
            values: [email],
        };
        const result = await client.query(params);
        return result.rowCount;
    } catch (e) {
        console.log(e);
        throw e;
    }
};


module.exports = {
    nuevoUsuario,
    getUsuarios,
    setUsuarioStatus,
    getUsuario,
    setDatosUsuario,
    deleteCuenta,
};

