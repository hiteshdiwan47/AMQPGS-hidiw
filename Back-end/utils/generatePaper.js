// 🔥 SMART OPTIONS (same function)
const generateSmartOptions = (topic) => {
  const base = [
    `${topic} is a core concept`,
    `${topic} improves performance`,
    `${topic} is used in computing`,
    `${topic} is unrelated`
  ];
  return base.sort(() => Math.random() - 0.5);
};

// OBJECTIVE
const generateObjective = (topic, meta) => {
 const options = generateSmartOptions(topic);

// correct answer identify
const correctAnswer = options.find(opt =>
  opt.toLowerCase().includes("structure") ||
  opt.toLowerCase().includes("collect") ||
  opt.toLowerCase().includes("reusable") ||
  opt.toLowerCase().includes("execution") ||
  opt.toLowerCase().includes("reduces")
);

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
  answer: correctAnswer
});
}

// SHORT
const generateShort = (topic) => ({
  question: `Explain ${topic}.`,
  type: "short",
  marks: 5
});

// LONG
const generateLong = (topic) => ({
  question: `Describe ${topic} in detail.`,
  type: "long",
  marks: 8
});

// MAIN
const generatePaper = (topics, config) => {

  let paper = [];

  topics.forEach(t => {

    const topicName = t.topic || t;

    const meta = {
      subjectId: t.subjectId,
      subjectCode: t.subjectCode,
      classId: t.classId,
      course: t.course,
      branch: t.branch,
      semester: t.semester,
      unit: t.unit
    };

    if (config.objective) {
      paper.push(generateObjective(topicName, meta));
    }

    if (config.short) {
      paper.push(generateShort(topicName));
    }

    if (config.long) {
      paper.push(generateLong(topicName));
    }

  });

  return paper;
};

module.exports = generatePaper;