const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Job skills database
const jobs = {
  frontend: ["html", "css", "javascript", "react", "git", "responsive"],
  backend: ["node", "express", "mongodb", "api", "authentication", "database"],
  fullstack: ["html", "css", "javascript", "react", "node", "mongodb", "api"]
};

// Analyze route
app.post("/analyze", (req, res) => {
  const { resumeText, jobRole } = req.body;

  if (!resumeText || !jobRole) {
    return res.status(400).json({ error: "Missing resume text or job role" });
  }

  const requiredSkills = jobs[jobRole];
  const text = resumeText.toLowerCase();

  let matched = [];
  let missing = [];

  requiredSkills.forEach(skill => {
    if (text.includes(skill)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const matchPercentage = Math.round(
    (matched.length / requiredSkills.length) * 100
  );

  res.json({
    matchPercentage,
    matchedSkills: matched,
    missingSkills: missing
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});