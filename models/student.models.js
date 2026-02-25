const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentRegistrationNumber: String,
  studentId: String,
  studentName: String,
  fatherGardianName: String,
  class: String,
  emergencyNumber: String,
  address: String,
  dateOfBirth: Date,
  profileImage: String,
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
