import { ImDiamonds } from 'react-icons/im'
import { BsFillSuitHeartFill } from 'react-icons/bs'

const Card = ({ _id, name, type }) => {
    return (
        <div className="card-container">

            <div className='card-head'>
                <div>{name}</div>

                <div className='card-icon'>
                    { type === 'diamond' ? <ImDiamonds /> : <BsFillSuitHeartFill />  }
                </div>
            </div>

            <div className='card-body'>
                <div className='card-body-icon'>
                    { type === 'diamond' ? <ImDiamonds size={60} /> : <BsFillSuitHeartFill size={60} />  }
                </div>
            </div>

        </div>
    )
}


export default Card