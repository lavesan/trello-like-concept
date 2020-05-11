export const objectToQueryString = (object: object) => {
    
    let queryString = '';
    const entries = Object.entries(object);
    entries.forEach(([key, value]) => {
        if (value) {
            queryString += `${queryString ? '&' : '?'}${key}=${value}`;
        }
    });
    return queryString;

}