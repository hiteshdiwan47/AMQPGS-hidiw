const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/question-system");

const Question = require("./models/Question");

const data = [



// ================= HTML =================
{
subject:"HTML",
topic:"Tags",
type:"objective",
difficulty:"easy",
question:"Which tag is used for hyperlink?",
options:["<a>","<link>","<href>","<url>"],
answer:"<a>"
},
{
subject:"HTML",
topic:"Forms",
type:"short",
difficulty:"medium",
question:"Explain HTML forms.",
answer:"Forms are used to collect user input using input fields."
},

// ================= JAVA =================
{
subject:"Java Programming",
topic:"OOP",
type:"objective",
difficulty:"easy",
question:"What is encapsulation?",
options:[
"Binding data and methods",
"Inheritance",
"Loop execution",
"Memory allocation"
],
answer:"Binding data and methods"
},

// ================= PYTHON =================
{
subject:"Python Programming",
topic:"Loops",
type:"objective",
difficulty:"easy",
question:"Which loop is used in Python?",
options:["for loop","if loop","switch","goto"],
answer:"for loop"
},

// ================= C++ =================
{
subject:"C++ Programming",
topic:"Pointers",
type:"objective",
difficulty:"medium",
question:"What is pointer?",
options:[
"Stores memory address",
"Stores value",
"Loop",
"Class"
],
answer:"Stores memory address"
},

// ================= C =================
{
subject:"Programming in C",
topic:"Functions",
type:"objective",
difficulty:"easy",
question:"Function is?",
options:[
"Reusable code block",
"Variable",
"Loop",
"Array"
],
answer:"Reusable code block"
},

// ================= DS =================
{
subject:"Data Structures",
topic:"Stack",
type:"objective",
difficulty:"easy",
question:"Stack follows?",
options:["LIFO","FIFO","Random","Priority"],
answer:"LIFO"
},

// ================= OS =================
{
subject:"Operating System",
topic:"Process",
type:"objective",
difficulty:"easy",
question:"Process is?",
options:[
"Program in execution",
"Static file",
"Hardware",
"Compiler"
],
answer:"Program in execution"
},

// ================= DBMS =================
{
subject:"Database Management System",
topic:"SQL",
type:"objective",
difficulty:"easy",
question:"SQL stands for?",
options:[
"Structured Query Language",
"Simple Query Language",
"System Query Language",
"Server Query Language"
],
answer:"Structured Query Language"
},

// ================= CN =================
{
subject:"Computer Networks",
topic:"OSI",
type:"objective",
difficulty:"easy",
question:"OSI has how many layers?",
options:["7","5","4","6"],
answer:"7"
},

// ================= SE =================
{
subject:"Software Engineering",
topic:"SDLC",
type:"objective",
difficulty:"easy",
question:"SDLC stands for?",
options:[
"Software Development Life Cycle",
"System Design Logic Code",
"Software Data Link Control",
"System Development Loop Cycle"
],
answer:"Software Development Life Cycle"
},

// ================= AI =================
{
subject:"Artificial Intelligence",
topic:"AI Basics",
type:"objective",
difficulty:"easy",
question:"AI is?",
options:[
"Machine intelligence",
"Human intelligence",
"Database",
"Network"
],
answer:"Machine intelligence"
},

// ================= ML =================
{
subject:"Machine Learning",
topic:"Supervised Learning",
type:"objective",
difficulty:"easy",
question:"Supervised learning uses?",
options:[
"Labeled data",
"Unlabeled data",
"Random data",
"No data"
],
answer:"Labeled data"
},

// ================= CYBER =================
{
subject:"Cyber Security",
topic:"Encryption",
type:"objective",
difficulty:"easy",
question:"Encryption is?",
options:[
"Convert data into secure form",
"Delete data",
"Store data",
"Transfer data"
],
answer:"Convert data into secure form"
},

// ================= BLOCKCHAIN =================
{
subject:"Blockchain",
topic:"Basics",
type:"objective",
difficulty:"easy",
question:"Blockchain is?",
options:[
"Distributed ledger",
"Database",
"Compiler",
"OS"
],
answer:"Distributed ledger"
},

// ================= CLOUD =================
{
subject:"Cloud Computing",
topic:"IaaS",
type:"objective",
difficulty:"easy",
question:"IaaS means?",
options:[
"Infrastructure as a Service",
"Internet as Service",
"Internal app service",
"Integrated system service"
],
answer:"Infrastructure as a Service"
},

// ================= DS =================
{
subject:"Data Science",
topic:"Analysis",
type:"objective",
difficulty:"easy",
question:"Data science focuses on?",
options:[
"Data analysis",
"Gaming",
"Networking",
"Hardware"
],
answer:"Data analysis"
},

// ================= DA =================
{
subject:"Data Analytics",
topic:"Visualization",
type:"objective",
difficulty:"easy",
question:"Visualization means?",
options:[
"Graphical representation",
"Code execution",
"Database",
"Looping"
],
answer:"Graphical representation"
},

// ================= R =================
{
subject:"R Programming",
topic:"Vectors",
type:"objective",
difficulty:"easy",
question:"Vector is?",
options:[
"Collection of elements",
"Loop",
"Function",
"Class"
],
answer:"Collection of elements"
},

// ================= WEB =================
{
subject:"Web Development",
topic:"API",
type:"objective",
difficulty:"easy",
question:"API is?",
options:[
"Application Programming Interface",
"Advanced Program Input",
"App Process Integration",
"None"
],
answer:"Application Programming Interface"
},

// ================= WEB TECH =================
{
subject:"Web Technologies",
topic:"JavaScript",
type:"objective",
difficulty:"easy",
question:"JavaScript is?",
options:[
"Scripting language",
"Database",
"OS",
"Compiler"
],
answer:"Scripting language"
}

]

async function run() {
  await Question.insertMany(data);
  console.log("✅ All Subjects Data Inserted");
  process.exit();
}

run();