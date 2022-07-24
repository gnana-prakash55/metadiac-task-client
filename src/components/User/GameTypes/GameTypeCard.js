import { CgCardClubs } from "react-icons/cg"
import '../UserPanel.css'

const GameTypeCard = ({ handleGame, type }) => {
    return (
        <div className="game-type-card" onClick={handleGame}>
            <CgCardClubs size={200} />
            <p>{type.name}</p>
        </div>
    )
}

export default GameTypeCard