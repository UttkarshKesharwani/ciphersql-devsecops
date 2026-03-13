import { useState } from "react";
import Question from "./Discription";
import Submission from "./Submission";
import Hints from "./Hints";
import { MdOutlineDescription } from "react-icons/md";
import { PiLightbulbLight } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import TestResult from "./TestResult";
import { VscTerminalPowershell } from "react-icons/vsc";






function QuestionPanel({ activeTab, setActiveTab, testResult }) {

    const tabs = [
        {
            label: "Question",
            component: <Question />,
            icon : <MdOutlineDescription />
        },
        {
            label: "Submission",
            component: <Submission />,
            icon : <IoMdTime />
        },
        {
            label: "Hints",
            component: <Hints />,
            icon : <PiLightbulbLight />
        },
        {
            label: "Test Result",
            component: <TestResult result={testResult} />,
            icon: <VscTerminalPowershell />
        }
    ]

    let currentTab = tabs[activeTab];

    return (
        <div className="question-panel">
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={activeTab === index ? "active" : ""}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {currentTab.component}
            </div>
        </div>
    );
}

export default QuestionPanel;