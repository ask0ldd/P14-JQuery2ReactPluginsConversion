export default class Validator{

    static testName(value: string) : boolean {
        const nameRegex = new RegExp ("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$")
        return nameRegex.test(value.trim())
    }

    static testEmail(value: string) : boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(value.trim())
    }

    static testPassword(value: string) : boolean {
        const passwordRegex = /^[a-zA-Z0-9*.!@#$%^&(){}:;,._]{6,}$/
        return passwordRegex.test(value.trim())
    }

    static testDate(value: string) : boolean {
        const USFormatRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
        const FRFormatRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
        return USFormatRegex.test(value.trim()) || FRFormatRegex.test(value.trim())
    }
}