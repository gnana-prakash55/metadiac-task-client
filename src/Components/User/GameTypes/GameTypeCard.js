import { Button } from "@chakra-ui/react"
import { CgCardClubs } from "react-icons/cg"
import '../UserPanel.css'

const GameTypeCard = ({ handleGame, type, handleDelete, role }) => {
    return (
        <div className="game-type-card" onClick={handleGame}>
            <CgCardClubs size={200} />
            <p>{type.name}</p>
            {
                role === 'admin' ? 
                <Button className="game-type-card-btn" color="red" onClick={() => handleDelete(type._id)}>Delete</Button>
                :''
            }
        </div>
    )
}

export default GameTypeCard