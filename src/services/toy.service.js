
const BASE_URL = 'http://localhost:3030/api/toy/'

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

function query(filterBy = {}) {
    const params = new URLSearchParams()

    if (filterBy.name) params.set('txt', filterBy.name)

    if (filterBy.inStock && filterBy.inStock !== 'all') {
        params.set('inStock', filterBy.inStock)
    }

    if (filterBy.labels?.length) {
        params.set('labels', filterBy.labels.join(','))
    }

    const queryString = params.toString()
    const url = BASE_URL + (queryString ? '?' + queryString : '')

    return fetch(url)
        .then(res => _handleResponse(res))
        .then(toys => {
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

            return toys
        })
}

function getById(toyId) {
    return fetch(BASE_URL + toyId)
        .then(res => _handleResponse(res))
}

function save(toy) {
    const method = toy._id ? 'PUT' : 'POST'

    return fetch(BASE_URL, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toy),
    }).then(res => _handleResponse(res))
}

function remove(toyId) {
    return fetch(BASE_URL + toyId, {
        method: 'DELETE',
    }).then(res => _handleResponse(res))
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

function _handleResponse(res) {
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }

    return res.json().catch(() => null)
}
