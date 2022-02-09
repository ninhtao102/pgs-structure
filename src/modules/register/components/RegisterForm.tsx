import React from 'react'
import { FormattedMessage } from 'react-intl'
import { IRegisterParams, IRegisterValidation } from '../../../models/auth'
import { validateRegister, validRegister } from '../utils';

interface Props {
    onRegister(values: IRegisterParams): void;
    loading:boolean;
    errorMessage: string;
}

const RegisterForm = (props: Props) => {
    const { onRegister, loading, errorMessage } = props

    const [formValues, setFormValues] = React.useState<IRegisterParams>({ email: '', password: '', repeatPassword: '', name: '', gender: '', region: 1, state: 1 })
    const [validate, setValidate] = React.useState<IRegisterValidation>()

    const onSubmit = React.useCallback(() => {
        const validate = validateRegister(formValues)
    
        setValidate(validate)
    
        if (!validRegister(validate)) {
            return;
        }
    
        onRegister(formValues);
    }, [formValues, onRegister]);

    return (
    <form
        style={{
            maxWidth: '560px',
            width: '100%'
        }}
        noValidate
        className="row g-3 needs-validation"
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}
    >
        <div className="col-md-12">
            <label htmlFor='inputName' className='form-label'>
                <FormattedMessage id='name'/>
            </label>
            <input 
                type="text" 
                className="form-control" 
                id="inputName"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value})}
            />
            {
                !!validate?.name && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.name}/>
                    </small>
                )
            }
        </div>

        <div className="col-md-12">
            <label htmlFor='inputGender' className='form-label'>
                <FormattedMessage id='gender'/>
            </label>
            <div className="radio-group">
                <div className="form-check form-check-inline">
                    <input 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="male" 
                    value="male"
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value})}
                    />
                    <label className="form-check-label" htmlFor="male">
                        <FormattedMessage id='male'/>
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="female" 
                    value="female"
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value})}
                    />
                    <label className="form-check-label" htmlFor="female">
                        <FormattedMessage id='female'/>
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="otherGender" 
                    value="otherGender"
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value})}
                    />
                    <label className="form-check-label" htmlFor="otherGender">
                        <FormattedMessage id='otherGender'/>
                    </label>
                </div>
            </div>
                {
                    !!validate?.gender && (
                        <small className="text-danger">
                            <FormattedMessage id={validate?.gender}/>
                        </small>
                    )
                }
        </div>

        <div className="col-md-12">
            <label htmlFor='inputCity' className='form-label'>
                <FormattedMessage id='city'/>
            </label>
            <select className="form-select" aria-label="Default select example" onChange={(e) => setFormValues({ ...formValues, region: +e.target.value, state: +e.target.value})}>
                <option selected>Select City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            {
                !!validate?.region && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.region}/>
                    </small>
                )
            }
        </div>

        <div className="col-md-12">
            <label htmlFor='inputEmail' className='form-label'>
                <FormattedMessage id='email'/>
            </label>
            <input 
                type="text" 
                className="form-control" 
                id="inputEmail"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value})}
            />
            {
                !!validate?.email && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.email}/>
                    </small>
                )
            }
        </div>

        <div className="col-md-12">
            <label htmlFor='inputPassword' className='form-label'>
                <FormattedMessage id='password'/>
            </label>
            <input 
                type="password" 
                className="form-control" 
                id="inputPassword"
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value})}
            />
            {
                !!validate?.password && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.password}/>
                    </small>
                )
            }
        </div>

        <div className="col-md-12">
            <label htmlFor='inputRepeatPassword' className='form-label'>
                <FormattedMessage id='repeatPassword'/>
            </label>
            <input 
                type="password" 
                className="form-control" 
                id="inputRepeatPassword"
                value={formValues.repeatPassword}
                onChange={(e) => setFormValues({ ...formValues, repeatPassword: e.target.value})}
            />
            {
                !!validate?.repeatPassword && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.repeatPassword}/>
                    </small>
                )
            }
        </div>

        <div className="row justify-content-md-center" style={{margin: '16px 0'}}>
            <div className="col-md-auto">
                <button 
                type="submit" 
                className="btn btn-primary" 
                style={{minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                disabled={loading}
                >
                    {
                        loading && <div className="spinner-border spinner-border-sm text-align mr-2" role="status"/>
                    }
                    <FormattedMessage id="signUp"/>
                </button>
            </div>
        </div>
    </form>
)}

export default RegisterForm