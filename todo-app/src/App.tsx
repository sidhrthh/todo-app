import { ToDo } from './component/ToDo';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Popup } from './component/Popup';


function App() {
  const [input, setInput] = useState("")
  const [toDos, setToDos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false)
  const [showPopup , setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState({});

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
    <div className='flex justify-center items-center flex-col '>
      <div>
        <h1 className='text-2xl mb-3'>To do App</h1>
        <div>
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
            className='border-2 bg-slate-500 text-white p-2 rounded'
            onClick={addTodo}
          >Add</button>
        </div>
      </div>

      {/* Todo comoponent */}
      <div className='list'>
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
        popupContent={popupContent ? popupContent : { text: '', id: '' }} // Provide default value if popupContent is undefined
        setUpdateUI={setUpdateUI} 
    />
}





    </div>
  );
}

export default App;
