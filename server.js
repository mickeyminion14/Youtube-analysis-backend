const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const DataModel = require('./models/data/data.model')

const URL =
  "mongodb://sarthak:12345sarthak@ds151247.mlab.com:51247/youtube-sentimental-analysis";
app.use(express.json());

app.use(cors());

app.post("/data", (req, res) => {
  const payload = {
    ...req.body
  };

  const dataModel = new DataModel(payload)
  dataModel.save().then(document => {
    console.log(document);
    res.status(200).json({
      data: document,
      message: "success"
    })
  }).catch(err => {
    res.status(400).json({
      data: null,
      message: "faliure"
    })
  })
})

app.get("/data", (req, res) => {
  DataModel.find((err, document) => {
    if (err) {
      res.status(400).json({
        message: "error in fetching data"
      })
      return;
    }
    const len = document.length;

    if (len > 0) {

      res.status(200).json({
        data: document[len - 1],
        message: "success"
      })
      return;
    }

    res.status(200).json({
      data: [],
      message: "success"
    })
    return;


  })
})




app.use((req, res) => {
  res.statusCode = 400;
  res.json({
    message: "Not Found !!",
    result: {
      data: null
    }
  });
});

mongoose.connect(
  URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    app.listen(PORT, () => {
      console.log("server running on port " + PORT);
    });
  }
);