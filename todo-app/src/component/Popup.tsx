import React, { useState } from "react";
import axios from "axios";

interface PopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    popupContent?: {
        text?: string;
        id?: string;
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
        <div className=" absolute border-2 bg-[#DADADA] rounded p-10">
            <div className="flex justify-between mb-3" >
            <h2 className="font-semibold">Update Task</h2>
            <p className="cursor-pointer" onClick={() => setShowPopup(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

            </p>
            </div>
            <div className="flex">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Update To do..."
                className="border-2 p-2 rounded-sm"
            />
            <button
              className=' bg-slate-500 text-white p-2 rounded'
              onClick={updateTodo}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>

            </button>
            </div>
        </div>
    );
};
