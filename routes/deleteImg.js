const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../modules/jwt');
const prisma = new PrismaClient()

router.post('/delete', verifyToken, async (req, res) => {
    try {
        const { id } = req.body
        const userId = Number(req.userData.id)
        const allImg = await prisma.images.findMany({ where: { userId } })
        const ids = allImg.map(e => e.id)
        if (ids.includes(id)) {
            await prisma.images.delete({ where: { id } })
            return res.status(200).json({ msg: 'Image deleted...' })
    
        }
        res.status(400).json({msg: 'image not present'})
        
    } catch (error) {
      res.status(500).json({ error })
    }

})

module.exports = router