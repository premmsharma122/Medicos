import jwt from 'jsonwebtoken'
const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check that decoded matches the expected value
    const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    if (decoded !== expected) {
      return res.status(403).json({ success: false, message: 'Invalid token. Not Authorized' });
    }

    next(); // proceed to the controller
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

export default authAdmin;
