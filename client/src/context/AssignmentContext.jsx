import { createContext } from "react";
import useFetchAssignments from "../hooks/useFetchAssignments";

export const AssignmentContext = createContext(null);

export const AssignmentProvider = ({ children }) => {
    const { assignments, loading, error, currentlySelectedAssignment, setCurrentlySelectedAssignment } = useFetchAssignments();
    return (
        <AssignmentContext.Provider value={{ assignments, loading, error, currentlySelectedAssignment, setCurrentlySelectedAssignment }}>
            {children}
        </AssignmentContext.Provider>
    );
};
