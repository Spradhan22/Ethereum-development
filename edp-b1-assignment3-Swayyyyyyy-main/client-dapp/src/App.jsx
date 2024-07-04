import { useState } from 'react'
import './App.css'
import Cert from "./Cert.json";
import Web3 from "web3";
function App() {
  
  const [connectedAccount, setConnectedAccount] = useState('null');
  const [outputData, setOutputData] = useState("")
  const [queryid, setQueryId] = useState(0)
  const [formData, setFormData] = useState({
  id: 0,
  name: '',
  course: '',
  grade: '',
  date: '',
  })
  
  const handleChange = (event) => {
  const { name, value } = event.target
  setFormData((prevState) => ({ ...prevState, [name] : value }))
  }
  
  const connectMetaMask = async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
   setConnectedAccount(accounts[0]);
  alert(`Successfully Connected ${connectedAccount}`)
  }

  const  handleSubmit = async (event) => {
  event.preventDefault();
  console.log(formData);
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Cert.abi, Cert.ContractAddress,
  );
  try {
    console.log(connectedAccount);
    console.log(instance._methods)  ;  
    const tx =  await instance.methods.issue(formData.id, formData.name, formData.course, formData.grade, formData.date).send({ from: connectedAccount });
    setFormData({ id: 0, name: '', course: '', grade: '', date: '' });
    console.log(tx);
  } catch (error) {
    console.error(error);
  }

  }
return (
<>
<h1>Ceritifate DApp</h1>
<br />
<button onClick={connectMetaMask}>Connect MetaMask</button>
<br />
<form>
<h2>Issue Certificate</h2>
<div>
<label htmlFor="id">ID: </label>
<input
type="number"
id="id"
name="id"
value={formData.id}
onChange={handleChange}
/>
</div>
<div>
<label htmlFor="name">Name: </label>
<input
type="text"
id="name"
name="name"
value={formData.name}
onChange={handleChange}
/>
</div>
<div>
<label htmlFor="course">Course: </label>
<input
type="text"
id="course"
name="course"
value={formData.course}
onChange={handleChange}
/>
</div>
<div>
<label htmlFor="grade">Grade: </label>
<input
type="text"
id="grade"
name="grade"
value={formData.grade}
onChange={handleChange}
/>
</div>
<div>
<label htmlFor="date">Date: </label>
<input
type="date"
id="date"
name="date"
value={formData.date}
onChange={handleChange}
/>
</div>
<div>
<button type="submit" onClick={handleSubmit}>Submit</button>
<button type="button">Reset</button>
</div>
</form>
<br /> <br />
<div>
  <label htmlFor='queryid'> Query ID: </label>
  <input type='number' id='queryid' name='queryid' value={queryid} onChange={(e) => setQueryId(e.target.value)} />
</div>
<button onClick={async () => {
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Cert.abi, Cert.ContractAddress);
  const data = await instance.methods.Certificates(queryid).call();
  console.log(data);
  setOutputData(`Name: ${data.name}, Course: ${data.course}, Grade: ${data.grade}, Date: ${data.date}`);
}} >Get Certificate</button>
<p>{outputData}</p>
</>
)
}

export default App
