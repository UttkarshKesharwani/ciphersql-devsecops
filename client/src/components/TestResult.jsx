function TestResult({ result }) {

    if (!result) {
        return (
            <div className="test-result-empty">
                <p>Run your code to see the test results here.</p>
            </div>
        );
    }

    if (result.status === "loading") {
        return (
            <div className="test-result-loading">
                <p>Running query on Sandbox...</p>
            </div>
        );
    }

    if (result.error) {
        return (
            <div className="test-result-error">
                <h3>Execution Error</h3>
                <div>{result.error}</div>
            </div>
        );
    }

    const { correct } = result;

   

    return (
        <div className="test-result-container">
            
            {
                correct ? (
                    <div>
                        <h2>Correct Answer</h2>
                    </div>
                ) : (
                    <div>
                        <h2>Wrong Answer</h2>
                    </div>
                )
            }
        </div>
    );
}

export default TestResult;