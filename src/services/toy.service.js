
const STORAGE_KEY = 'toysDB'

export const toyService = {
    query,
    getById,
    getEmptyToy,
    getLabels,
}

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

_createToys()

function query() {
    const toys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    return Promise.resolve(toys)
}

function getById(toyId) {
    return query()
        .then(toys => toys.find(toy => toy._id === toyId))
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getLabels() {
    return labels
}

function _createToys() {
    if (localStorage.getItem(STORAGE_KEY)) return

    const toys = [
        {
            _id: 't101',
            name: 'Talking Doll',
            imgUrl: '',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: Date.now(),
            inStock: true,
        },
        {
            _id: 't102',
            name: 'Puzzle',
            imgUrl: '',
            price: 85,
            labels: ['Puzzle', 'Box game'],
            createdAt: Date.now(),
            inStock: true,
        },
        {
            _id: 't103',
            name: 'Toy Car',
            imgUrl: '',
            price: 59,
            labels: ['On wheels'],
            createdAt: Date.now(),
            inStock: false,
        },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
}
