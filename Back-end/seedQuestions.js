const mongoose = require("mongoose");
const Class = require("./models/Class");
const Subject = require("./models/Subject");
const Topic = require("./models/Topic");
const Question = require("./models/Question");

mongoose.connect("mongodb://127.0.0.1:27017/question-system");

const generateSmartOptions = (topic) => {
  const t = topic.toLowerCase();

  // 🎯 UNIQUE QUESTION BANK (REAL)
  const bank = {

    "tags": [
      "Defines structure of HTML document",
      "Used to style web pages",
      "Executes JavaScript code",
      "Stores data in database"
    ],

    "forms": [
      "Used to collect user input",
      "Used for animations",
      "Stores backend data",
      "Creates database tables"
    ],

    "tables": [
      "Displays data in rows and columns",
      "Executes queries",
      "Used for styling",
      "Stores cookies"
    ],

    "oop": [
      "Concept of object-based programming",
      "Used for networking",
      "Database language",
      "Operating system function"
    ],

    "inheritance": [
      "Acquiring properties of parent class",
      "Hiding internal data",
      "Multiple functions with same name",
      "Memory allocation process"
    ],

    "polymorphism": [
      "Same method behaves differently",
      "Combining classes",
      "Hiding data",
      "Allocating memory"
    ],

    "encapsulation": [
      "Binding data and methods together",
      "Executing multiple programs",
      "Handling database queries",
      "Managing CPU scheduling"
    ],

    "variables": [
      "Stores data values",
      "Executes loops",
      "Defines functions",
      "Handles errors"
    ],

    "loops": [
      "Executes block repeatedly",
      "Stores values",
      "Creates classes",
      "Handles exceptions"
    ],

    "functions": [
      "Reusable block of code",
      "Stores data permanently",
      "Controls hardware",
      "Handles memory"
    ],

    "process": [
      "Program in execution",
      "Static file",
      "Network request",
      "Hardware device"
    ],

    "thread": [
      "Lightweight process",
      "Disk storage unit",
      "CPU register",
      "Memory block"
    ],

    "sql": [
      "Query language for database",
      "Programming language",
      "Operating system",
      "Compiler"
    ],

    "joins": [
      "Combines rows from multiple tables",
      "Deletes records",
      "Creates indexes",
      "Manages memory"
    ],

    "normalization": [
      "Reduces redundancy",
      "Increases duplication",
      "Deletes tables",
      "Creates loops"
    ]
  };

  // ✅ FIND MATCHING KEY
  let matchedKey = Object.keys(bank).find(key => t.includes(key));

  // ✅ IF FOUND → RETURN SHUFFLED
  if (matchedKey) {
    return bank[matchedKey].sort(() => Math.random() - 0.5);
  }

  // ❗ IMPORTANT: NO GENERIC FAKE OPTIONS
  // Instead → create semi-real options dynamically

  const dynamicCorrect = `${topic} is a concept used in computing`;
  
  const dynamicWrong = [
    `${topic} is used for hardware control`,
    `${topic} is a database table`,
    `${topic} is a networking device`
  ];

  const options = [dynamicCorrect, ...dynamicWrong];

  return options.sort(() => Math.random() - 0.5);
};
 // return base.sort(() => Math.random() - 0.5);


// SUBJECTS
const subjectNames = [
  "HTML","Java Programming","Python Programming","C++ Programming",
  "Programming in C","Data Structures","Operating System",
  "Database Management System","Computer Networks",
  "Software Engineering","Artificial Intelligence",
  "Machine Learning","Cyber Security","Blockchain",
  "Cloud Computing","Data Science","Data Analytics",
  "R Programming","Web Development","Web Technologies"
];

// TOPICS
const topicBank = {
  "HTML": ["Tags","Forms","Tables","HTML5"],
  "Java Programming": ["OOP","Inheritance","Polymorphism","Encapsulation"],
  "Python Programming": ["Variables","Loops","Functions"],
  "Operating System": ["Process","Thread","Scheduling"],
  "Database Management System": ["SQL","Joins","Normalization"]
};

// COURSE CONFIG
const courseConfig = {
  "B.Tech": { semesters: 8, branch: ["CSE","AIML"] },
  "BCA": { semesters: 6, branch: ["General"] }
};

// SUBJECT CODE
const getSubjectCode = (course, branch, sem, i) => {
  let prefix = (course === "B.Tech") ? branch : "BCA";
  return `${prefix}${sem}${String(i+1).padStart(2,"0")}`;
};

// RUN
const run = async () => {

  await Subject.deleteMany();
  await Topic.deleteMany();
  await Question.deleteMany();

  const cls = await Class.findOne();
  if (!cls) return console.log("❌ No class");

  const classId = cls._id;

  let topicData = [];
  let questionData = [];

  for (let course in courseConfig) {

    const { semesters, branch } = courseConfig[course];

    for (let b of branch) {

      for (let sem = 1; sem <= semesters; sem++) {

        for (let i = 0; i < 3; i++) {

          const name = subjectNames[(sem * i + i) % subjectNames.length];
          const subjectCode = getSubjectCode(course, b, sem, i);

          const subject = await Subject.create({
            name,
            subjectCode,
            classId,
            semester: sem,
            course,
            branch: b
          });

          const subjectId = subject._id;

          const topics = topicBank[name] || ["Basics","Concept"];

          topics.forEach((topic, idx) => {

            const unit = `unit${(idx % 5) + 1}`;

            topicData.push({
              subjectId,
              subjectCode,
              classId,
              course,
              branch: b,
              semester: sem,
              unit,
              topic
            });

            // ✅ OBJECTIVE
            const options = generateSmartOptions(topic);

            questionData.push({
              question: `What is ${topic}?`,
              subjectId,
              subjectCode,
              classId,
              course,
              branch: b,
              semester: sem,
              unit,
              difficulty: "easy",
              type: "objective",
              marks: 1,
              options,
              answer: options[0]
            });

            // SHORT
            questionData.push({
              question: `Explain ${topic}`,
              subjectId,
              subjectCode,
              classId,
              course,
              branch: b,
              semester: sem,
              unit,
              difficulty: "medium",
              type: "short",
              marks: 5
            });

            // LONG
            questionData.push({
              question: `Describe ${topic}`,
              subjectId,
              subjectCode,
              classId,
              course,
              branch: b,
              semester: sem,
              unit,
              difficulty: "hard",
              type: "long",
              marks: 8
            });

          });

        }
      }
    }
  }

  await Topic.insertMany(topicData);
  await Question.insertMany(questionData);

  console.log("🔥 SEED DONE");
  process.exit();
};

run();