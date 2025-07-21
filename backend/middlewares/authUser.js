import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ fixed: store userId on req, not req.body
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

export default authUser;
