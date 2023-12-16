
export function stringToArray(inputString: string) {
    return inputString.split('|').map(Number);
}

export function writeToLocalStorage(key: string, dataObject: Object) {
    const jsonString = JSON.stringify(dataObject);
    localStorage.setItem(key, jsonString);
}

export function readFromLocalStorage(key: string) {
    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : null;
}

export function arrayToString(inputArray: Array<Number>) {
    return inputArray.join('|');
}

export function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}