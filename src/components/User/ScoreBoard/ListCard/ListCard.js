import "./listCard.css"

const ListCard = ({ score, index }) => {
    return (
        <div className="score-card-container">

           <div className="scoreboard-list">
                <div>
                    <b>Rank:</b> { index + 1 }
                </div>
                <div>
                    <b>Name:</b> {score.name}
                </div>
                <div>
                    <b>TimeElapsed:</b> {score.timeElapsed}s
                </div>
           </div>

        </div>
    )
}


export default ListCard