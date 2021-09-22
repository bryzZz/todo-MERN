import React, { forwardRef } from 'react';

// export const Input = forwardRef((props, ref) => {
//     return (
//         <div className="form-group mb-3">
//             <label>{props.label}</label>
//             <input
//                 name={props.name}
//                 type={props.type}
//                 {...props.register}
//                 className={`form-control ${props?.error ? 'is-invalid' : ''}`}
//             />
//             <div className="invalid-feedback">{props?.helperText?.errors.email?.message}</div>
//         </div>
//     )
// });

// import React from 'react';

export default function Input(props) {
    return (
        <div className="form-group mb-3">
            <label>{props.label}</label>
            <input
                name={props.name}
                type={props.type}
                {...props.register}
                className={`form-control ${props?.error ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{props?.helperText?.errors.email?.message}</div>
        </div>
    )
}
                // <Input
                //         {...register('email')}
                //         id='email'
                //         type='email'
                //         label='Email *'
                //         autoFocus
                //         error={!!errors.email}
                //         helperText={errors.email?.message}
                //     />