import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { CgCardClubs } from "react-icons/cg"
import Game from "../../Game/Game"
import '../UserPanel.css'
import AppService from "../../../Service/ApiService"

const GameTypeCard = ({ type, role, handleGameOpen, getGameTypes }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [gameType, setGameType] = useState('')
    const [price, setPrice] = useState('')

    const toast = useToast()

    useEffect(() => {
        setGameType(type.name)
        setPrice(type.price)
    },[])

    const handleSubmit = (gameTypeId) => {
        const gameTypepayload = {
            gameTypeId,
            gametype: gameType,
            price: price
        }

        console.log(gameTypepayload)

        AppService.addGameTypes(gameTypepayload).then(res => {
            onClose()
            getGameTypes()
            console.log(res.data)
            if(res.status === 200) {
                return toast({
                    title: 'Game Type Updated',
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
        <div className="game-type-card" onClick={() => handleGameOpen(type._id)}>
            <CgCardClubs size={200} />
            <p>{type.name}</p>
            <p>Price: {type.price}</p>
             {
                role === 'admin' ? 
                <Button className="game-type-card-btn" colorScheme="teal" onClick={onOpen}>Update</Button>
                :''
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Change Price amount</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text><b>GameType</b></Text>
                       <Input placeholder="GameType" value={gameType} onChange={e => setGameType(e.target.value)} />
                       <Text><b>Price</b></Text>
                       <Input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='teal' mr={3} onClick={() => handleSubmit(type._id)}>
                            Update  
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>

        </div>
    )
}

export default GameTypeCard