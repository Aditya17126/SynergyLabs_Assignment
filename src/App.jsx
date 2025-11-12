import { useState } from "react";
import "./App.css";
import Post from "./Components/Post";

function App() {
  const [count, setCount] = useState(0);

  return (
   
      <section className="main-section">
        <h1>SYNERGYLABS CRUD OPERATIONS </h1>
        <Post />
      </section>
    
  );
}

export default App;
