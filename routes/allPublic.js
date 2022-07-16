const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { verifyToken } = require('../modules/jwt');

// all public available photos/images
router.get('/public', verifyToken, async (req, res) => {
    try {
        const all = await prisma.images.findMany({ where: { mode: "PUBLIC" } })
        res.send(all)

    } catch (error) {
        res.status(500).json({ error })
    }

})


module.exports = router