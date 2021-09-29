import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHttp } from '../hooks/http.hook';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import '../css/forms.css';

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
        <div className="mx-auto mt-5 custom-from">
            <div className="form-title">
                <h4>Sign up</h4>
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

                <FormButton type="submit">Sign up</FormButton>
            </Form>
            <p className="form-subtitle">
                Already registered? <NavLink to="/signin">Sign in</NavLink>
            </p>
        </div>
    );
}
