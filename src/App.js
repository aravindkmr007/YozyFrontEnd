import Table from './Components/Table';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import FormButton from './Components/FormButton';

function App() {
  const [Data, setData] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:4000/Empolyee")
    .then (
      res => setData(res.data)
    )
  }, [Data])
  // console.log(Data)
  return (
    <div className="App">
      <FormButton />
      {
        Data === null ? "" :<Table Data = {Data} />
      }
      
    </div>
  );
}

export default App;
