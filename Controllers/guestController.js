import jwt from 'jsonwebtoken';

export const guestLoginController = (req, res) => {
  const token = jwt.sign({ role: 'guest' }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ message: "Logged in as guest", token });
};
