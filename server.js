const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

const uri = "mongodb+srv://karriprabhasreddy_db_user:prabhas123@cluster0.edn3eug.mongodb.net/studentlist";
const client = new MongoClient(uri);
let studentsCollection;

async function initDB() {
  await client.connect();
  const db = client.db("studentDB");
  studentsCollection = db.collection("students");
  console.log("MongoDB Connected");
}
initDB();

app.get('/', async (req, res) => {
  const students = await studentsCollection.find({}).toArray();
  res.json(students);
});

app.get('/:id', async (req, res) => {
  const student = await studentsCollection.findOne({ id: parseInt(req.params.id) });
  if(!student) return res.status(404).json({error: "Not Found"})
  res.json(student);
});

app.post('/', async (req, res) => {
  const lastStudent = await studentsCollection.find({}).sort({id: -1}).limit(1).toArray();
  const newId = lastStudent.length > 0? lastStudent[0].id + 1 : 1;
  const newStudent = {...req.body, id: newId };
  await studentsCollection.insertOne(newStudent);
  res.json(newStudent);
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  delete data._id; 
  delete data.id;
  await studentsCollection.updateOne({ id: parseInt(id) }, { $set: data })
  res.json({success: true})
})

app.delete('/:id', async (req, res) => {
  await studentsCollection.deleteOne({ id: parseInt(req.params.id) });
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
