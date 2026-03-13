import mongoose, { Schema } from "mongoose";

const userProgressSchema = new Schema(
    {   
        // in future i need to look this userId (string / objectId) ?
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        assignmentId: {
            type: Schema.Types.ObjectId,
            ref: "Assignment",
            required: true,
        },

        // last query user wrote 
        sqlQuery: {
            type: String,
            default: ""
        },

        lastAttempt: {
            type: Date,
            default: Date.now
        },

        isCompleted: {
            type: Boolean,
            default: false
        },

        attemptCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);


export default mongoose.model("UserProgress", userProgressSchema);
