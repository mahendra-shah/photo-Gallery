const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const createToken = ({ id }) => {
    return jwt.sign(id, 'SecretKey')

}

const verifyToken = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1]
        const id = jwt.verify(token, "SecretKey")
        const user = await prisma.users.findUnique({where:{id: parseInt(id)}})
        req.userData = user
        next()
        return
    } 
    res.status(401).json({ msg: 'token expired' })
    
}

module.exports = { createToken, verifyToken }