module.exports = (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The route ${req.path} does not exist!`,
    status: 404
  });
};