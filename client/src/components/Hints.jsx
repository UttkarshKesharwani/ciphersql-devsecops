import { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { getHint } from "../services/AssignmentService";
import { useContext } from "react";
import { AssignmentContext } from "../context/AssignmentContext";




function Hints() {

    const [hint, setHint] = useState("");
    const [messages, setMessages] = useState([
        // {
        //     question:"Hello! How can I help you with SQL today?",
        //     answer:"hey there"
        // },
        // {
        //     question:"How can i help you with SQL today?",
        //     answer:"hey there"
        // }
    ]);

    const { currentlySelectedAssignment } = useContext(AssignmentContext);
    console.log(currentlySelectedAssignment);

    const handleHintClick = async () => {
        console.log(hint);
        setHint(" ");
        const response = await getHint(currentlySelectedAssignment._id, hint)
        setMessages((prev) => [...prev, { question: hint, answer: response.hint }])
        console.log(response);
    }

    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            handleHintClick();
        }
    }

    return (
        <div className="hint-container">
            <div className="hint-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message-block">
                        <div className="user-message">
                            <strong>You: </strong> {msg.question}
                        </div>
                        {msg.answer && (
                            <div className="bot-message">
                                <strong>Hint: </strong> {msg.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="search-container">
                <input type="text" value={hint} onChange={(e) => setHint(e.target.value)} className="search-box" onKeyDown={handleEnterPress} placeholder="Ask for a hint..." />
                <button className="search-btn" onClick={handleHintClick}><FaArrowUp /></button>
            </div>
        </div>
    );
}

export default Hints;