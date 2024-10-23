const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// main page route and it is showing all the files in the files folder
app.get("/", function (req, res) {
  //   res.end("Hello from express backend - VAIBHAV Chittora");
  fs.readdir("./files", function (err, files) {
    console.log(files);
    res.render("index.ejs", { files: files });
  });
});

// create file route on main page
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}`,
    req.body.details,
    function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
  console.log("Body", req.body.details);
});

// show file route
app.get("/file/:fileName", function (req, res) {
  fs.readFile(
    `./files/${req.params.fileName}`,
    "utf-8",
    function (err, fileData) {
      if (err) {
        console.log(err);
      }
      res.render("showFileData", {
        fileName: req.params.fileName,
        fileData: fileData,
      });
    }
  );
});

app.post("/editDetails", function (req, res) {
  // fs.appendFile()
  console.log("REQ BODY in detials section", req.body);

  fs.appendFile(
    `./files/${req.body.fileName}`,
    req.body.newDetails,
    function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );

  console.log("File NAme ", req.body.fileName);
  console.log("details Updated");
});

// edit file route
app.get("/edit/:fileName", function (req, res) {
  console.log("update file -", req.body);

  res.render("editFile", {
    fileName: req.params.fileName,
    fileData: req.body.details,
  });
});

app.post("/edit", function (req, res) {
  console.log("update file -", req.body);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});

app.listen(PORT, function (req, res) {
  console.log(`Server is running on ${PORT}`);
});
