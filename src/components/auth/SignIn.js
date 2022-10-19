import '../../stylesheet/SignIn.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import signIn from "../../store/actions/auth/signIn"
import loadUser from "../../store/actions/auth/loadUser"

const SignIn = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const access = useSelector(state => state.auth.access)
    const authError = useSelector(state => state.auth.error)
    const redirect = useNavigate()

    const [data, setData] = useState({
        email: null,
        password: null
    })

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadUser())
        }
        // if (access) {
        //     redirect("/")
        // }
    }, [])

    const submit = (e) => {
        e.preventDefault()
        dispatch(signIn(data))
    }

    const onChange = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value.trim()
            }
        })
    }

    if (isAuthenticated) {
        redirect("/")
    }

    return (
        <>
            <form className="auth-form" onSubmit={submit}>
                <input type="email" autoComplete="email" name="email" placeholder="Enter your email..." required onChange={onChange} />
                <input type="password" autoComplete="current-password" name="password" placeholder="Enter your password..." required onChange={onChange}></input>
                <button type="submit">SignIn</button>
                <p>Don't have account ? <Link to="/signup">Sign Up</Link> </p>
                {/* <p>Forgot your password ? <Link to="/reset_password">Reset</Link> </p> */}
            </form>
            <p className='error'>{authError !== 'token_not_valid' ? authError : ''}</p>
        </>
    )
}

export default SignIn