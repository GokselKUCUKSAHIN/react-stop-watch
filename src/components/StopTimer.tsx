import React from "react";
import {useState} from "react";
import {TimeTable} from "./TimeTable";
import "../styles/StopTimer.css";

export type StartStopText = "Start" | "Stop";
export type TimeResetText = "Time" | "Reset";

function createTimer(mutater: React.Dispatch<React.SetStateAction<Date>>, start: Date, interval = 50) {
    let startTime = start.getTime();
    const ref = setInterval(() => {
        startTime += interval;
        const date = new Date(startTime);
        mutater(date);
    }, interval);
    return () => {
        clearInterval(ref);
    }
}

function dateToTimeString(date: Date): string {
    return `${date.getMinutes().toString().padStart(2, "0")} : ${date.getSeconds().toString().padStart(2, "0")} . ${date.getMilliseconds().toString().substring(0, 2).padStart(2, "0")}`;
}

let stopCounting = () => {
};
let lastTime = new Date(0);

export function StopTimer() {
    const [timeFace, setTimeFace] = useState<Date>(new Date(0));
    const [startStopButton, setStartStopButton] = useState<StartStopText>("Start");
    const [timeResetButton, setTimeResetButton] = useState<TimeResetText>("Time");
    const [startStopClass, setStartStopClass] = useState("btn mx-3 fixed-btn btn-primary");
    const [lapTimes, setLapTimes] = useState<string[][]>([]);

    function handleStartStop() {
        if (startStopButton === "Start") {
            stopCounting = createTimer(setTimeFace, timeFace, 10);
        } else {
            stopCounting()
        }
        setStartStopButton(prev => {
            if (prev === "Start") {
                setTimeResetButton("Time");
                setStartStopClass("btn mx-3 fixed-btn btn-danger")
                return "Stop";
            } else {
                setTimeResetButton("Reset");
                setStartStopClass("btn mx-3 fixed-btn btn-primary");
                return "Start";
            }
        });
    }

    function handleTime() {
        if (timeResetButton === "Reset") {
            setTimeFace(new Date(0));
            lastTime = new Date(0);
            setLapTimes([]);
        } else if (timeResetButton === "Time") {
            const diff = new Date(timeFace.getTime() - lastTime.getTime());
            lastTime = timeFace;
            setLapTimes(prev => {
                return [...prev, [dateToTimeString(diff), dateToTimeString(timeFace)]];
            });
            console.log("tur süresi:", dateToTimeString(diff), "toplam süre:", dateToTimeString(timeFace));
        }
    }

    return (
        <div className="container-fluid">
            <div className='row justify-content-center'>
                <div className="col-sm-12 col-md-8 px-2">
                    <h1 className="display-4 mt-4 mb-2" style={{"fontFamily": "monospace"}}>
                        {dateToTimeString(timeFace)}
                    </h1>
                    <div className="d-flex justify-content-center my-3">
                        <button
                            className={startStopClass}
                            onClick={handleStartStop}>
                            {startStopButton}
                        </button>
                        <button
                            className='btn btn-light mx-3 fixed-btn'
                            onClick={handleTime}>
                            {timeResetButton}
                        </button>
                    </div>
                    <TimeTable laps={lapTimes}/>
                </div>
            </div>
        </div>
    )
}