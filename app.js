//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "We the members of Scient Lab have made a lot of Projects which showcases our Knowledge and Skill-set and helps us create even more new Innovative projects and designs. Few of our best projects are mentioned below:";
const aboutContent = "SCIEnT is a multi-disciplinary innovation centre, providing opportunities to students to delve into the ever expanding world of technology, and discover, hands on, the incredible scope for innovation that the world offers today. The lab allows students to explore and experiment with technology, without having to deal with the fear and cost of failure. At SCIEnT, students are offered a multitude of tools, machines, consumables and services, and a space in which to work, learn and grow. ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const projectSchema = {
  fullName: String,
  phoneNo: String,
  emailId: String,
  projectName: String,
  projectDescrip: String,
};

const Project = mongoose.model("Project", projectSchema);

app.get("/", function(req, res){

  Project.find({}, function(err, project){
    res.render("home", {
      startingContent: homeStartingContent,
      projects: project
      });
  });
});

app.get("/addNew", function(req, res){
  res.render("addNew");
});

app.post("/addNew", function(req, res){
  const project = new Project({
    fullName: req.body.fullName,
    phoneNo: req.body.phoneNo,
    emailId: req.body.emailId,
    projectName: req.body.projectName,
    projectDescrip: req.body.projectDescrip
  });


  project.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/project/:projectId", function(req, res){

const requestedProjectId = req.params.projectId;

  Project.findOne({_id: requestedProjectId}, function(err, project){
    res.render("project", {
      fullName: project.fullName,
      phoneNo: project.phoneNo,
      emailId: project.emailId,
      projectName: project.projectName,
      projectDescrip: project.projectDescrip
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
