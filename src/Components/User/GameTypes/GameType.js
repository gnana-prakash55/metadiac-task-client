import { Button, Input, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { CgCardClubs } from "react-icons/cg"
import AppService from "../../../Service/ApiService"
import GameTypeCard from "./GameTypeCard"
import '../UserPanel.css'
import { useNavigate } from "react-router-dom"
import Game from "../../Game/Game"


const GameType = ({ handleGame }) => {

    const [role, setRole] = useState('')
    const [gameTypes, setGameTypes] = useState([])
    const [gameTypeId, setGameTypeId] = useState('')

    const toast = useToast()

    useEffect(() => {

        AppService.checkAuthStatus().then(res => {
            setRole(res.data.role)
        })

        getGameTypes()

    },[])

    const getGameTypes = () => {
        AppService.listGameTypes().then(res => {
            console.log(res.data)
            setGameTypes(res.data)
        })
    }

    const handleGameOpen = async (gameTypeId) => {
        try {
            const gameTypePayload = {
                gameTypeId
            }
            const result = await AppService.walletAvailable(gameTypePayload)
            console.log(result.data)  
            setGameTypeId(gameTypeId)
            
        } catch (error) {
            console.log(error)
            if(error.response.status === 300) {
                return toast({
                    title: error.response.data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        }

    }

    const handleDelete = (gameTypeId) => {
        const deleteGameType = {
            gameTypeId
        }
        AppService.deleteGameType(deleteGameType).then(res => {
            console.log(res.data)
            getGameTypes()
        })
    }


    return (
        <div>

            { gameTypeId === '' || gameTypeId === undefined ? <div className="game-type-container">
                <div>
                    <div className="page-text">Game Types</div>
                    <div className="game-type-sub">
                        {
                            gameTypes.map(type => (
                                <GameTypeCard type={type} handleDelete={handleDelete} role={role} 
                                    handleGameOpen={handleGameOpen} getGameTypes={getGameTypes}/>   
                            ))
                        }
                    </div>
                </div>
            </div>: <Game gameType={gameTypeId}/> }

        </div>
    )
}

export default GameType