import React, { useState } from 'react'
import logo from '../../../logo-420-x-108.png';
import { IRegisterParams } from '../../../models/auth';
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegister = React.useCallback(
        async (values: IRegisterParams) => {
            console.log(values)
    }, []);

    return (
        <div
        className='container'
        style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <img src={logo} alt="" style={{maxWidth: '250px', margin: '32px'}} />
            <RegisterForm onRegister={onRegister} loading={loading} errorMessage={errorMessage} />
        </div>
    )
}

export default RegisterPage