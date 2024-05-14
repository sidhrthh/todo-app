import { ToDo } from './component/ToDo';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Popup } from './component/Popup';


function App() {
  const [input, setInput] = useState("")
  const [toDos, setToDos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState<{ text?: string, id?: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/");
        setToDos(response.data)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [updateUI]);

  const addTodo = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/add/", { toDo: input })
      setUpdateUI((prevState) => !prevState)
      setInput("")
      console.log(response.data)
    }
    catch (error) {
      console.error(error)
    }
  }


  return (
    <div >
      <div className='flex justify-center items-center flex-col'>
        <div>
          <h1 className='text-4xl mt-10 mb-5 font-extrabold	'>Tasks:</h1>
          <div className='flex'>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
              className='border-2 border-gray p-2 text-center mr-2'
              type="text"
              placeholder='Add a todo...'
            />
            <button
              className=' bg-slate-500 text-white p-2 rounded'
              onClick={addTodo}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>

            </button>
          </div>

          <div className='border-b border-grey mt-3 mb-3'></div>

        </div>

        {/* Todo comoponent */}
        <div className='list w-1/2'>
          {toDos.map((el: any) =>
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          )}
        </div>

        {/* PopUp Component */}
        {showPopup &&
          <Popup
            setShowPopup={setShowPopup}
            popupContent={popupContent ? popupContent : { text: "", id: "" }}
            setUpdateUI={setUpdateUI}
          />
        }
      </div>
    </div>
  );
}

export default App;
