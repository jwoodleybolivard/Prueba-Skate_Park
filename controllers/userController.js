const {
    nuevoUsuario,
    getUsuarios,
    setUsuarioStatus,
    getUsuario,
    setDatosUsuario,
    deleteCuenta,
} = require("../data/queries");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

exports.renderHome = async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.render("home", { usuarios });
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};

exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.renderRegistro = (req, res) => {
    res.render("registro");
};

exports.renderAdmin = async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.render("admin", { usuarios });
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};

exports.getUserData = (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: "401 Unauthorized",
                message: "Usted no está autorizado para estar aquí",
                token_error: err.message,
            });
        }
        const { data } = decoded;
        const { email, nombre, password, anos_experiencia, especialidad } = data[0];
        res.render("perfil", { email, nombre, password, anos_experiencia, especialidad });
    });
};

exports.updateUserData = async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    try {
        const usuario = await setDatosUsuario(email, nombre, password, anos_experiencia, especialidad);
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};

exports.registerUser = async (req, res) => {
    const { email, nombre, password, password_2, anos_experiencia, especialidad } = req.body;
    const { foto } = req.files;
    // console.log(`Foto recibida: ${foto}`);
    const { name } = foto;
    // console.log(`Name recibido: ${name}`);

    if (password !== password_2) {
        res.send('<script>alert("Las contraseñas no coinciden."); window.location.href = "/registro"; </script>');
    } else {
        try {
            await nuevoUsuario(email, nombre, password, anos_experiencia, especialidad, name);
            foto.mv(`./public/uploads/${name}`, (err) => {
                if (err) throw err;
                res.send('<script>alert("Se ha registrado con éxito."); window.location.href = "/login"; </script>');
            });
        } catch (error) {
            res.status(500).send({
                error: `Algo salió mal... ${error}`,
                code: 500,
            });
        }
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};

exports.updateUserStatus = async (req, res) => {
    const { estado, id } = req.body;
    try {
        const usuarios = await setUsuarioStatus(estado, id);
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};

exports.verifyUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUsuario(email, password);

        if (!email || !password) {
            return res.status(401).send({
                error: "Debe completar todos los campos",
                code: 401,
            });
        }

        if (user.length === 0) {
            return res.status(404).send({
                error: "Este usuario no está registrado en la base de datos o la contraseña es incorrecta.",
                code: 404,
            });
        }

        // if (!user[0].estado) {
        //     // console.log('Status: ', user[0].estado);
        //     return res.status(401).send({
        //         error: `El registro de este usuario no ha sido aprobado`,
        //         code: 401,
        //     });
        // }

        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 180,
                data: user,
            },
            secretKey
        );
        res.send(token);
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        const respuesta = await deleteCuenta(email);
        res.status(200).send(respuesta.toString());
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500,
        });
    }
};
