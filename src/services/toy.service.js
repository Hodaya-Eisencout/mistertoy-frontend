
const STORAGE_KEY = 'toysDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
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



function query(filterBy = {}) {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

    if (filterBy.name) {
        const name = filterBy.name.toLowerCase()
        toys = toys.filter(toy =>
            toy.name.toLowerCase().includes(name)
        )
    }

    if (filterBy.inStock && filterBy.inStock !== 'all') {
        const isInStock = filterBy.inStock === 'true'
        toys = toys.filter(toy => toy.inStock === isInStock)
    }

    if (filterBy.labels?.length) {
        toys = toys.filter(toy =>
            filterBy.labels.every(label => toy.labels.includes(label))
        )
    }

    if (filterBy.sortBy) {
        toys.sort((toy1, toy2) => {
            if (filterBy.sortBy === 'name') {
                return toy1.name.localeCompare(toy2.name)
            }

            if (filterBy.sortBy === 'price') {
                return toy1.price - toy2.price
            }

            if (filterBy.sortBy === 'createdAt') {
                return toy1.createdAt - toy2.createdAt
            }

            return 0
        })
    }

    return Promise.resolve(toys)
}

function getById(toyId) {
    return query()
        .then(toys => toys.find(toy => toy._id === toyId))
}

function save(toy) {
    return query()
        .then(toys => {
            const toyToSave = { ...toy }

            if (toyToSave._id) {
                const idx = toys.findIndex(currToy => currToy._id === toyToSave._id)
                if (idx === -1) throw new Error('Toy not found')
                toys[idx] = toyToSave
            } else {
                toyToSave._id = 't' + Date.now()
                toyToSave.createdAt = Date.now()
                toys.push(toyToSave)
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
            return toyToSave
        })
}

function remove(toyId) {
    return query()
        .then(toys => {
            const idx = toys.findIndex(toy => toy._id === toyId)
            if (idx === -1) throw new Error('Toy not found')

            toys.splice(idx, 1)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
        })
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
