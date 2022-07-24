import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppService from "../../Service/ApiService";
import './Signup.css'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {

        AppService.checkAuthStatus().then(res => {
            console.log(res.data)
            if(res.data?.role === "admin") navigate('/admin')
            if(res.data?.role === "user") navigate('/user')

        })

    },[])

    const handleOnSubmit = async () => {

        setLoading(true)

        const signupData = {
            name, email, password
        }

        if(name === "" || email === "" || password === "") {
            setLoading(false)
            return toast({
                title: 'Please Fill All the Fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })

        }

        AppService.signup(signupData).then(res => {
            if(res.status === 201) {
                navigate('/')
                return  toast({
                    title: 'Account created.',
                    description: "Signin to Continue..",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })       
            }
               
        }).catch(err => {
            setLoading(false)
            return  toast({
                title: err.response.data?.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })       
        })

    }

    return (
    <div className="signup-container">
        <Stack className="signup-stack" spacing={3}>
            <h4 className="heading">SignUp</h4>
            <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder='Email' value={email} type="email" onChange={e => setEmail(e.target.value)} />
            <Input placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button disabled={loading} colorScheme='teal' size='md' onClick={handleOnSubmit}>
                Signup
            </Button>

            <div className="signin-link">
                <Link to="/">Signin?</Link>
            </div>

        </Stack>
    </div>
    )
}

export default Signup;