
export async function fetchAssignments() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/assignments`);
    const data = await response.json();
    return data;
}

export async function runQuery(assignmentId, query) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/assignments/${assignmentId}/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, assignmentId }),
    });
    const data = await response.json();
    return data;
}

export async function getHint(assignmentId, query) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/assignments/${assignmentId}/hint`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, assignmentId }),
    });
    const data = await response.json();
    return data;
}

export async function submitQuery(data, token, assignmentId) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/assignments/${assignmentId}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    const resultData = await response.json();
    return resultData;
}


export async function getUserSubmission(userId, assignmentId, token) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/assignments/${userId}/${assignmentId}/submissions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    const resultData = await response.json();
    return resultData;
}