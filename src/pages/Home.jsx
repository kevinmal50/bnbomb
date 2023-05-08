import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useRef, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi'
import { ethers } from "ethers";
import abi from '../utils/abis/ABI.json';
import Timer from '../components/Timer';

const Home = () => {
    const { address, isConnected } = useAccount()
    const provider = useProvider()
    const { data: signer } = useSigner()
    const [isHolder, setHolderStatus] = useState(false)
    const [bkr ,setBunker] = useState(false)
    const [boom, setBoom] = useState(false)
    


    useEffect(() => {
        if (isConnected) {
            updateHoldStatus()
        }
            
        }
)

    const hasBoom = async() => {
        const bnbomb = new ethers.Contract("0xD1Eb14Ce44282EA248a1d786333c6331618351Bc", abi, provider)
        const expl = await bnbomb.hasExploded(`${address}`)
        setBoom(expl)
    }

    const updateHoldStatus = async () => {
        const bnbomb = new ethers.Contract("0xD1Eb14Ce44282EA248a1d786333c6331618351Bc", abi, provider)
        const hodl = await bnbomb.balanceOf(`${address}`)
        if (parseInt(hodl) !== 0) {
            setHolderStatus(true)
        }
    }
    const handleBunker = async () => {
        try{
            const bnbomb = new ethers.Contract("0xD1Eb14Ce44282EA248a1d786333c6331618351Bc", abi, signer)
            let tx = await bnbomb.enterBunker()
            await tx.wait(1)
            setBunker(await bnbomb.inBunker(`${address}`))
        } catch{
            console.log("err bunker")
        }
    }

    const handleDefuse = async () => {
        try {
            const bnbomb = new ethers.Contract("0xD1Eb14Ce44282EA248a1d786333c6331618351Bc", abi, signer)
            let tx = await bnbomb.defuse()
            await tx.wait(1)
        } catch {
            console.log("err")
        }
    }

    return (
        <div className='home'>
            <div id="cnbtn">
                <ConnectButton accountStatus="address" chainStatus="none" showBalance={false} />
            </div>
            {isConnected ? (

                <div>
                    {isHolder ? (
                        <div>
                            {boom ? (<div id='exploded'>YOUR WALLET EXPLODED</div>) : (<>
                               <Timer hld={handleDefuse} hsb={hasBoom} isCon={isConnected} address={address} provider={provider} inBunker={bkr} />
                               <button id='bunkerbtn' onClick={handleBunker}>ENTER THE BUNKER</button>
                               </>
                            )}
                        </div>
                    ) :
                        (<div id='notHolder'>
                        YOU DON'T HOLD ANY $BOMBS, YOU CAN BUY SOME BOMBS ON <a href="https://google.com">PANCAKESWAP</a>
                        </div>
                        )
                    }
                </div >
            ) : (
                <div id="rules">RULES: <br />
                    1. YOUR BOMBS WILL EXPLODE AFTER 8 HOURS OF INACTIVITY <br />
                    2. IF YOUR BOMBS EXPLODE, YOUR WALLET WILL BE NUKED AND YOUR TOKENS LOCKED FOREVER <br />
                    3. YOU CAN DEFUSE YOUR BOMBS AT ANY TIME BY USING THE DEFUSE BUTTON TO RESET THE TIMER OR BY RECEIVING TOKENS <br />
                    4. YOU CAN ALSO ENTER THE BUNKER BY USING THE BUNKER BUTTON TO PROTECT YOUR WALLET FROM THE EXPLOSION DURING 7 DAYS <br />
                    5. WHILE IN THE BUNKER, YOU CAN'T SEND OR RECEIVE TOKENS</div>
            )}

        </div >

    );
};

export default Home;