import React from 'react';
import './App.css';
import {StopTimer} from "./components/StopTimer";
import {Banner} from "./components/Banner";

function App() {
    return (
        <div className="App">
            <Banner/>
            <StopTimer/>
        </div>
    );
}

export default App;
