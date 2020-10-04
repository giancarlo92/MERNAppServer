const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // leer token del header
    const token = req.header('x-auth-token');

    // revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }

    // validar token
    try {
        const cifrado = await jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token no válido'})
    }
}