import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppService from "../../../Service/ApiService";
import Cards from "./Card.js/Cards";

const Users = () => {

    const [users, setUsers] = useState([])

    const getUsers = () => {
        AppService.getUsers().then(res => {
            setUsers(res.data)
            console.log(res.data)
        })
    } 

    useEffect(() => {

        getUsers()

    },[])

    const handleDelete = (id) => {
        const deletePayload = {
            userId: id
        }

        AppService.deleteUser(deletePayload).then(res => {
            console.log(res.data)
            getUsers()

        })


    }

    return (
        <div>
            <div className="page-text">Users List</div>
            <div className="score-board-list">
                <div className="score-container">
                    {
                        users.map((user) => (
                            <Cards key={user._id} users={user} handleDelete={handleDelete}/>
                        )
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Users;