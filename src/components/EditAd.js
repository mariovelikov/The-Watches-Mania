import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { editAd, fetchData } from "../store/reducers/advertisementSlice"
import Form from "./Form"

const EditAd = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const Ads = useSelector(state => state.ads)
    const ad = Ads.filter(ad => ad.id === Number(id))
    const [formData, setformData] = useState()


    useEffect(() => {
        if (!Ads[0]) {
            dispatch(fetchData())
        } else {
            setformData({
                title: ad[0].title,
                brand: ad[0].brand,
                description: ad[0].description,
                price: ad[0].price
            })
        }
    }, [Ads])

    function handlerSubmit(e) {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('title', formData.title)
        formdata.append('brand', formData.brand)
        formdata.append('description', formData.description)
        formdata.append('price', parseFloat(formData.price))

        const x = {
            data: formdata,
            id: id
        }

        dispatch(editAd(x))
    }

    function handlerChange(e) {
        switch (e.target.name) {
            case 'title':
                setformData((prev) => {
                    return {
                        ...prev,
                        title: e.target.value
                    }
                })
                break;
            case 'brand':
                setformData((prev) => {
                    return {
                        ...prev,
                        brand: e.target.value
                    }
                })
                break;
            case 'description':
                setformData((prev) => {
                    return {
                        ...prev,
                        description: e.target.value
                    }
                })
                break;
            case 'price':
                setformData((prev) => {
                    return {
                        ...prev,
                        price: e.target.value
                    }
                })
                break;
            default:
                console.log(e.type);
        }
    }

    if (!Ads[0]) {
        return (
            <h5>loading...</h5>
        )
    }

    return (
        <>
            <Form handlerChange={handlerChange} handlerSubmit={handlerSubmit} ad={ad} />
        </>
    )
}

export default EditAd