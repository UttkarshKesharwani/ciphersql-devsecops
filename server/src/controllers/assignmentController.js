import { Assignment } from "../models/AssignmentSchema.js";
import { assignments } from "../../seeds/assignments.js";
import generateSqlQueries from "../utils/generateSqlQueries.js";
import pool from "../config/connectionPool.js";
import ai from "../config/gemini.js";
import normalizeResult from "../utils/normalizeAndCheckResult.js";
import UserProgress from "../models/UserProgress.js";

//    Get all assignments

export const getAssignments = async (req, res, next) => {
    try {
        const allAssignments = await Assignment.find();
        res.status(200).json(allAssignments);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        next(error);
    }
};


// Seed the Assignments database
export const seedAssignments = async (req, res, next) => {
    try {
        await Assignment.deleteMany({});
        const insertedData = await Assignment.insertMany(assignments);
        res.status(201).json({ message: "Database seeded successfully!", count: insertedData.length });
    } catch (error) {
        console.error("Error seeding database:", error);
        next(error);
    }
};



// Run SQL Query
export const runQuery = async (req, res, next) => {
    const { query } = req.body;
    const { assignmentId } = req.params;
    const { referenceQuery, expectedOutput, sampleTables } = await Assignment.findById(assignmentId)

    try {
        // leans will convert into js object 

        const sqlQueries = generateSqlQueries(sampleTables);

        const schema = `sandbox_${Date.now()}`;
        const readonlyRole = `readonly_${Date.now()}`;

        try {
            // Set up environment
            await pool.query(`CREATE SCHEMA ${schema}`);
            await pool.query(`SET search_path TO ${schema}`);
            await pool.query("SET statement_timeout = 2000");

            // Seed sandbox schema tables
            for (const q of sqlQueries) {
                await pool.query(q);
            }


            // --- FILTER MALICIOUS QUERIES USING A READ-ONLY USER ---
            // 1. Create a temporary role that cannot login
            await pool.query(`CREATE ROLE ${readonlyRole} NOLOGIN`);
            // 2. Grant only USAGE permission on our new schema
            await pool.query(`GRANT USAGE ON SCHEMA ${schema} TO ${readonlyRole}`);
            // 3. Grant only SELECT permission on all tables in our new schema
            await pool.query(`GRANT SELECT ON ALL TABLES IN SCHEMA ${schema} TO ${readonlyRole}`);

            // 4. Temporarily switch this session to our read-only user
            await pool.query(`SET ROLE ${readonlyRole}`);

            // 5. Execute the user's query safely! 
            // Any INSERT/UPDATE/DROP inside will trigger a permissions error
            const userQueryResult = await pool.query(query);
            const refQueryResult = await pool.query(referenceQuery);

            // Reset back to our superuser immediately after the safe execution
            await pool.query(`RESET ROLE`);

            // Compare user result with referenceQueryResult rows securely
            const correct = normalizeResult(userQueryResult.rows, refQueryResult.rows);

            // Send back the proper JSON structure that MonnacoEditor expects
            return res.status(200).json({
                sampleTables,
                expectedOutput,
                userRes: userQueryResult, // Frontend reads result.userRes.rows for display
                correct: correct
            });

        } catch (error) {
            // Even if it errors, we need to ensure we reset role back!
            await pool.query(`RESET ROLE`);

            // Return error structurally back to frontend instead of crashing 500
            res.status(400).json({ error: error.message || "Invalid SQL syntax or relationship error." });
        } finally {
            // Clean up: Reset configurations and remove sandbox info
            await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
            await pool.query(`DROP ROLE IF EXISTS ${readonlyRole}`);
            await pool.query(`RESET search_path;`);
            await pool.query(`RESET statement_timeout;`);
        }
    } catch (error) {
        console.error("Error setting up sandbox:", error);
        res.status(500).json({ error: "Internal Server Error setting up the database sandbox." });
    }
};


export const getHint = async (req, res, next) => {
    const { query } = req.body;
    const { assignmentId } = req.params;
    console.log("request coming", query, assignmentId);

    const assignment = await Assignment.findById(assignmentId)
    console.log(assignment);


    const prompt = `
        I am giving you a assignment and a query , you have to give me a hint for the query. since i integrated llm in my backend,
        and dont want user to direct get the access of solution , so i am giving you a assignment and a query , you have to give me a hint for the query.
        Assignment:
        ${assignment}

        Student query:
        ${query}

        Give only a hint anyhow , but don't give full solution , only elaborated hints so that user can understand.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log("Response:", response.text);
        res.status(200).json({ hint: response.text });
    } catch (error) {
        next(error);
    }
};


export const submitQuery = async (req,res)=>{
    try {
        const {assignmentId} = req.params;
        const {userId, sqlQuery, isCompleted} = req.body;
        const submission = await UserProgress.create({
            userId,
            assignmentId,
            sqlQuery,
            isCompleted,
        });
        res.status(201).json(submission);
    } catch (error) {
        console.error("Error submitting query:", error);
        next(error);
    }
}


export const getAllSubmissionByUser = async (req,res)=>{
    try {
        const {userId,assignmentId} = req.params;
        console.log(userId,assignmentId);
        const submissions = await UserProgress.find({userId,assignmentId}).populate("assignmentId");
        console.log(submissions);
        res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        next(error);
    }
}