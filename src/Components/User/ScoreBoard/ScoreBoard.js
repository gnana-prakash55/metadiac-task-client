import { useEffect, useState } from "react";
import AppService from "../../../Service/ApiService";
import ListCard from "./ListCard/ListCard";
import './score.css'

const ScoreBoard = () => {

    const [scoreBoard,setScoreBoard] = useState([])

    useEffect(() => {
        AppService.scoreBoard().then(res => {
            console.log(res.data)
            setScoreBoard(res.data)
        })
    },[])

    return(
        <div>
            <div className="page-text">ScoreBoard</div>
            <div className="score-board-list">
                <div className="score-container">
                    {
                        scoreBoard.map((user,index) => (
                            <ListCard key={user._id} score={user} index={index}/>
                        )
                    )
                    }
                </div>
            </div>
        </div>
    )

}

export default ScoreBoard;