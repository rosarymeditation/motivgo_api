const mongoose = require("mongoose");
const GoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", index: true },

    title: { type: String, required: true }, // "Wake up by 5am"
    pillar: {
        type: String, enum: [
            "personal_growth", "health_fitness", "learning_career",
            "spiritual_growth", "daily_life", "business_money", "emotional_wellness"
        ], required: true
    },

    // schedule settings
    reminderTime: { type: String, required: true }, // "05:00" (HH:mm in user's local time)
    frequency: { type: String, enum: ["daily", "weekdays", "custom"], default: "daily" },
    customDays: [{ type: Number }], // 0-6 if custom

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }, // optional

    // personalization settings
    motivationStyle: { type: String, enum: ["gentle", "firm", "affirmations", "reflective", "faith"], required: true },
    format: { type: String, enum: ["text", "audio", "both"], default: "text" },
    faithToggle: { type: Boolean, default: false },

    active: { type: Boolean, default: true },

    // cached stats for quick UI (optional but useful)
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    lastCompletedDateKey: { type: String }, // "YYYY-MM-DD" in user's timezone
}, { timestamps: true });

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;