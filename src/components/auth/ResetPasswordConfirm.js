import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import resetPasswordConfirm from "../../store/actions/auth/resetPasswordConfirm"

const ResetPassword = () => {
    const dispatch = useDispatch()
    const { uid, token } = useParams()

    const [data, setEmail] = useState({
        uid: uid,
        token: token
    })
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPasswordConfirm(data))
    }
    const onChange = (e) => {
        setEmail({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="password" name="new_password" placeholder="Type your password..." onChange={onChange} required />
            <input type="password" name="re_new_password" placeholder="Retype your password..." onChange={onChange} required />
            <button>Confirm</button>
        </form>
    )
}

export default ResetPassword