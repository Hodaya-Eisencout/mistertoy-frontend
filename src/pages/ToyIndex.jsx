
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/ToyList.jsx'

export function ToyIndex() {
    const [toys, setToys] = useState(null)

    useEffect(() => {
        loadToys()
    }, [])

    function loadToys() {
        toyService.query()
            .then(setToys)
            .catch(err => console.log('Cannot load toys', err))
    }

    if (!toys) return <div>Loading...</div>

    return (
        <section className="toy-index">
            <h2>Our Toys</h2>
            <ToyList toys={toys} />
        </section>
    )
}

