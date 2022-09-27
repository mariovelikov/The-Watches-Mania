import '../stylesheet/FilterMenu.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFilteredProducts } from '../store/reducers/productsSlice'

export default function FilterMenu() {
    const state = useSelector(state => state.ads)
    const filteredProducts = useSelector(state => state.ads.filteredAds)
    const [filterItems, setFilterItems] = useState(JSON.parse(localStorage.getItem('filter') ? localStorage.getItem('filter') : JSON.stringify({})))
    const [filterOptions, setFilterOptions] = useState({})
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if (!localStorage.getItem('filter')) {
            localStorage.setItem('filter', JSON.stringify({}))
        }
    }, [])

    useEffect(() => {
        checkFilterOptions()
    }, [filteredProducts])

    useEffect(() => {
        if (Object.keys(filterItems).length) {
            filterData()
        } else {
            dispatch(addFilteredProducts([]))
        }

    }, [filterItems])


    // check available filter options and add it to filterItems
    function checkFilterOptions() {
        let data = state.filteredAds.length ? state.filteredAds : state.ads

        const gender = new Set()
        const brand = new Set()
        const movement_type = new Set()
        const water_resistance = new Set()

        for (let product of data) {
            for (let item in product) {
                switch (item) {
                    case 'gender':
                        gender.add(product[item])
                        break

                    case 'brand':
                        brand.add(product[item])
                        break

                    case 'movement_type':
                        movement_type.add(product[item])
                        break

                    case 'water resistance':
                        water_resistance.add(product[item])
                        break

                    default:
                }
            }

            const obj = {
                gender: [],
                brand: [],
                movement_type: [],
                water_resistance: []
            }

            obj.gender = [...gender]
            obj.brand = [...brand]
            obj.movement_type = [...movement_type]
            obj.water_resistance = [...water_resistance]

            for (let property in obj) {
                if (!obj[property].length) {
                    delete obj[property]
                }
            }
            setFilterOptions(obj)
        }
    }

    const filterData = () => {
        let list = []

        list = state.ads.filter((item) => Object.entries(filterItems).every(([key, value]) => item[key] === value))

        dispatch(addFilteredProducts(list))
    }

    const checkUncheck = (e) => {
        if (e.target.className === 'filter checked') {
            e.target.className = 'filter unchecked'

            const obj = {
                ...filterItems,
            }

            delete obj[e.target.parentNode.parentNode.id]
            setFilterItems(obj)
            localStorage.setItem('filter', JSON.stringify(obj))

        } else {
            const obj = {
                ...filterItems,
                [e.target.parentNode.parentNode.id]: e.target.id,
            }

            setFilterItems(obj)
            localStorage.setItem('filter', JSON.stringify(obj))

            e.target.className = 'filter checked'
        }
    }

    // hide unhide hidden menu 
    const hideUnhideBox = (e) => {
        upDownArrow(e)

        let element = e.target.parentNode

        // if click on icon or title, parent element is filter-title-box but i need filter-item
        if (!element.className.includes('filter-item')) {
            element = element.parentNode
        }

        // toggle active class
        let word = element.className.includes('active')

        if (word) {
            const classN = element.className.replace('active', '')
            element.className = classN
        } else {
            element.className += ' active'
        }
    }

    // toggle arrow icon class
    const upDownArrow = (e) => {

        // if click parent 
        if (e.target.className.includes("filter-title-box")) {

            let targetName = e.target.children[1]

            if (targetName.name.includes('arrow-down')) {
                targetName.name = "arrow-up"
            } else {
                targetName.name = "arrow-down"
            }
        }

        // If click icon
        if (e.target.name?.includes('arrow-down')) {
            e.target.name = "arrow-up"
        } else {
            e.target.name = "arrow-down"
        }

        // if click title
        if (e.target.className === 'filter') {
            if (e.target.parentNode.children[1].name === "arrow-down") {
                e.target.parentNode.children[1].name = "arrow-up"
            } else {
                e.target.parentNode.children[1].name = "arrow-down"
            }
        }
    }

    return (
        <>
            {Object.keys(filterOptions)?.map((e, index) => (
                <div key={index} className="filter-item filter" onClick={(e) => hideUnhideBox(e)} >

                    <div className="filter-title-box flex--space-between filter" >
                        <p className='filter'>{e.toUpperCase()}</p>
                        <ion-icon name="arrow-down" class="filter arrow"></ion-icon>
                    </div>

                    <div className="filter hidden-box">
                        <FilterLists checkUncheck={checkUncheck} data={filterOptions[e]} filterBy={e} filterItems={filterItems} />
                    </div>
                </div>
            ))}
        </>
    )
}


// ************************************* //
// Another component
// For list items
const FilterLists = ({ checkUncheck, data, filterBy, filterItems }) => {
    const list = [...data]

    const checkItem = () => {
        if (filterBy in filterItems) {
            return filterItems[filterBy]
        }
    }

    return (
        <>
            {list?.map((element, index) => (
                <ul key={index} className="filter filter-lists" id={filterBy}>
                    <li className="filter filter-list-item">
                        <span id={element} className={checkItem() === element ? 'filter checked' : 'filter unchecked'} onClick={(element) => checkUncheck(element)}></span>
                        <p>{element}</p>
                    </li>
                </ul>
            ))}
        </>
    )
}
