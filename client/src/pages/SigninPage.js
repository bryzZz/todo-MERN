import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import MainLoader from '../components/MainLoader/MainLoader';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import '../css/forms.css';

const schema = yup.object().shape({
    email: yup.string().email("Email should have correct format").required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
});

export default function SigninPage() {
    const auth = useContext(AuthContext);
    const { request, loading } = useHttp();
    const { register, handleSubmit, setError, formState:{ errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const addServerErrors = (errors, setError) => {
        return Object.keys(errors).forEach((key) => {
            setError(key, {
                type: "server",
                message: errors[key].join(". "),
            });
        });
    }

    const onSubmit = async (data) => {
        try {
            const fetchedData = await request('/api/auth/login', 'POST', {...data});
            if (!fetchedData.success && fetchedData.errors) {
                addServerErrors(fetchedData.errors, setError);
            }else{
                auth.login(fetchedData.token, fetchedData.userId);
            }
        } catch (error) {}
    }

    if(loading){
        return <MainLoader />
    }

    return (
        <div className="mx-auto mt-5 custom-from">
            <div className="form-title">
                <h4>Sign in</h4>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInput 
                    name="email"
                    type="email"
                    label="Email"
                    register={ register }
                    error={ errors.email }
                />

                <FormInput 
                    name="password"
                    type="password"
                    label="Password"
                    register={ register }
                    error={ errors.password }
                />

                <FormButton type="submit">Sign in</FormButton>
            </Form>
            <p className="form-subtitle">
                Not a member? <NavLink to="/signup">Sign up</NavLink>
            </p>
        </div>
    );
}
