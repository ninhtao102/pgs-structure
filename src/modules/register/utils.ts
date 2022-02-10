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
    if (!repeatPassword) {
        return 'passwordRequire'
    }

    if (password !== repeatPassword) {
        return 'matchPasswordInvalid'
    }

    return ''
}

// const validateField = (field: string, value: string) => {
//     if (value) return '';
//     let fieldRequire = '';
//     switch (field) {
//         case 'name':
//             fieldRequire = 'nameRequire'
//     }
// }

const validateName = (name: string) => {
    if (!name) {
        return 'nameRequire'
    }

    return ''
}

const validateGender = (gender: string) => {
    if (!gender) {
        return 'genderRequire'
    }

    return ''
}

const validateRegion = (region: string | number) => {
    if (!region) {
        return 'regionRequire'
    }

    return 0
}

const validateState = (state: string | number) => {
    if (!state) {
        return 'stateRequire'
    }

    return 0
}

export const validateRegister = (values: IRegisterParams): IRegisterValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
        name: validateName(values.name),
        gender: validateGender(values.gender),
        region: validateRegion(values.region),
        state: validateState(values.state)
    }
}

export const validRegister = (values: IRegisterValidation) => {
    return !values.email && !values.password && !values.repeatPassword && !values.name && !values.gender && !values.region && !values.state;
}