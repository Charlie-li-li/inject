const request = require('request');

const getSortArr = (content) => {
    let sortString = content.match(/<!--[^)]+-->/g)[0];
    sortString = sortString.match(/\w[^)]+\n/g)[0];
    return sortString.split('\n').filter(item => item)
}

const buildPromise = function (item) {
    return new Promise(resolve => {
        request(item.cdn, (err, res, body) => {
            if (err) {
                throw err;
            }
            resolve({
                name: item.name,
                body: body
            })
        });
    })
}

module.exports = {
    getSortArr,
    buildPromise
}
