import React, { useState, useEffect } from 'react'
import logo from '../../../logo-420-x-108.png';
import { IRegisterParams } from '../../../models/auth';
import RegisterForm from '../components/RegisterForm'
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';

const RegisterPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState([]);

    const getLocation = React.useCallback(async () => {
        setLoading(true)

        const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'))

        setLoading(false)

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setLocations(json.data)
            return 
        }
    }, [dispatch])

    useEffect(() => {
    getLocation()
    }, [getLocation])

    const onRegister = React.useCallback(
        async (values: IRegisterParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(
                fetchThunk(
                    API_PATHS.signUp, 'post', {
                        email: values.email, 
                        password: values.password,
                        repeatPassword: values.repeatPassword,
                        name: values.name,
                        gender: values.gender,
                        region: values.region,
                        state: values.state
                    }
                ),
            );

            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                console.log(json.data)
                alert('Chúc mừng bạn đã đăng ký thành công')
                dispatch(replace(ROUTES.login));
                return;
            }

            setErrorMessage(getErrorMessageResponse(json));
    }, [dispatch]);

    const fetchState = React.useCallback(async ( pid: number ) => {
        if (pid) {
            const resp = await dispatch(fetchThunk(`${API_PATHS.getLocation}?pid=${pid}`,'get'))
            if (resp.code === RESPONSE_STATUS_SUCCESS) {
                console.log(resp)
                return resp.data
            }
            console.log(getErrorMessageResponse(resp))
            return resp
        }
    },
    [dispatch],
    )
    

    return (
        <div
        className='container'
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <img src={logo} alt="" style={{maxWidth: '250px', margin: '32px'}} />
            <RegisterForm onRegister={onRegister} loading={loading} errorMessage={errorMessage} locations={locations} city={fetchState} />
        </div>
    )
}

export default RegisterPage