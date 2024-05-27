const express = require("express");
const app = express();
require("dotenv").config();
const { engine } = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const path = require("path");
const routes = require("./routes");

const secretKey = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(PORT, host, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}, visite http://localhost:${PORT}`);
});

//Static
app.use(express.static(path.join(__dirname, "/public")));
app.use(
    "/css",
    express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para express-fileupload
app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit:
            "El peso del archivo que intentas subir supera el limite permitido",
    })
);

// Configuración de Handlebars
app.engine(
    "hbs",
    engine({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/mainLayout/`,
        extname: ".hbs",
        helpers: {
            inc: function (value) {
                return parseInt(value) + 1;
            },
        },
    })
);
app.set("view engine", "hbs");

// Importar rutas
app.use("/", routes);
