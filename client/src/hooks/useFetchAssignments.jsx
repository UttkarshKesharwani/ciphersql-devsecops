import { fetchAssignments } from "../services/AssignmentService";
import { useState, useEffect } from "react";

function useFetchAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let [currentlySelectedAssignment, setCurrentlySelectedAssignment] = useState(null);


    const fetchAssignmentsData = async () => {
        try {
            const data = await fetchAssignments();
            setAssignments(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAssignmentsData();
    }, []);

    return { assignments, loading, error, currentlySelectedAssignment, setCurrentlySelectedAssignment };
}

export default useFetchAssignments;
