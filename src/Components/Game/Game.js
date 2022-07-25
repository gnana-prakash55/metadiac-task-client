import { useEffect, useState } from 'react'
import './game.css'
import _ from 'lodash'
import Card from './Card/Card'
import { ImDiamonds } from 'react-icons/im'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { CgCardClubs } from 'react-icons/cg'
import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import AppService from '../../Service/ApiService'
import DialogBox from './Dialog/DialogBox'
import { useNavigate } from 'react-router-dom'

const Game = ({ gameType }) => {

    const [card, setCard] = useState([
        { _id: 1, name: 'A', type: 'diamond' },
        { _id: 2, name: '1', type: 'diamond' },
        { _id: 3, name: '2', type: 'diamond' },
        { _id: 4, name: '3', type: 'diamond' },
        { _id: 5, name: '4', type: 'diamond' },
        { _id: 6, name: '5', type: 'diamond' },
        { _id: 7, name: '6', type: 'diamond' },
        { _id: 8, name: '7', type: 'diamond' },
        { _id: 9, name: '8', type: 'diamond' },
        { _id: 10, name: '9', type: 'diamond' },
        { _id: 11, name: '10', type: 'diamond' },
        { _id: 12, name: 'J', type: 'diamond' },
        { _id: 13, name: 'Q', type: 'diamond' },
        { _id: 14, name: 'K', type: 'diamond' },
        { _id: 15, name: 'A', type: 'heart' },
        { _id: 16, name: '1', type: 'heart' },
        { _id: 17, name: '2', type: 'heart' },
        { _id: 18, name: '3', type: 'heart' },
        { _id: 19, name: '4', type: 'heart' },
        { _id: 20, name: '5', type: 'heart' },
        { _id: 21, name: '6', type: 'heart' },
        { _id: 22, name: '7', type: 'heart' },
        { _id: 23, name: '8', type: 'heart' },
        { _id: 24, name: '9', type: 'heart' },
        { _id: 25, name: '10', type: 'heart' },
        { _id: 26, name: 'J', type: 'heart' },
        { _id: 27, name: 'Q', type: 'heart' },
        { _id: 28, name: 'K', type: 'heart' },
    ])

    const [randomCard, setRandomCard] = useState({})
    const [panelHeart, setPanelHeart] = useState([])
    const [panelDiamond, setPanelDiamond] = useState([])
    const [draggable, setDraggable] = useState(false)
    const [currentHeart, setCurrentHeart] = useState({ type: 'heart' })
    const [currentDiamond, setCurrentDiamond] = useState({ type: 'diamond' })
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [timeElapsed, setTimeElapsed] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading]= useState(true)

    const toast = useToast()
    const navigate = useNavigate()

    
    const handleStart = () => {

        setStartTime(new Date())
        setLoading(false)
    
    }

    const handleEnd = () => {

        const time = new Date()
        setEndTime(time)

        let dif = startTime.getTime() - new Date().getTime();

        let sec_from_T1_to_T2 = dif / 1000;
        let secs_between_dates = Math.abs(sec_from_T1_to_T2)

        console.log(secs_between_dates)

        setTimeElapsed(secs_between_dates)

        console.log(gameType)

        const saveGamePayload = {
            startTime,
            endTime: time ,
            timeElapsed: secs_between_dates,
            gameType
        }

        AppService.saveGame(saveGamePayload).then(res => {
            console.log(res.data)
        })

        onOpen()

    }


    const onTapCard = () => {
        console.log('tapped')
        const randCard = _.shuffle(card)[0]
        // const randCard = card[0]
        if(!randCard) {
            setDraggable(false)
            setRandomCard({})
        }
        else setRandomCard(randCard)
    }

    const dragStart = (e, id) => {
        e.dataTransfer.setData("randCard", id)
    }

    const dragOver = (e) => {
        e.preventDefault()
    }

    const dragHeartDropped = async (e) => {
        const id = e.dataTransfer.getData("randCard")
        const data = card.find(el => el._id == id)

        console.log(currentHeart?._id + 1,id)

        if(data.type !== "heart") return

        if(currentHeart?._id + 1 != id && data._id != 15) return

        const filArr = card.filter(card => card._id != id)
        setCard(filArr)

        if(filArr.length === 0) handleEnd()
            
        setPanelHeart(prevArr => [...prevArr, data])
        console.log(data)
        setCurrentHeart(data)
        // onTapCard()

    }

    const dragDiamondDropped = async (e) => {
        const id = e.dataTransfer.getData("randCard")
        const data = card.find(el => el._id == id)

        console.log(currentDiamond?._id + 1, id)

        if(data.type !== "diamond") return

        if(currentDiamond?._id + 1 != id && data._id != 1) return

        const filArr = card.filter(card => card._id != id)
        setCard(filArr)

        if(filArr.length === 0) handleEnd()

        setPanelDiamond(prevArr => [...prevArr, data])
        console.log(data)
        setCurrentDiamond(data)
        // onTapCard()
        
    }

    const handleStartGame = async () => {

        setDraggable(true)
        handleStart()
       
    }

    useEffect(() => {

        onTapCard()

    }, [card])

    return (
        <div>
            <div className="page-text">Solitaire</div>

            <div className='timmer'>
                <div>
                    { loading ? <Button colorScheme="teal" onClick={ handleStartGame} >Start</Button>
                        : ''
                    }
                </div>
            </div>

            <div className="game-container">

                <div className="game-tap-card" onClick={onTapCard}>
                    <CgCardClubs size={200} />
                </div>

                <div className="game-shuffle-card" draggable={draggable} onDragStart={(e) => dragStart(e, randomCard._id)}>

                    <div className='card-head'>
                        <div>{randomCard?.name}</div>

                        <div className='card-icon'>
                            { randomCard?.type === 'diamond' ? <ImDiamonds color='red' /> : randomCard.type === 'heart' ? <BsFillSuitHeartFill color='red' /> : ''  }
                        </div>
                    </div>

                    <div className='card-body'>
                        <div className='card-body-icon'>
                            { randomCard?.type === 'diamond' ? <ImDiamonds color='red' size={60} /> : randomCard.type === 'heart' ? <BsFillSuitHeartFill color='red' size={60} /> : '' }
                        </div>
                    </div>

                </div>

            </div>

            <div className='panel-container'>

                <div className='panel-heart' droppable onDragOver={(e) => dragOver(e)} onDrop={(e) => dragHeartDropped(e)}>
                    {
                        currentHeart ? 
                            <Card key={currentHeart._id} _id={currentHeart._id} name={currentHeart.name} type={currentHeart.type} />
                            : ''

                    }
                </div>

                <div className='panel-diamond' droppable onDragOver={(e) => dragOver(e)} onDrop={(e) => dragDiamondDropped(e)}>
                    {
                        currentDiamond ? 
                            <Card key={currentDiamond._id} _id={currentDiamond._id} name={currentDiamond.name} type={currentDiamond.type} />
                            : ''
                    }
                </div>

            </div>

            
            <DialogBox isOpen={isOpen} onOpen={onOpen} onClose={onClose} timeElapsed={timeElapsed}/>

        </div>
    )
}

export default Game;