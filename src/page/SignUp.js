import React from 'react'
import firebase from '../congif/firebase';
import "firebase/auth";
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {

    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: ''
    //     },
    //     // validate: value => {
    //     //     const errors = {};
    //     //     if (!value.email) {
    //     //         errors.email = "Email field is Required.";
    //     //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
    //     //         errors.email = 'Email is Invalid ';
    //     //     }

    //     //     if (!value.password) {
    //     //         errors.password = "Password field is Required.";
    //     //     } else if (value.password.length <= 8) {
    //     //         errors.password = "Password must be longer than 8.";
    //     //     } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(value.password)) {
    //     //         errors.password = 'Is Not Strong Password';
    //     //     }

    //     //     return errors;
    //     // },
    //     validationSchema: Yup.object({
    //         email: Yup.string().required('Email field is Required').email(),
    //         password: Yup.string().required('Password field is Required.').min(8),
    //     }),
    //     onSubmit: value => {
    //         console.log(value);
    //     }
    // });
    const history = useHistory();

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().required('Email field is Required').email(),
                password: Yup.string().required('Password field is Required.').min(8),
            })}
            onSubmit={(value, formikBag) => {
                firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(
                    res => {
                        history.replace('/');

                    }).catch(e => {
                        formikBag.setFieldError('email', e.message);
                    });
            }}
        >
            {formik => (
                <div className='flex h-screen bg-gray-200'>
                    <div className='bg-white flex flex-wrap justify-center m-auto rounded-lg shadow-lg w-1/3'>
                        <Form className='m-5 w-10/12'>
                            <h1 className='w-full text-4xl tracking-widest text-center my-6'>Sign Up Here</h1>
                            <div className='w-full my-6'>
                                <Field name="email" type="email" className='border-b-2 border-dashed border-gray-300 py-1.5 text-black w-full' placeholder='Email or Username' />
                                <ErrorMessage name="email" />
                            </div>
                            <div className='w-full my-6'>
                                <Field name="password" type="password" className='border-b-2 border-dashed border-gray-300 py-1.5 text-black w-full' placeholder='password' />
                                <ErrorMessage name="password" />
                            </div>
                            <div className='w-full my-10'>
                                <button type='submit' className='bg-red-300 p-2 rounded shadow text-white w-full'>Sign Up
                                    {/* {isLoading ? (<i className='fas fa-circle-notch fa-spin '></i>) : ('Sign Up')} */}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik >
    )
}
