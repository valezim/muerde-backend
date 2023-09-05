const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../../repository/UserRepo');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify( token, process.env.JWT_SECRET );

        const usuario = await Usuario.getById( id );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validateJWT
}