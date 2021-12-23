import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="react">
      {[1,2,3,4,5].map((e)=>(<h1>hello {e}</h1>))}
      Ready to Go with React
      <Todo />
      <h1> Lets see what can we do with react </h1>
    </div>
   
    
  );
}
function Todo(){
  return <h1>components</h1>
}

export default App;
