import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import firebase from '../congif/firebase';
import AppContext from '../store/AppContext';

export default function Header() {
    // const [isLoggedIn, setisLoggedIn] = useState(false);
    const [isLoggedIn] = useContext(AppContext);
    const history = useHistory();
    // console.log(user);


    function logout() {
        firebase.auth().signOut().then(res => {
            // setisLoggedIn(false);
            history.replace('/login');
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    return (
        <nav className='py-5 bg-gray-900 text-white flex justify-between'>
            <ul className='flex justify-between px-10'>
                <li className='mr-5'>
                    <NavLink to="/" exact className='hover:underline hover:text-blue-200' activeClassName='underline text-blue-200'>Home</NavLink>
                </li>
                <li className='mr-5'>
                    <NavLink to="/gallery" className='hover:underline hover:text-blue-200' activeClassName='underline text-blue-200'>Gallery</NavLink>
                </li>
                <li className='mr-5'>
                    <NavLink to="/tensorflow" className='hover:underline hover:text-blue-200' activeClassName='underline text-blue-200'>Tensorflow</NavLink>
                </li>
            </ul>
            <ul className='flex justify-between px-10'>
                <li>
                    {isLoggedIn ? (<button className='hover:underline hover:text-blue-200' onClick={logout}>Logout</button>) : (<NavLink to="/login" className='hover:underline hover:text-blue-200'>Login</NavLink>)}
                </li>
                {!isLoggedIn &&
                    <li className='ml-5'>
                        <NavLink to="/signup" className='hover:underline hover:text-blue-200'>Sign Up</NavLink>
                    </li>}
            </ul>
        </nav >
    )
}
