import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { AssignmentContext } from "../context/AssignmentContext";
import { runQuery } from "../services/AssignmentService";
import { FaPlay, FaCloudUploadAlt } from "react-icons/fa";
import { submitQuery } from "../services/AssignmentService";
import { AuthContext } from "../context/AuthContext";

function MonnacoEditor({ setActiveTab, setTestResult, testResult }) {
    const [sqlQuery, setSqlQuery] = useState("");
    const [theme, setTheme] = useState("vs-dark");
    const [isExecuting, setIsExecuting] = useState(false);

    const {user} = useContext(AuthContext)  
    console.log(user);

    const { currentlySelectedAssignment } = useContext(AssignmentContext);
    console.log(currentlySelectedAssignment._id);
    function handleEditorChange(value) {
        setSqlQuery(value);
    }

    async function handleQuery(type) {
        if (!sqlQuery.trim()) return;
        setIsExecuting(true);
        setActiveTab(3); 
        setTestResult({ status: "loading" });

        try {
            const result = await runQuery(currentlySelectedAssignment._id, sqlQuery);
            console.log(result);
            if (result.correct) {
                setTestResult({ ...result, type }); 
            } else {
                setTestResult({ ...result, type }); 
            }

            // final submit query
            if(type=="Submit" && user){
                setActiveTab(1);
                console.log("call submission api");
                const data = {
                    userId: user._id,
                    sqlQuery: sqlQuery,
                    isCompleted: result.correct,
                }
                const res = await submitQuery(data,localStorage.getItem("token"),currentlySelectedAssignment._id)
                console.log("submission result",res);
            }

        } catch (error) {
            console.log(error);
            setTestResult({ error: error.message || "Execution failed" });
        } finally {
            setIsExecuting(false);
        }
    }

    return (
        <div className="monnaco-editor-container">
            <div className="editor-toolbar">
                <span className="editor-title">SQL Editor</span>
                <div className="editor-actions">
                    <button
                        className="btn-run"
                        onClick={() => handleQuery('Run')}
                        disabled={isExecuting}
                    >
                        <FaPlay /> Run Code
                    </button>
                    <button
                        className="btn-submit"
                        onClick={() => handleQuery('Submit')}
                        disabled={isExecuting}
                    >
                        <FaCloudUploadAlt /> Submit
                    </button>
                </div>
            </div>
            <div className="editor-wrapper">
                <Editor
                    width={"100%"}
                    height="100%"
                    defaultLanguage="sql"
                    defaultValue="-- Write your SQL query here"
                    onChange={handleEditorChange}
                    theme={theme}
                />
            </div>
        </div>
    );
}

export default MonnacoEditor;