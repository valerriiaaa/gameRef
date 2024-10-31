import React, {useState, useRef} from 'react';
import ResultModal from "./ResultModal";


const TimerChallenge = ({title, targetTime}) => {
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timer = useRef(null);
    const dialog= useRef(null);

    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if(timeRemaining<=0){
        clearInterval(timer.current);
        setTimeRemaining(targetTime*1000);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }
    function handleStart(){
        timer.current = setInterval(() =>{
            setTimeRemaining(prevTimeRemaining =>prevTimeRemaining-10)
        }, 10);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
           <ResultModal
               ref={dialog}
               targetTime={targetTime}
               remainingTime={timeRemaining}
               onReset={handleReset}
           />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className="challange-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timeIsActive ? handleStop : handleStart}>
                        {timeIsActive ? 'Stop ' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timeIsActive ? 'active' : undefined}>
                    {timeIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>


    );
};

export default TimerChallenge;