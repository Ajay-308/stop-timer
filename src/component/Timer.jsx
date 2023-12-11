import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri"

import "../App.css"

const Timer = () => {
    const [timeInput, setTimeInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const [initialTime, setInitialTime] = useState(null);



    const handleInputChange = (event) => {
        const newtime = event.target.value
        if (!timerRunning) {
            setTimeInput(newtime);
        }
        else {
            setTimeInput(newtime)
            setTimerRunning(false)
            setTimeLeft(null)
            setInitialTime(null)
        }
    };

    //ye time ko reset karne ke liye
    const resetTimer = () => {
        setTimeInput('');
        setTimeLeft(null)
        setTimerRunning(false)
        setInitialTime(null);

    }


    //time ko start karne ko
    const startCountdown = () => {
        const totalTimeInMinutes = parseInt(timeInput, 10);

        if (totalTimeInMinutes > 0 && !timerRunning) {
            if (timeLeft == null) {
                setTimeLeft(totalTimeInMinutes * 60);
            }

            setTimerRunning(true);
        }
    };

    //for stop
    const stopCountdown = () => {
        setTimerRunning(false);
        setInitialTime(timeLeft)
    };

    //for getting time
    useEffect(() => {
        if (timerRunning && timeLeft !== null && timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);

            return () => clearInterval(countdown);
        } else if (timeLeft === 0) {
            setTimerRunning(false);
            setTimeLeft(null);
            console.log('Countdown finished!');
        }
    }, [timeLeft, timerRunning]);

    // for reset
    useEffect(() => {
        if (!timerRunning && initialTime !== null) {
            setTimeLeft(initialTime)
        }
    }, [timerRunning, initialTime])

    //format bata raha hai ki time kaise show karna hai


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        //check karega string 2 char long hai ki nhi agar nhi hai to 0 add karega start me
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='timer'>
            <div className='timer-content'>
                <h2>Enter minutes</h2>
                <input type='number' value={timeInput} onChange={handleInputChange} />
                <div className='all-buttons'>
                    <button className='play' onClick={startCountdown} disabled={timerRunning} ><FaPlayCircle /></button>
                    {timerRunning && (
                        <button className='stop' onClick={stopCountdown}><FaPauseCircle /></button>

                    )}

                    <button className='reset' onClick={resetTimer}><RiRestartFill /> </button>

                </div>
                {timeLeft != null && <div className='time-reamin'>{formatTime(timeLeft)}</div>
                }
            </div>

        </div>
    );
};

export default Timer