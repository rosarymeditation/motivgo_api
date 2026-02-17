const express = require("express");
const logger = require("morgan");
const Sentry = require("@sentry/node");
const bodyParser = require("body-parser");

require("dotenv").config();
var cors = require("cors");

// Set up the express app
const app = express();

app.use(cors());
// Log requests to the console.
//app.use(logger("dev"));

// Sentry.init({
//   dsn: "https://62697854002c3b3789e0737992f31a9a@o1324264.ingest.sentry.io/4505894487457792",
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Sentry.Integrations.Express({ app }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Set sampling rate for profiling - this is relative to tracesSampleRate
//   profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
// });

// // The request handler must be the first middleware on the app
// app.use(Sentry.Handlers.requestHandler());

// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());
// app.use(Sentry.Handlers.errorHandler());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoString = process.env.DATABASE_URL;
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Mongo connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit;
  }
};
// mongoose.connect(mongoString);
// const database = mongoose.connection;
// database.on("error", (error) => {
//   console.log(error);
// });

// database.once("connected", () => {
//   console.log("Database Connected");
// });
// Require our routes into the application.
const refPath = "./server/routes/";

require(`${refPath}user`)(app);
// require(`${refPath}dailyVerse`)(app);
// require(`${refPath}testimony`)(app);
// require(`${refPath}user`)(app);
// require(`${refPath}feed`)(app);
// require(`${refPath}feedComment`)(app);
// require(`${refPath}feedStatus`)(app);
// require(`${refPath}prayer`)(app);
// require(`${refPath}language`)(app);
// require(`${refPath}suggestion`)(app);
// require(`${refPath}prayerCatholic`)(app);
// require(`${refPath}audio`)(app);
// require(`${refPath}psalm`)(app);
// require(`${refPath}novena`)(app);
// require(`${refPath}log`)(app);
// require(`${refPath}payment`)(app);
// require(`${refPath}prayerRequest`)(app);
// require(`${refPath}distress`)(app);
// require(`${refPath}product`)(app);
// require(`${refPath}terms`)(app);
// require(`${refPath}dailyReading`)(app);
// require(`${refPath}transaction`)(app);
// require(`${refPath}address`)(app);
// require(`${refPath}donor`)(app);
// require(`${refPath}saint`)(app);
// require(`${refPath}plan`)(app);

app.use((err, req, res, next) => res.json(err));

//app.set("port", process.env.PORT || 8001);
connectDB().then(() => {
  app.listen(process.env.PORT || 8001, () => {
    console.log(`Listening to port ${process.env.PORT || 8001}`);
  });
});

// const server = app.listen(app.get("port"), function () {
//   console.log("Server started on port " + app.get("port"));
// });
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

module.exports = app;
