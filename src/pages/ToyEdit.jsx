
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'

export function ToyEdit({ toyId, onSaveToy, onCancel }) {
    const [toy, setToy] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (!toyId) {
            setToy(toyService.getEmptyToy())
            return
        }

        toyService.getById(toyId)
            .then(toy => {
                if (toy) setToy(toy)
            })
            .catch(err => console.log('Cannot load toy', err))
    }, [toyId])

    function handleChange({ target }) {
        const { name, value, type, checked } = target

        setToy(prevToy => ({
            ...prevToy,
            [name]: type === 'checkbox'
                ? checked
                : type === 'number' ? +value : value,
        }))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        toyService.save(toy)
            .then(savedToy => onSaveToy(savedToy))
            .catch(err => console.log('Cannot save toy', err))
    }

    return (
        <section className="toy-edit">
            <h2>{toyId ? 'Edit Toy' : 'Add Toy'}</h2>

            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    value={toy.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={toy.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="imgUrl">Image URL:</label>
                <input
                    id="imgUrl"
                    name="imgUrl"
                    value={toy.imgUrl}
                    onChange={handleChange}
                />

                <label>
                    <input
                        name="inStock"
                        type="checkbox"
                        checked={toy.inStock}
                        onChange={handleChange}
                    />
                    In Stock
                </label>

                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </section>
    )
}
