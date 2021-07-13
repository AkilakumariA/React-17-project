import React, { useState } from 'react'
import firebase from '../congif/firebase';
import "firebase/auth";
import { useHistory } from 'react-router-dom';

export default function Login() {
    const [isLoading, setisLoading] = useState(false);
    const [error, seterror] = useState('');
    const [form, setform] = useState({ email: "", password: "" });
    // const [isLoggedIn, setisLoggedIn] = useState(false);
    const history = useHistory();

    function handleForm(e) {
        if (isLoading) return;
        setisLoading(true);
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(form.email, form.password).then(res => {
            setisLoading(false);
            seterror('');
            history.replace('/');
            // setisLoggedIn(true)
        }).catch((error) => {
            setisLoading(false)
            seterror(error.message);
        });
    }
    function handleInput(e) {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    // if (isLoggedIn) return <Redirect to='/' />;

    return (
        <div className='flex h-screen bg-gray-200'>
            <div className='bg-white flex flex-wrap justify-center m-auto rounded-lg shadow-lg w-1/3'>
                <form className='m-5 w-10/12' onSubmit={handleForm}>
                    {error !== '' && <p>{error}</p>}
                    <h1 className='w-full text-4xl tracking-widest text-center my-6'>Login</h1>
                    <div className='w-full my-6'>
                        <input type='email' className='border-b-2 border-dashed border-gray-300 py-1.5 text-black w-full' placeholder='Email or Username' name='email' value={form.email} onChange={handleInput} />
                    </div>
                    <div className='w-full my-6'>
                        <input type='password' className='border-b-2 border-dashed border-gray-300 py-1.5 text-black w-full' placeholder='password' name='password' value={form.password} onChange={handleInput} />
                    </div>
                    <div className='w-full my-10'>
                        <button type='submit' className='bg-red-300 p-2 rounded shadow text-white w-full'>
                            {isLoading ? (<i className='fas fa-circle-notch fa-spin '></i>) : ('Login')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
