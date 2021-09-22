const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;

        // User existing check
        const candidate = await User.findOne({email});
        if(candidate){
            res.status(400).json({success: false, messege: "This user already exists"})
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({email, password: hashedPassword});
        await user.save();

        res.status(201).json({success: true, messege: 'user created'});
        
    } catch (error) {
        res.status(500).json({success: false, messege: 'Something went wrong, try again'});
    }
});

router.post(
  '/login',
  async (req, res) => {
      try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({
                success: false,
                errors: {
                    email: ['User not found']
                }
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(200).json({
                success: false,
                errors: {
                    password: ['Invalid password, try again']
                }
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({token, userId: user.id});
          
      } catch (error) {
        res.status(500).json({success: true, messege: 'Something went wrong, try again'});
      }
  }  
);

module.exports = router;