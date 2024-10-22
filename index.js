const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  //   res.end("Hello from express backend - VAIBHAV Chittora");
  fs.readdir("./files", function (err, files) {
    console.log(files);
    res.render("index.ejs", { files: files });
  });
});

app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/')
    })
  console.log("Body", req.body);
});

app.listen(PORT, function (req, res) {
  console.log(`Server is running on ${PORT}`);
});
