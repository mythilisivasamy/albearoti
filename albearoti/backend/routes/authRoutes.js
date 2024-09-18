import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  User.findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res.status(203).json({
          message: 'User with this email already exist',
          statusCode: '203',
        });
      }
      bcryptjs.hash(password, 16).then((hashedpwd) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedpwd,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({
              message: 'User Signed Up Successfully',
              statusCode: '201',
            });
          })
          .catch((err) => {
            return res.status(501).json({ message: 'Signup failed' + err });
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

authRouter.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(202).json({
          message: 'Invalid Email',
          statusCode: '202',
        });
      }
      bcryptjs.compare(password, userInDB.password).then((isMatched) => {
        if (isMatched) {
          const jwtToken = jwt.sign(
            { _id: userInDB._id },
            process.env.JWT_SECRET
          );
          res.status(201).json({
            authInfo: {
              token: jwtToken,
              firstName: userInDB.firstName,
              email: userInDB.email,
              _id: userInDB._id,
            },
            message: 'User Logged In Successfully',
            statusCode: '201',
          });
        } else {
          res
            .status(202)
            .json({ message: 'Invalid Password', statusCode: '202' });
        }
      });
    })
    .catch(() => {
      const err = new CustomError(`Internal server error`, 500);
      next(err);
    });
});

export default authRouter;
