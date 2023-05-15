Name: Anvi Aggarwal

Email: anviaggarwal13@gmail.com

Registration No: 12016188

Project Link- https://ttt-assignment-seven.vercel.app/

First, we create a submit button that is displayed first time the page loads.
On clicking the button it callls the event handler handleClick where we fetch our API from the URL https://www.terriblytinytales.com/test.txt using fetch().
The useState() hook is used to keep track of state of data present in the API and update it. It taked two parameters- data and setData.
```
const[data, setData] =useState("");
```
Here, setData is updated
```
const handleClick = () =>{
    fetch('https://www.terriblytinytales.com/test.txt')
    .then(response=>response.text())
    .then(data=>{
      setData(data);
```
To parse the content of the file, we use split(' ') to separate words by spaces.
```
const words = data.split(' ');
```
To find frequency of occurence of each wrod, we use the reduce() function.
The reduce() function initializes an empty object as the accumulator ({}) and for each word, it increments the frequency count in the accumulator object.
(init[word] || 0) retrieves the current frequency count or 0 if the word is encountered for the first time.
Finally, (init[word] || 0) + 1 increments the frequency count by 1 for each occurrence of the word.
```
const frequency = words.reduce((init, word)=>{
        init[word]=(init[word] || 0)+1;
        return init;
      },{});
```
To filter the top 20 most frequently occurring words, we use Object.entries() and sort the data in descendingorder on the basis of its frequency of occurrence.
Then we use slice() function to separate out the first 20 items from the list.
```
const sort= Object.entries(frequency).sort((a,b)=> b[1]-a[1]);
      const top20 = sort.slice(0, 20).map(([word])=>word);
      setHead(top20);
```
Now, to create a histogram we use the Recharts library in React and create state variable for Histogram data
```
const[histogram, setHistogram] = useState([]); 
```
Then we create a function generateData() to generate data for the histogram whihc maps over the list of top words taking two parameters word and its frequency
```
 const generateData = (top, freq) =>{
    const data = top.map(word=>({
      word, frequency: freq[word],
    }));

    setHistogram(data);
  }
```
Then we render the Recharts Component
```
<BarChart width={800} height={400} data={histogram}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="word" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="frequency" fill="#088f8f"></Bar>
     </BarChart>
```
After this we create a button to export/download a csv file. To do that we use the CSVLInk component of react-csv library. It allows us to generate a CSV file and provide it for download.  
Create a variable csvData which is an array of objects representing the word and frequency data for the histogram.
```
const csvData=top.map(word=>({
    Word:word,
    Frequency:freq[word],
   }));
```
Add the CSVLink component within the component's JSX, passing the csvData array as the data prop. You can specify the desired filename for the exported CSV file using the filename prop.
Add a button inside the CSVLink component to trigger the download when clicked.
```
  <CSVLink data={csvData} filename="histogram_data.csv">
      <button id="export">Export CSV</button>
     </CSVLink>
```
