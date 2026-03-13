import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserSubmission } from "../services/AssignmentService";
import { AssignmentContext } from "../context/AssignmentContext";
import "../styles/Submission.css";

function Submission() {
    let [submission, setSubmission] = useState([]);
    const { user } = useContext(AuthContext);
    const { currentlySelectedAssignment } = useContext(AssignmentContext);

    useEffect(() => {
        async function fetchUserSubmissions() {
            if (user && currentlySelectedAssignment) {
                const token = localStorage.getItem("token");
                const submissions = await getUserSubmission(user._id, currentlySelectedAssignment._id, token);
                console.log(submissions);
                setSubmission(submissions);
            }
        }
        fetchUserSubmissions();
    }, [user, currentlySelectedAssignment])


    if (!user) {
        return (
            <div>
                <h2>Login to view submissions</h2>
            </div>
        )
    }

    return (
        <div>
            {
                submission.length > 0 ? (<div>
                    <h2>Submissions</h2>
                    {
                        submission.map((submission) => (
                            console.log(submission),
                            <div key={submission._id} className={`submission ${submission.isCompleted ? "accepted" : "error"}`}>
                                <p className={`${submission.isCompleted ? "Accepted" : "Error"}`}>{submission.isCompleted ? "Accepted" : "Error"}</p>
                                <p>{new Date(submission.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    }
                </div>) : (<h2>No submissions found</h2>)
            }
        </div>
    );
}

export default Submission;