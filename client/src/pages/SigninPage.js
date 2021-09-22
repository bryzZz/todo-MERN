import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

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
        return <h1>Loading</h1>
    }

    return (
        <div className="mx-auto mt-5" style={{maxWidth: '400px'}}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className="text-center">
                <h3>Sign in</h3>
            </div>

            <div className="form-group mb-3">
                <label>Email</label>
                <input
                    name="email"
                    type="text"
                    {...register('email')}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
    
            <div className="form-group mb-4">
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <button type="submit" className="btn btn-primary form-control mb-4">Sign in</button>

            <div className="text-center">
                <p>Not a member? <NavLink to="/signup">Sign up</NavLink></p>
            </div>
          </form>
        </div>
    );
}
