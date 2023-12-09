export default class Validator{

    static isName(value: string) : boolean {
        const nameRegex = new RegExp ("^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,}$")
        if(value.length > 50) return false
        return nameRegex.test(value.trim())
    }

    static isAddress(value: string) : boolean {
        const addressRegex = new RegExp ("^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$")
        if(value.length > 100) return false
        return addressRegex.test(value.trim())
    }


    static isEmail(value: string) : boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(value.length > 60) return false
        return emailRegex.test(value.trim())
    }

    static isPassword(value: string) : boolean {
        const passwordRegex = /^[a-zA-Z0-9*.!@#$%^&(){}:;,._]{6,}$/
        if(value.length > 30) return false
        return passwordRegex.test(value.trim())
    }

    static isDate(value: string) : boolean {
        const USFormatRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
        const FRFormatRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
        return USFormatRegex.test(value.trim()) || FRFormatRegex.test(value.trim())
    }

    static isNumber(value: string) : boolean {
        const numberRegex = /^[0-9]+$/
        return numberRegex.test(value.trim())
    }
}