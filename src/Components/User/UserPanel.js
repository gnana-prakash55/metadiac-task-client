import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Game from "../Game/Game"
import "./UserPanel.css"
import { TbMenu2 } from 'react-icons/tb'
import Wallet from "../Wallet/Wallet"
import ScoreBoard from "./ScoreBoard/ScoreBoard"
import GameType from "./GameTypes/GameType"

const UserPanel = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true) 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [com, setCom] = useState('wallet')


    useEffect(() => {

        const token = localStorage.getItem('access_token')
        
        if(!token) navigate('/')
        else setLoading(false)

    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }

    const handleWallet = () => {
        setCom('wallet')
        onClose()
    }

    const handleScoreBoard = () => {
        setCom('scoreboard')
        onClose()
    }

    const handleGame = () => {
        setCom('game')
        onClose()
    }

    const handleGameType = () => {
        setCom('gametype')
        onClose()
    }

    return(
        <div>
           {
                loading ? <h4>loading...</h4> :  
                <div>

                    <div className="menu-btn">

                    <Button colorScheme='teal' onClick={onOpen} leftIcon={<TbMenu2 />}>
                        Menu
                    </Button>

                    </div>
                    

                    { com === 'wallet' ? <Wallet />
                        : com === 'gametype' ? <GameType handleGame={handleGame} /> 
                        : com === 'scoreboard' ? <ScoreBoard /> : <Wallet />
                    }

                    <Drawer
                        isOpen={isOpen}
                        placement='left'
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Metadiac</DrawerHeader>

                        <DrawerBody>

                            <div className="menu-item" onClick={handleWallet}>
                                Wallet
                            </div>
                            <div className="menu-item" onClick={handleGameType}>
                                Game
                            </div>
                            <div className="menu-item" onClick={handleScoreBoard}>
                                ScoreBoard
                            </div>
                            <div onClick={handleLogOut} className="menu-item">
                                Logout
                            </div>

                        </DrawerBody>

                        </DrawerContent>
                    </Drawer>

                </div>
            }
        </div>
    )
}

export default UserPanel