import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import AppService from "../../Service/ApiService"
import "./wallet.css"


const Wallet = () => {

    const [amount, setAmount] = useState()
    const [addAmount, setAddAmount] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [buttonOpen, setButtonOpen] = useState(false)
    const toast = useToast()

    const getBalance = () => {
        AppService.showBalance().then(res => {
            setAmount(res.data?.balance)
            console.log(res.data)
        })
    }

    useEffect(() => {

        getBalance()
        
    },[])

    const handleSubmit = () => {

        const addAmountData = {
            amount: parseInt(addAmount)
        }

        console.log(addAmountData)

        AppService.addAmount(addAmountData).then(res => {
            console.log(res.data)
            if(res.status === 200) {
                getBalance()
                onClose()
                return  toast({
                    title: 'Amount has been Added',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            } 
        }).catch(err => {
            getBalance()
            onClose()
            return  toast({
                title: err.response.data?.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        })

        onClose()

    }

    const handleWallet = () => {
        setButtonOpen(true)
        AppService.createWallet().then(res => {
            console.log(res.data)
            getBalance()
        })
    }

    return (
        <div>
            <div className="wallet-container">
                <div className="page-text">Your Wallet</div>
               {
                amount !== undefined ? <div className="balance-text">
                        Balance
                     </div>: ''
               }
               <div className="amount">
                    {amount}
               </div>
               <div>
               { amount !== undefined ? <Button colorScheme='teal' size='md' leftIcon={<AiOutlinePlus />} onClick={onOpen}>
                    Add Amount  
                </Button>:<Button colorScheme='teal' size='md' leftIcon={<AiOutlinePlus />} onClick={handleWallet} disabled={buttonOpen}>
                    Create Wallet
                </Button>}

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Add Amount</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Please Enter the Amount" type="number"
                        value={addAmount} 
                        onChange={e => setAddAmount(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="teal" onClick={handleSubmit}>Add</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
               </div>
            </div>
        </div>
    )
}

export default Wallet