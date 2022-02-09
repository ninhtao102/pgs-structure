import { validEmailRegex } from "../../utils"
import { IRegisterParams, IRegisterValidation } from "./../../models/auth"

const validateEmail = (email: string) => {
    if (!email ) {
        return 'emailRequire'
    }

    if (!validEmailRegex.test(email)) {
        return 'emailInvalid'
    }

    return ''
}

const validatePassword = (password: string) => {
    if (!password) {
        return 'passwordRequire'
    }

    if (password.length < 4) {
        return 'minPasswordInvalid'
    }

    return ''
}

const validateRepeatPassword = (password: string, repeatPassword: string) => {
    if (!password) {
        return 'passwordRequire'
    }

    if (password.length < 4) {
        return 'minPasswordInvalid'
    }

    if (password !== repeatPassword) {
        return 'notMatchPassword'
    }

    return ''
}

const validEmptyField = (name: string) => {
    if (!name) {
        return 'fillRequire'
    }

    return ''
}

const validCityField = (region: string | number) => {
    if (!region) {
        return 'selectRequire'
    }

    return 0
}

export const validateRegister = (values: IRegisterParams): IRegisterValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
        name: validEmptyField(values.name),
        gender: validEmptyField(values.gender),
        region: validCityField(values.region),
        state: validCityField(values.state)
    }
}

export const validRegister = (values: IRegisterValidation) => {
    return !values.email && !values.password && !values.repeatPassword && !values.name && !values.gender && !values.region && !values.state;
}