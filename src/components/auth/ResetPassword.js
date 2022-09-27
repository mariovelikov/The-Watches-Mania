import { useState } from "react"
import { useDispatch } from "react-redux"
import reset_password from "../../store/actions/auth/resetPassword"

const ResetPassword = () => {
    const [email, setEmail] = useState({
        EMAIL_FIELD: null
    })
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(reset_password(email))
    }
    const onChange = (e) => {

        setEmail({ ...email, EMAIL_FIELD: e.target.value })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="EMAIL_FIELD" placeholder="Type your email..." onChange={onChange} required>
            </input>
            <button>Send</button>
        </form>
    )
}

export default ResetPassword