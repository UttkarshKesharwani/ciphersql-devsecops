
import mongoose, { Schema } from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"]
    },
    question: {
        type: String,
        required: true
    },
    referenceQuery: {
        type: String,
        required: true
    },
    sampleTables: [
        {
            tableName: {
                type: String,
                required: true
            },
            columns: [
                {
                    columnName: {
                        type: String,
                        required: true
                    },
                    dataType: {
                        type: String,
                        required: true
                    }
                }
            ],
            rows: [
                {
                    type: Object,
                    required: true
                }
            ]
        }
    ],
    expectedOutput: {
        type: {
            type: String,
            enum: ["table", "count", "single_value", "column", "row"],
            required: true
        },
        value: {
            type: Schema.Types.Mixed,
            required: true
        }
    },
    acceptance_rate: {
        type: Number,
        default: 50
    }
}, {
    timestamps: true
});

export const Assignment = mongoose.model("Assignment", assignmentSchema); 