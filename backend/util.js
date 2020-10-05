import jwt from 'jsonwebtoken'
import config from './config'
//import dotenv from 'dotenv'

//dotenv.config()
//console.log(secret)

const secret = config.JWT_SECRET;

const getToken = (user) =>{

    return jwt.sign(
        {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        },
        secret, 
        {
        expiresIn: '48h'
        }
    )
}

const isAuth = (req, res, next) =>{
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7,token.length)
        jwt.verify(onlyToken, secret, (err, decode) =>{
            if(err){
                return res.status(401).send({msg:'Invalid Token'})
            }
            req.user = decode
            next();
            return
        })
    }else{
        return res.status(401).send({msg:"Token is not supplied"})
    }
    
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg: 'Admin Token is not valid.'})
}

export {
    getToken,
    isAuth,
    isAdmin
}