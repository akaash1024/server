const homeRoutes = require("express").Router();

const studentsData = [
  { name: "Aarav", grade: "10th" },
  { name: "Ishita", grade: "9th" },
  { name: "Rohan", grade: "8th" },
  { name: "Meera", grade: "10th" },
  { name: "Kabir", grade: "11th" },
];

// Render the report page with dynamic student data
homeRoutes.get("/", (req, res) => {
  res.render("report", { student: studentsData });
});

module.exports = homeRoutes;
