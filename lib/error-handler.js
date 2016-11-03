module.exports = function errorHandler(err, req, res, next) {
  let code = 500;
  let error = 'Internal Server Error';

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    code = 400;
    error = err.errors;
    console.log(err.errors);
  } else if (err.code) {
    code = err.code;
    error = err.error;
    console.log(err.code, err.error);
  } else {
    console.log(err);
  }

  res.status(code).send({error});
};