const fixPayload = (payload) => {
    return new Promise((resolve, reject) => {
        Object.entries(payload).forEach(([key,value]) => {
            if(value===''){
                reject(new Error(`${key} is NULL`));
            }
            value.trim();
        })    
        resolve(payload);
    })
}

module.exports = {
    fixPayload,
}