const middleware = {};

middleware.errorHandler = (err, req, res) => {
  if (err.message) console.log("-".repeat(process.stdout.columns));

  if (err.message) {
    if (Object.keys(req.body).length > 0)
      console.log(JSON.stringify(req.body, null, 2));
    console.log(err.message);
    console.log(err.stack + "\t" + req.path);
  } else {
    console.log(JSON.stringify(req?.body, null, 4));
    console.log(
      (err.includes("|") ? err.split("|")[1] : err) + "\t" + req.path
    );
    res.status(err.includes("|") ? parseInt(err.split("|")[0]) : 500).json({
      statusCode: err.includes("|") ? parseInt(err.split("|")[0]) : 500,
      message: err.includes("|") ? err.split("|")[1] : err,
    });
  }
};

module.exports = middleware;
