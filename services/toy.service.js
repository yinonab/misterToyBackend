import fs from 'fs'
import { utilService } from './util.service.js'

const toys = utilService.readJsonFile('data/toy.json')





export const toyService = {
    query,
    get,
    save,
    remove,
   

}




function query(filterBy = {}) {
    console.log('hi');

        let toyToDisplay = toys
        console.log('toyToDisplay txt', toyToDisplay)

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toyToDisplay = toyToDisplay.filter(toy => regExp.test(toy.name))
            console.log('toyToDisplay txt', toyToDisplay)
        }
        if (filterBy.inStock !== undefined) {
            if (filterBy.inStock === true) {
                toyToDisplay = toyToDisplay.filter(toy => toy.inStock === true)
            } else if (filterBy.inStock === false) {
                toyToDisplay = toyToDisplay.filter(toy => toy.inStock === false)
            }
        }
        if (filterBy.labels && filterBy.labels.length > 0) {
            toyToDisplay = toyToDisplay.filter(toy => {
                return toy.labels.some(label => filterBy.labels.includes(label));
            });
        }
        
        
        return Promise.resolve (toyToDisplay)
    }



function get(toyId) {
    const toy = toys.find(toy=>toy.id===toyId);
    if(!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}



function remove(toyId) {
    const idx =toys.findIndex(toy=>toy.id===toyId);
    if (idx !== -1) return Promise.reject('no such toy')
    const toy=toy[idx]
    // return Promise.reject('Not now!')
    return _saveCarsToFile()
}




function save(toy) {
    if (toy._id) {
        const toyToUpdate=toys.find(currToy=>currToy._id===toy._id)
        toyToUpdate.name =toy.price
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy._id=makeId()
       toys.push(toy)
    }
}




// function getDefaultFilter() {
//     return { txt: '', labels: [], inStock: undefined, pageIdx: 0 };
// }




function _saveCarsToFile() {
    return new Promise((resolve, reject) => {

        const carsStr = JSON.stringify(cars, null, 4)
        fs.writeFile('data/car.json', carsStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


