export class Crypto{
    constructor(){}

    static encryptData(data)
    {
        try {
            const encryptData = btoa(JSON.stringify(data));
            return encryptData;
        } catch (error) {
            return data;
        }
    }
    static decryptData(data)
    {
        try {
            return JSON.parse(atob(data));
        } catch (error) {
            return data;
        }
    }
}