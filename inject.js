
const fs = require('fs');
const utils = require('./utils');
const config = require('./config');
var UglifyJS = require("uglify-js");

class Inject {

    start = () => {
        const { output, list } = config;
        const { jsPath, htmlPath } = output;
        fs.readFile(htmlPath, 'utf8', (err, data) => {
            if (err) throw err;
            const sortArr = utils.getSortArr(data);
            const promiseList = list.map(utils.buildPromise);
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
                    utils.injectScript(data, htmlPath);
                });
        });
    }

}

module.exports = Inject;


