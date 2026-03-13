import { useState } from "react";
import MonnacoEditor from "../components/MonnacoEditor";
import QuestionPanel from "../components/QuestionPanel";
import "../styles/AssignmentAttemptPage.css";


function AssignmentAttemptPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [testResult, setTestResult] = useState(null);

    return (
        <div className="assignment-attempt-page">
            <QuestionPanel
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                testResult={testResult}
            />
            <MonnacoEditor
                setActiveTab={setActiveTab} 
                setTestResult={setTestResult}
                testResult={testResult}
            />
        </div>
    );
}

export default AssignmentAttemptPage;