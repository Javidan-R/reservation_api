const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config/jwt');

exports.registerUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
  return { user, token };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');
  
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
  return { user, token };
};
