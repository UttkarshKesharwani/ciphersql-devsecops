import { useContext } from "react";
import { AssignmentContext } from "../context/AssignmentContext";
import "../styles/AssignmentList.css";
import { Link } from "react-router-dom";


function AssignmentList() {

    const { assignments, loading, error, setCurrentlySelectedAssignment } = useContext(AssignmentContext);

    if (loading) {
        return <div className="loading-state">Loading Assignments...</div>;
    }

    if (error) {
        return <div className="error-state">Error: {error.message}</div>;
    }

    return (
        <div className="assignment-list-container">
            <h2>Problem Set</h2>

            <div className="table-wrapper">
                <div className="assignment-header">
                    <div className="col-title">Title</div>
                    <div className="col-acceptance">Acceptance</div>
                    <div className="col-difficulty">Difficulty</div>
                </div>
                <div className="assignment-rows">
                    {assignments.map((assignment, idx) => (
                        <div className="assignment-row" key={idx}>
                            
                            <div className="col-title">
                                <Link onClick={() => setCurrentlySelectedAssignment(assignment)} to={`/solve/${assignment.title.split(" ").join("-").toLowerCase()}`} className="assignment-title-link">{idx + 1}. {assignment.title}</Link>
                            </div>
                            <div className="col-acceptance">
                                {assignment.acceptance_rate}%
                            </div>
                            <div className="col-difficulty">
                                <span className={`difficulty-badge difficulty-${assignment.description}`}>
                                    {assignment.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AssignmentList;