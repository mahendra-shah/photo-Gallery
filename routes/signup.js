const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// registration section
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await prisma.users.findUnique({ where: { email } })
    if (user === null) {
      const a = await prisma.users.create({
        data: { name, email, password }
      })
      return res.status(201).json({msg:'user created'})
    }
    res.status(400).json({ msg: 'you already registered try login' })
    
  } catch (error) {
    res.status(500).json({ error })
  }

});

module.exports = router;
