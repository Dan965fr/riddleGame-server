export function verifyUserOrAdmin(req, res, next) {
  const role = req.user?.role;
  if (role === 'admin' || role === 'user') {
    next();
  } else {
    res.status(403).json({ error: 'Only admin or user can add riddles.' });
  }
}
