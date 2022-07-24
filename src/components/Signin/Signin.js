import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppService from "../../Service/ApiService";
import './Signin.css'

const Signin = () => {

    const navigate = useNavigate()

    useEffect(() => {

        AppService.checkAuthStatus().then(res => {
            console.log(res.data)
            if(res.data?.role === "admin") navigate('/admin')
            if(res.data?.role === "user") navigate('/user')

        })

    },[])


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading,setLoading] = useState(false)

    const toast = useToast()

    const handleOnSubmit = () => {

        setLoading(true)

        const signinData = {
            email, password
        }

        if(email === "" || password === "") {
            setLoading(false)
            return  toast({
                title: 'Please Fill All The Fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        AppService.signin(signinData).then(res => {
            console.log(res.data)
            if(res.data.role === "admin") navigate('/admin')
            if(res.data.role === "user") navigate('/user')    

            localStorage.setItem('access_token', res.data.jwtToken)

        }).catch(err => {
            setLoading(false)
            return  toast({
                title: err.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        })

       
    }

    return (
        <div className="signin-container">
            <Stack className="signin-stack" spacing={3}>
                <h4 className="heading">SignIn</h4>
                <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <Input placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <Button disabled={loading} colorScheme='teal' size='md' onClick={handleOnSubmit}>
                    Signin
                </Button>

                <div className="signin-link">
                    <Link to="/signup">Signup?</Link>
                </div>

            </Stack>
        </div>
    )
}

export default Signin;