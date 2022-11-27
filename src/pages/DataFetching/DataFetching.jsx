import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DataFetching = () => {
    const [users,setUsers] = useState([])

    useEffect( () => {
        axios.get('http://localhost:5000/users')
        .then( res => {
            console.log(res)
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return (
        <div>
            <ul>
                {
                    users.map(user => <li key = {user.id}>{user.username}</li>)
                }
            </ul>
        </div>
    )
}

export default DataFetching