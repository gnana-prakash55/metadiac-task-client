import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { TbMenu2 } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import ScoreBoard from "../User/ScoreBoard/ScoreBoard"
import Wallet from "../Wallet/Wallet"
import "./AdminPanel.css"
import Manage from "./Manage/Manage"
import Users from "./Users/Users"

const AdminPanel = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true) 
    const [com, setCom] = useState('users')
    const { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(() => {
        
        const token = localStorage.getItem('access_token')
        
        if(!token) navigate('/')
        else setLoading(false)

    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }

    const handleUsers = () => {
        setCom('users')
        onClose()
    }

    const handleScoreBoard = () => {
        setCom('scoreboard')
        onClose()
    }

    const handleManage = () => {
        setCom('manage')
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
                    

                    { com === 'users' ? <Users />
                        : com === 'manage' ? <Manage /> 
                        : com === 'scoreboard' ? <ScoreBoard /> : <Users />
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

                            <div className="menu-item" onClick={handleUsers}>
                                Manage Users
                            </div>
                            <div className="menu-item" onClick={handleManage}>
                                Manage
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

export default AdminPanel