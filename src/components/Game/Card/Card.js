import { ImDiamonds } from 'react-icons/im'
import { BsFillSuitHeartFill } from 'react-icons/bs'

const Card = ({ _id, name, type }) => {
    return (
        <div className="card-container">

            <div className='card-head'>
                <div>{name}</div>

                <div className='card-icon'>
                    { type === 'diamond' ? <ImDiamonds color='red' /> : <BsFillSuitHeartFill color='red' />  }
                </div>
            </div>

            <div className='card-body'>
                <div className='card-body-icon'>
                    { type === 'diamond' ? <ImDiamonds color='red' size={60} /> : <BsFillSuitHeartFill color='red' size={60} />  }
                </div>
            </div>

        </div>
    )
}


export default Card