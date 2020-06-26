
const fs = require('fs');
const utils = require('./utils');
const config = require('./config');
var UglifyJS = require("uglify-js");

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
                        const uglifyData = UglifyJS.minify(tempData[0] && tempData[0].body);
                        const { error, code } = uglifyData;
                        if (error) throw err;
                        utils.injectContent(code);
                    });

                });
        });
    }

}

module.exports = Inject;


