import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import logOut from '../store/actions/auth/logOut';
import '../stylesheet/Navbar.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFilteredProducts } from '../store/reducers/productsSlice';


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const redirect = useNavigate()
    const data = useSelector(state => state.ads.ads)
    const dispatch = useDispatch()

    useEffect(() => {
        const filteredData = data.filter((val) => {
            if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
            }
        })
        dispatch(addFilteredProducts(filteredData))
    }, [searchTerm])

    const searchFunc = (e) => {
        e.preventDefault()

        if (window.location.href !== '/') {
            redirect('/products')
        }

        setSearchTerm(e.target.value)
    }

    // MOBILE NAVIGATION 
    const openCloseSearchInput = () => {
        const header = document.querySelector('.app-header')
        header.className.includes('search-open') ? header.className = 'app-header' : header.className += ' search-open';
    }

    const openCloseNavigation = () => {
        const header = document.querySelector('.app-header')
        header.className.includes('nav-open') ? header.className = 'app-header' : header.className += ' nav-open';
    }

    const openCloseFilter = () => {
        redirect('/products')

        setTimeout(() => {

            // for navbar
            const header = document.querySelector('.app-header')
            header.className.includes('filter-open') ? header.className = 'app-header' : header.className += ' filter-open';

            // to show filter section
            const filter = document.querySelector('.container')
            filter.className.includes('filter-open') ? filter.className = 'container' : filter.className += ' filter-open';
        }, 350)
    }


    return (
        <header className='app-header'>
            <nav className='main-nav'>
                <ul className='main-nav-list'>
                    <Navigation openCloseNavigation={openCloseNavigation} />
                </ul>
            </nav>

            <button className='btn-mobile-nav'>
                <ion-icon class="icon-mobile-nav open-menu" name="menu-outline" onClick={() => openCloseNavigation()}></ion-icon>
                <ion-icon class="icon-mobile-nav close-menu" name="close-outline" onClick={() => openCloseNavigation()}></ion-icon>
            </button>

            <form className='main-nav-form' onChange={(e) => searchFunc(e)}>
                <input className='search-input' type='text' name='searchbar' placeholder="Search..."></input>
            </form>

            <div className='search-filter-btns'>
                <button className='btn-mobile-nav'>
                    <ion-icon onClick={() => openCloseSearchInput()} class="icon-mobile-nav search-icon" name="search-outline"></ion-icon>
                    <ion-icon class="icon-mobile-nav close-search-input" name="close-outline" onClick={() => openCloseSearchInput()}></ion-icon>
                </button>

                <button className='btn-mobile-nav'>
                    <ion-icon class="icon-mobile-nav open-filter" name="filter-circle-outline" onClick={(e) => openCloseFilter(e)}></ion-icon>
                    <ion-icon class="icon-mobile-nav close-filter-menu" name="close-outline" onClick={() => openCloseFilter()}></ion-icon>
                </button>
            </div>
        </header>
    );
}

export default Navbar


// navigation links
const Navigation = ({ openCloseNavigation }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const logoutHandler = (e) => {
        e.preventDefault()

        dispatch(logOut())
    }

    if (isAuthenticated) {
        return (
            <>
                <li onClick={() => openCloseNavigation()}><Link to='/' className='main-nav-link'>Home</Link></li>
                <li onClick={() => openCloseNavigation()}><Link to='/favorites' className='main-nav-link'>Favorites</Link></li>
                <li onClick={() => openCloseNavigation()}><Link to='/cart' className='main-nav-link'>Cart</Link></li>
                <li onClick={() => openCloseNavigation()}><a href='/' className='main-nav-link' onClick={logoutHandler}>Logout</a></li>
            </>
        )
    }

    return (<>
        <li onClick={() => openCloseNavigation()}><Link to='/' className='main-nav-link'>Home</Link></li>
        <li onClick={() => openCloseNavigation()}><Link to='/signin' className='main-nav-link'>SignIn</Link></li>
        <li onClick={() => openCloseNavigation()}><Link to='/signup' className='main-nav-link'>SignUp</Link></li>
        <li onClick={() => openCloseNavigation()}><Link to='/cart' className='main-nav-link'>Cart</Link></li>
    </>)
}
