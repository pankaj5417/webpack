import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="react">
      
       {["Android","iPhone","windows Phone","Blackberry"].map((el)=>(<ul><li>{el}</li></ul>))}
      Ready to Go with React
     
      <Todo />

    </div>
   
    
  );
}
function Todo(){
  return <div className="mobileos">
       <h1>Mobile Operating System</h1>

    <ul>
      <li>Android</li>
      <li>iPhone</li>
      <li>Windows Phone</li>
      <li>BlackBerry</li>
    </ul>

    <h1>Mobile Manufacturer</h1>
    <ul>
      <li>Samsung</li>
      <li>HTC</li>
      <li>Micromax</li>
      <li>Apple</li>
    </ul>
  </div>
}

export default App;
