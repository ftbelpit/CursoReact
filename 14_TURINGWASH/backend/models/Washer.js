const mongoose = require("mongoose");
const { Schema } = mongoose;

const assessmentSchema = new Schema({
  score: Number,
  comment: String,
});

const washerSchema = new Schema(
  {
    image: String,
    name: String,
    assessments: [assessmentSchema],
    price: Number,
    adminId: mongoose.ObjectId,
    adminName: String,
    count: {
      type: Number,
      default: 0,
    },
    average: {
      type: Number,
      default: 0,
      set: (value) => parseFloat(value.toFixed(2)),
    },
  },
  {
    timestamps: true,
  }
);

washerSchema.pre("save", function (next) {
  this.count = this.assessments.length;
  this.average = calculateAverageScore(this.assessments);
  next();
});

function calculateAverageScore(assessments) {
  if (assessments.length === 0) {
    return 0;
  }

  const totalScore = assessments.reduce((sum, assessment) => {
    return sum + assessment.score;
  }, 0);

  const averageScore = totalScore / assessments.length;
  return parseFloat(averageScore.toFixed(2));
}

const Washer = mongoose.model("Washer", washerSchema);

module.exports = Washer;