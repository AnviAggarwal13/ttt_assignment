import {React, useState} from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {CSVLink} from 'react-csv';

function App() {
  const[buttonClick, setButtonClick]= useState(false);
  const[data, setData] =useState("");
  const[freq, setFreq] =useState({});
  const[top, setTop]= useState([]);
  const[histogram, setHistogram] = useState([]);  

  const generateData = (top, freq) =>{
    const data = top.map(word=>({
      word, frequency: freq[word],
    }));

    setHistogram(data);
  }

  const csvData=top.map(word=>({
    Word:word,
    Frequency:freq[word],
   }));

  const handleClick = () =>{
    fetch('https://www.terriblytinytales.com/test.txt')
    .then(response=>response.text())
    .then(data=>{
      setData(data);
      const words = data.split(' ');
      const frequency = words.reduce((init, word)=>{
        init[word]=(init[word] || 0)+1;
        return init;
      },{});
      setFreq(frequency);

      const sort= Object.entries(frequency).sort((a,b)=> b[1]-a[1]);
      const top20 = sort.slice(0, 20).map(([word])=>word);
      setTop(top20);

      generateData(top20, frequency);
      setButtonClick(true);

    })
    .catch(error=>console.log(error))
  };

  return (
    <div className="App">
      {!buttonClick && <button id="submit" onClick={handleClick}>SUBMIT</button>}
      {buttonClick && histogram.length>0 && (
        <>
      <BarChart width={800} height={400} data={histogram}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="word" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="frequency" fill="#088f8f"></Bar>
     </BarChart>

    
     <CSVLink data={csvData} filename="histogram_data.csv">
      <button id="export">Export CSV</button>
     </CSVLink>
        </>
      )}
        
    </div>
  );
}

export default App;
