import { Button, Input, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { CgCardClubs } from "react-icons/cg"
import AppService from "../../../Service/ApiService"
import GameTypeCard from "./GameTypeCard"
import '../UserPanel.css'


const GameType = ({ handleGame }) => {

    const [role, setRole] = useState('')
    const [gameTypes, setGameTypes] = useState([])
    const [gameType, setGameType] = useState('')

    const toast = useToast()

    const getGameTypes = () => {
        AppService.listGameTypes().then(res => {
            console.log(res.data)
            setGameTypes(res.data)
        })
    }

    useEffect(() => {

        AppService.checkAuthStatus().then(res => {
            setRole(res.data.role)
        })

        getGameTypes()

    },[])

    const handleSubmit = () => {
        const gameTypepayload = {
            gametype: gameType
        }

        console.log(gameTypepayload)

        AppService.addGameTypes(gameTypepayload).then(res => {
            getGameTypes()
            console.log(res.data)
            if(res.status === 200) {
                return toast({
                    title: 'Game Type Created',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }).catch(err => {
            return toast({
                title: err.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <div>

            <div className="game-type-container">
                <div>
                    <div className="page-text">Game Types</div>
                    <div className="game-type-sub">
                        {
                            gameTypes.map(type => (
                                <GameTypeCard handleGame={handleGame} type={type} />   
                            ))
                        }
                    </div>
                    {
                        role === 'admin' ?
                        <div className="gametype-btn">
                            <Input className="add-game-type" placeholder="Game Type" value={gameType} onChange={e => setGameType(e.target.value)}/>
                            <Button colorScheme="teal" onClick={handleSubmit}>Add GameType</Button>
                        </div>: ''
                    }
                    
                </div>
            </div>

        </div>
    )
}

export default GameType