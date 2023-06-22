const middleware = {};

middleware.validateBody = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    console.log(JSON.stringify(req.body, null, 2));
    console.log(
      JSON.stringify(
        error.details.map((each) => each.message),
        null,
        2
      )
    );
    res.status(422).json({
      code: 422,
      message: error.details.map((each) => each.message),
    });
  } else {
    req.body = value;
    next();
  }
};

module.exports = middleware;
