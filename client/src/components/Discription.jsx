import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AssignmentContext } from "../context/AssignmentContext";
import "../styles/Discription.css";

function Discription() {
    const { title } = useParams();
    const { assignments } = useContext(AssignmentContext);

    const currentAssignment = assignments?.find((assignment) => assignment.title.toLowerCase().split(" ").join("-") === title);

    if (!currentAssignment) return <div className="loading-question">Loading Question...</div>;

    return (
        <div className="description-container">
            <h2>{currentAssignment.title}</h2>

            <div className="difficulty-tag">
                <span className={`difficulty-badge difficulty-${currentAssignment.description}`}>
                    {currentAssignment.description}
                </span>
            </div>

            <div className="schemas">
                {currentAssignment.sampleTables?.map((table, idx) => (
                    <div className="schema-block" key={idx}>
                        <p>Table: <code>{table.tableName}</code></p>
                        <table className="beginner-table">
                            <thead>
                                <tr>
                                    <th>Column Name</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table.columns?.map((col, colIdx) => (
                                    <tr key={colIdx}>
                                        <td>{col.columnName}</td>
                                        <td>{col.dataType.toLowerCase()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            <div className="question-text">
                <p>{currentAssignment.question}</p>
            </div>

            <div className="example-block">
                <h3>Example 1:</h3>
                <div className="example-inner">
                    <p className="example-input-label"><strong>Input:</strong></p>
                    {currentAssignment.sampleTables?.map((table, idx) => (
                        <div key={idx} className="example-table-container">
                            <p className="example-table-name"><code>{table.tableName}</code> table:</p>
                            <table className="beginner-table">
                                <thead>
                                    <tr>
                                        {table.columns?.map((col, cIdx) => (
                                            <th key={cIdx}>{col.columnName}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.rows?.map((row, rIdx) => (
                                        <tr key={rIdx}>
                                            {table.columns?.map((col, cIdx) => (
                                                <td key={cIdx}>{row[col.columnName]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}

                    <p className="example-output-label"><strong>Output:</strong></p>
                    {(() => {
                        const expected = currentAssignment.expectedOutput;
                        if (!expected) return null;

                        // Output table rendering
                        if (expected.type === "table") {
                            const headers = expected.value && expected.value.length > 0 ? Object.keys(expected.value[0]) : [];
                            return (
                                <table className="beginner-table">
                                    <thead>
                                        <tr>
                                            {headers.map((h, i) => <th key={i}>{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expected.value.map((row, i) => (
                                            <tr key={i}>
                                                {headers.map((h, j) => <td key={j}>{row[h]}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            );
                        } else if (expected.type === "single_value" || expected.type === "count") {
                            return (
                                <table className="beginner-table">
                                    <thead>
                                        <tr>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{expected.value}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        } else if (expected.type === "column") {
                            return (
                                <table className="beginner-table">
                                    <thead>
                                        <tr>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expected.value.map((val, i) => (
                                            <tr key={i}>
                                                <td>{val}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            );
                        } else if (expected.type === "row") {
                            const headers = Object.keys(expected.value);
                            return (
                                <table className="beginner-table">
                                    <thead>
                                        <tr>
                                            {headers.map((h, i) => <th key={i}>{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {headers.map((h, i) => <td key={i}>{expected.value[h]}</td>)}
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}

export default Discription;