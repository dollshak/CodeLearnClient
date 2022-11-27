import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetAllUsers = () => {
    const [users, setUsers] = useState([])
    useEffect( () => {
        axios.get('http://localhost:5000/users')
        .then( res => {
            console.log(res)
            setUsers(res.data)
            return(users)
        })
        .catch(err => {
            return(err)
        })
    })
}

export default GetAllUsers