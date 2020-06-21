
const fs = require('fs');
const utils = require('./utils');

const config = require('./config');

class Inject {

    start = () => {
        const _this = this;
        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err) throw err;
            const sortArr = utils.getSortArr(data);
            const promiseList = config.list.map(utils.buildPromise);
            return Promise.all(promiseList)
                .then(result => {
                    sortArr.forEach(elemnt => {
                        const tempData = result.filter((item) => {
                            return item.name === elemnt.trim();
                        });
                        _this._injectContent(tempData[0].body);
                    });

                });
        });
    }

    _injectContent = (data) => {
        fs.appendFileSync('./main.js', data , (err) => {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports = Inject;

