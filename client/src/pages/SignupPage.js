import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHttp } from '../hooks/http.hook';

const schema = yup.object().shape({
    email: yup.string().email("Email should have correct format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SigninPage() {
    const history = useHistory();
    const { request } = useHttp();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await request('/api/auth/register', 'POST', {...data});
            history.push('/signin');
        } catch (error) {}
    }

    return (
        <div className="mx-auto mt-5" style={{maxWidth: '400px'}}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="text-center">
                <h3>Sign up</h3>
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

            <button type="submit" className="btn btn-primary form-control mb-4">Sign up</button>

            <div className="text-center">
                <p>Already registered? <NavLink to="/signin">Sign in</NavLink></p>
            </div>
          </form>
        </div>
    );
}
