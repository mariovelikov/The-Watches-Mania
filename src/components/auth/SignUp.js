import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import signUp from "../../store/actions/auth/signUp"

const SignUp = () => {
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const redirect = useNavigate()
    const signupError = useSelector(state => state.auth.error)
    const userCreated = useSelector(state => state.auth.user)


    const submit = (e) => {
        e.preventDefault()
        dispatch(signUp(data))
        // redirect("/")
    }

    const onChange = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value.trim()
            }
        })
    }

    if (userCreated) {
        redirect("/signin")
        return (
            <></>
        )
    }

    return (
        <form className="auth-form" onSubmit={submit}>
            <input type="email" name="email" placeholder="Enter your email..." required onChange={onChange} />
            <input type="name" name="name" placeholder="Enter your name..." required onChange={onChange} />
            <input type="password" name="password" placeholder="Enter your password..." required onChange={onChange} minLength="8"></input>
            <button type="submit">Sign Up</button>
            <p>You already have account ? <Link to="/signin">Sign In</Link> </p>
            <p className="error">{signupError !== 'token_not_valid' ? signupError : ''}</p>
        </form >
    )
}

export default SignUp