export default class Validator{

    /**
     * Test if a string could be a name.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isName(value: string) : boolean {
        const nameRegex = new RegExp ("^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,}$")
        if(value.length > 50) return false
        return nameRegex.test(value.trim())
    }

    /**
     * Test if a string could be an address.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isAddress(value: string) : boolean {
        const addressRegex = new RegExp ("^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$")
        if(value.length > 100) return false
        return addressRegex.test(value.trim())
    }

    /**
     * Test if a string could be an email.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isEmail(value: string) : boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(value.length > 60) return false
        return emailRegex.test(value.trim())
    }

    /**
     * Test if a string could be a valid password.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isPassword(value: string) : boolean {
        const passwordRegex = /^[a-zA-Z0-9*.!@#$%^&(){}:;,._]{6,}$/
        if(value.length > 30) return false
        return passwordRegex.test(value.trim())
    }

    /**
     * Test if a string could be a date.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isDate(value: string) : boolean {
        const USFormatRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
        const FRFormatRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
        return USFormatRegex.test(value.trim()) || FRFormatRegex.test(value.trim())
    }

    /**
     * Test if a string could be a number.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isNumber(value: string) : boolean {
        const numberRegex = /^[0-9]+$/
        return numberRegex.test(value.trim())
    }

    /**
     * Test if a string could be a past date.
     * @param {string} value - Value to test.
     * @return {boolean} 
     */
    static isDatePast(date: string) : boolean{
        if(!Validator.isDate(date)) return false
        console.log(new Date(date) < new Date())
        return new Date(date) < new Date()
    }
}