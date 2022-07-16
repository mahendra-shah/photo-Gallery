const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { verifyToken } = require('../modules/jwt');

// user personal details
router.get('/userData', verifyToken, async (req, res) => {
    try {
        const { id } = req.userData
        console.log(id);
        const userData = await prisma.users.findMany({ where: { id } })
        res.send(userData)

    } catch (error) {
        res.status(500).json({ error })

    }

})

// all personal photos
router.get('/private', verifyToken, async (req, res) => {
    try {
        const userId = req.userData.id
        const userImages = await prisma.images.findMany({ where: { userId } })
        res.send(userImages)

    } catch (error) {
        res.status(500).json({ error })

    }

})

module.exports = router