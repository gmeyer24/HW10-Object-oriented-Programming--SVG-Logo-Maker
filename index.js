// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// Runs the application using imports from lib/
const { Triangle, Circle, Square } = require("./lib/Shape");

// Array for questions
const questions = [
  {
    type: "input",
    text: "Logo Text: Up to 3 characters",
    name: "text",
    validate: function (value) {
      return value.length <= 3 ? true : "Please enter up to three characters.";
    },
  },
  {
    type: "input",
    text: "Enter text color (keyword or hexadecimal",
    name: "textColor",
  },
  {
    type: "list",
    text: "Shape",
    name: "shape",
    choices: ["Triangle", "Circle", "Square"],
  },
  {
    type: "input",
    text: "Enter shape color (keyword or hexadecimal",
    name: "shapeColor",
  },
];

// function to generates svg file
function generateSVG(shape, text, textColor, shapeColor) {
  let newShape;

  switch (shape) {
    case "Triangle":
      newShape = new Triangle(text, textColor, shapeColor);
      break;
    case "Circle":
      newShape = new Circle(text, textColor, shapeColor);
      break;
    case "Square":
      newShape = new Square(text, textColor, shapeColor);
      break;
    default:
      console.log("Invalid shape selected.");
      return;
  }

  // writes the svg file
  fs.writeFile("logo.svg", newShape.render(), (err) => {
    if (err) {
      console.error("Error creating logo.svg:", err);
    } else {
      console.log("Generated logo.svg");
    }
  });
}

inquirer.prompt(questions).then((response) => {
  generateSVG(
    response.shape,
    response.text,
    response.textColor,
    response.shapeColor
  );
});
