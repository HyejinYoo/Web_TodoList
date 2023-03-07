import './App.css';
import {Main} from './component/Main.jsx'
import {ListManage} from './component/ListManage.jsx'

const App = () => {
  return (
    <>
      <div className="App">
        <p className = "todotitle">To Do List</p>
        <Main />
        <div className="scroll">
          <ListManage />
        </div>
      </div>
    </>
  );
}

export default App;