const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { createToken } = require('../modules/jwt');
const prisma = new PrismaClient()

// login section
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.users.findMany({ where: { email, password } })
    if (user.length === 1) {
      const token = createToken(user[0])
      res.cookie('userCookie', token)
      return res.status(202).json({ msg: "logged in...." })

    }
    res.status(404).json({ error: 'check your details again or try again' })

  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router;