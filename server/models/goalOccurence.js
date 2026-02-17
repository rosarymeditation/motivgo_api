
const mongoose = require("mongoose");

const GoalOccurrenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", index: true },
    goalId: { type: mongoose.Types.ObjectId, ref: "Goal", index: true },

    dateKey: { type: String, index: true }, // "YYYY-MM-DD" in user's timezone
    scheduledAt: { type: Date, index: true }, // exact UTC moment for reminder

    status: { type: String, enum: ["pending", "completed", "skipped"], default: "pending", index: true },
    checkedInAt: { type: Date },

    // snapshot of settings (important if Goal changes later)
    pillar: String,
    motivationStyle: String,
    format: String,
    faithToggle: Boolean,

    // content chosen for that day (MVP: from library)
    messageText: String,  // store final text served today
    audioUrl: String,     // store served audio url today
}, { timestamps: true });

GoalOccurrenceSchema.index({ goalId: 1, dateKey: 1 }, { unique: true });


const GoalOccurence = mongoose.model("GoalOccurence", GoalOccurrenceSchema);

module.exports = GoalOccurence;