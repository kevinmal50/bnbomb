import React, { useEffect, useState, useRef } from 'react';
import {ethers} from "ethers";
import abi from '../utils/abis/ABI.json'

const Timer = ({ isCon, hsb, hld, address, provider, inBunker }) => {
    const [timerHours, setTimerhours] = useState('00')
    const [timerMin, setTimermin] = useState('00')
    const [timerSec, setTimersec] = useState('00')
    const [timerDay, setTimerDay] = useState('00')
    let interval = useRef();
    useEffect(() => {
        if (isCon) {
            startTimer()
        }
    })

    const timer = async () => {
        const bnbomb = new ethers.Contract("0xD2010ed5CbB5020a6881CECDdD2cAbF10c31a355", abi, provider)
        const time = await bnbomb.getSecondsLeft(`${address}`)
        if (time !== 0) {

            const countdowndate = new Date(time * 1000).getTime()

            return countdowndate
        }

    }
    const startTimer = async () => {
        const countdownDate = await timer()
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now
            const z = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                hsb()
            } else {
                setTimerDay('0'+ z)
                if (hours < 10) {
                    setTimerhours("0" + hours)
                } else {
                    setTimerhours(hours)
                }
                if (minutes < 10) {
                    setTimermin("0" + minutes)
                } else {
                    setTimermin(minutes)
                }
                if (seconds < 10) {
                    setTimersec("0" + seconds)
                } else {
                    setTimersec(seconds)
                }


            }
        }, 1000)
    }
    return (
        <>
            {inBunker ? (<div></div>) : ( <><div id="timer">{timerDay}:{timerHours}:{timerMin}:{timerSec}
                <div id="defuse-btn">
                    <button id='defusebtn' onClick={hld}>
                        DEFUSE THE BOMB
                    </button>
                </div></div> <br /></>)}
           

        </>
    );
};

export default Timer;