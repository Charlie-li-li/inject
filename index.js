

const Inject = require('./inject');


const inject = new Inject;

inject.start();

// const getData = function (item) {
//     return new Promise(resolve => {
//         request(item.cdn, (err, res, body) => {
//             if (err) {
//                 throw err;
//             }
//             resolve({
//                 name: item.name,
//                 body:body
//             })
//         });
//     })
// }

// const getAllData = (sortArr) => {
//     const promiseArr = config.list.map(getData);
//     return Promise.all(promiseArr)
//         .then(result => {
//             sortArr.forEach(elemnt => {
//                 const tempData = result.filter((item) => {
//                     return item.name === elemnt.trim();
//                 });
//                 appendData(tempData[0].body);
//             });

//     });
// }

// fs.readFile('./index.html', 'utf8', (err, data) => {
//     if (err) throw err;
//     const sortArr = utils.getSortArr(data);
//     getAllData(sortArr);
// });

// const appendData = (data) => {

//     fs.appendFileSync('./main.js', data , (err) => {
//         if (err) {
//             throw err;
//         }
//         console.log('success');
//     });
// }

