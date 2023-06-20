const express = require("express");
const ExpressError = require("./expressError");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/", async function (req, res, next) {
  try {
    let results = req.body.developers;
    let responses = await Promise.all(
      results.map(async (d) => {
        const urlresponse = await axios.get(
          `https://api.github.com/users/${d}`
        );
        console.log(urlresponse);
        return urlresponse;
      })
    );

    let out = responses.map((r) => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch (e) {
    next(e);
  }
});

// app.post("/", function (req, res, next) {
//   try {
//     let results = req.body.developers.map(async (d) => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map((r) => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
