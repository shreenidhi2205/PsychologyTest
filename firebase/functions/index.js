const functions = require("firebase-functions");
const admin = require("firebase-admin");
const json2xls = require("json2xls");
const fs = require("fs");

admin.initializeApp();

exports.getStudentRecords = functions.https.onRequest(async (req, res) => {
  const studentsSnapshot = await admin.firestore().collection("students").get();
  const students = studentsSnapshot.docs.map((doc) => doc.data());

  const xls = json2xls(students);
  const filePath = "/tmp/students.xlsx";
  fs.writeFileSync(filePath, xls, "binary");

  res.download(filePath, "students.xlsx");
});
