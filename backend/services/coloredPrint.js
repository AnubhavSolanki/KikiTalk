const printSuccess = (message) => {
    console.log('\x1b[32m', message);
}

const printError = (message) => {
    console.log('\x1b[31m', message);
}

const printInfo = (message) => {
    console.log('\x1b[33m', message);
}

module.exports = {
    printSuccess,
    printError,
    printInfo
}