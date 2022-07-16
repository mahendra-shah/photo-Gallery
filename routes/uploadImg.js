const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../modules/jwt');
const prisma = new PrismaClient()
const cloudinary = require('../modules/cloudinary')
const upload = require('../modules/multer')

// upload image from here
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { imgName, title, description, mode } = req.body
        const userId = req.userData.id
        const img = await cloudinary.uploader.upload(req.file.path)
        const image = img.secure_url
        console.log(typeof (userId), 'h<><>h');
        await prisma.images.create({ data: { userId, imgName, title, description, mode, image } })
        res.status(201).json({ msg: 'image uploaded successfully' })

    } catch (error) {
        res.status(500).json({ error })

    }
})

module.exports = router;