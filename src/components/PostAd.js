import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loadUser from "../store/actions/auth/loadUser";
import { postData } from "../store/reducers/productsSlice";
import Form from "./Form";

const PostAd = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const error = useSelector(state => state.ads.error)
    const redirect = useNavigate()

    useLayoutEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }
    })

    const [state, setState] = useState({
        title: null,
        brand: null,
        description: null,
        price: null,
        image: null,
        images: []
    })

    function handlerSubmit(e) {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('title', state.title)
        formdata.append('brand', state.brand)
        formdata.append('description', state.description)
        formdata.append('price', parseFloat(state.price))
        formdata.append('image', state.image)

        Array.from(state.images).forEach(file => {
            formdata.append('images', file);
        });

        dispatch(postData(formdata))
        redirect("/")
    }

    function handlerChange(e) {
        if (e.target.name === 'images') {
            const list = []
            for (let image of e.target.files) {
                list.push(image)
            }

            setState(prev => {
                return {
                    ...prev,
                    images: list
                }
            })
        } else if (e.target.name === 'image') {
            setState(prev => {
                return {
                    ...prev,
                    image: e.target.files[0]
                }
            })
        }
        else {
            setState(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    return (
        <>
            <Form handlerSubmit={handlerSubmit} handlerChange={handlerChange} />
            <h5>{error ? error : ''}</h5>
        </>
    )
}

export default PostAd