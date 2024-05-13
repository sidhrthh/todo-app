import React, { useState } from "react";
import axios from "axios";

interface PopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    popupContent?: {
        text: string;
        id: string;
    };
    setUpdateUI: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Popup: React.FC<PopupProps> = ({ setShowPopup, popupContent, setUpdateUI }) => {
    const [input, setInput] = useState<string>(popupContent?.text || '');

    const updateTodo = async () => {
        try {
            if (!popupContent) return; // Ensure popupContent is defined
            const response = await axios.put(`http://localhost:3000/api/v1/update/${popupContent.id}`, { toDo: input });
            console.log(response.data);
            setUpdateUI(prevState => !prevState);
            setShowPopup(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p onClick={() => setShowPopup(false)}>X</p>
            <h2>Popup</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Update To do..."
                className="border-2 p-2"
            />
            <button onClick={updateTodo} className="border-2 p-2 bg-green-400">
                Update
            </button>
        </div>
    );
};
