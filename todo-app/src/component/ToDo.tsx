import axios from "axios";
import React from "react";

interface TodoProps {
    text: string;
    id?: string;
    setUpdateUI?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPopup?:React.Dispatch<React.SetStateAction<boolean>>;
    setPopupContent?: React.Dispatch<React.SetStateAction<any>>; // Use the correct type for the state value
}

export const ToDo: React.FC<TodoProps> = ({text , id , setUpdateUI, setShowPopup , setPopupContent}) => {
    const deleteTodo = async () => {
        try{
            const response = await axios.delete(`http://localhost:3000/api/v1/delete/${id}`)
            if (setUpdateUI) {
                setUpdateUI((prevState) => !prevState);
              }
            console.log(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    function updateTodo() {
        if (setShowPopup && setPopupContent) { // Check both setShowPopup and setPopContent
            setPopupContent({ text, id });
            setShowPopup(true);
        }
    }
    
    
    return (
        <div className="border-2 mb-2 p-2 flex justify-between w-1/2">
            <div>
                {text}
            </div>
            <div className="flex justify-between">
                <button onClick={updateTodo} className="mr-3">Edit</button>
                <button onClick={deleteTodo}>Delete</button>
            </div>
        </div>
    );
};


