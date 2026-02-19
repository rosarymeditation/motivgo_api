const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", index: true },

    title: { type: String, required: true },

    pillar: {
        type: String,
        enum: [
            "personal_growth",
            "health_fitness",
            "learning_career",
            "spiritual_growth",
            "daily_life",
            "business_money",
            "emotional_wellness"
        ],
        required: true
    },

    // 🔔 Alarm-based structure (MATCHES FLUTTER)
    alarmId: { type: Number, required: true },

    repeatType: {
        type: String,
        enum: ["none", "daily", "weekly", "monthly"],
        required: true
    },

    hour: { type: Number, required: true },
    minute: { type: Number, required: true },

    scheduledAt: { type: Date }, // used if repeatType = "none"
    weekdays: [{ type: Number }], // 0-6 if weekly
    dayOfMonth: { type: Number }, // 1-31 if monthly

    // 🎯 Personalization
    motivationStyle: {
        type: String,
        enum: ["gentle", "firm", "affirmations", "reflective", "faith"],
        required: true
    },

    format: {
        type: String,
        enum: ["text", "audio", "both"],
        default: "text"
    },

    faithToggle: { type: Boolean, default: false },

    active: { type: Boolean, default: true },

    // 📊 Stats
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    lastCompletedDateKey: { type: String }

}, { timestamps: true });

module.exports = mongoose.model("Goal", GoalSchema);
