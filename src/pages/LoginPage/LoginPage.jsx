import React from 'react'
import  { useNavigate , useEffect} from 'react-router-dom'

const LoginPage = () => {
    const [userDetails, setUserDetails] = React.useState({username:'', password:''})
    
    const user = {username:'gal', password:'123'}
    
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [event.target.name]:value
        })
    }    
    
        React.useEffect(() => {
          console.log('working')
    
        }, [userDetails.username])
    
    
        
        async function onSubmit  () {
            // // useEffect(() => {
            //     fetch('http://localhost:3000/users').then(
            //     resposne => { resposne.json();
            //     console.log(resposne.body.)}
            // ).then(
            //     data => {console.log(data)}
            // )
            // // })
            
            if(userDetails.password === user.password){
                localStorage.setItem(userDetails.name, 'token');
                navigate("/lobby");
                
            }else{
                alert('login is field, plese try again')
            }
        
        }
      return (
        <div className= 'login'>
        <div className='login_contianer'>
            <h1>Login Page</h1>
            <div className='inputs_container'>
            <label> username</label>
            <input value={userDetails.username} name='username' type="text" onChange={handleChange}/>
            <label> password</label>
            <input value={userDetails.password} name='password' type="text" onChange={handleChange}/>
            </div>
    
            <button type='submit' onClick={onSubmit}>login</button>
        </div>
        </div>
      )
    }
    
    export default LoginPage