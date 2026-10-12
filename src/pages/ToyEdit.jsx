
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { useUnsavedChanges } from '../hooks/useUnsavedChanges.js'

export function ToyEdit({ toyId, onSaveToy, onCancel }) {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const [isDirty, setIsDirty] = useState(false)

    const labels = toyService.getLabels()

    useUnsavedChanges(isDirty)

    useEffect(() => {
        setIsDirty(false)

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

        setIsDirty(true)

        setToy(prevToy => ({
            ...prevToy,
            [name]: type === 'checkbox'
                ? checked
                : type === 'number' ? +value : value,
        }))
    }

    function handleLabelChange(label) {
        setIsDirty(true)

        setToy(prevToy => {
            const labels = prevToy.labels.includes(label)
                ? prevToy.labels.filter(item => item !== label)
                : [...prevToy.labels, label]

            return { ...prevToy, labels }
        })
    }

    function onSubmit(ev) {
        ev.preventDefault()

        toyService.save(toy)
            .then(savedToy => {
                setIsDirty(false)
                onSaveToy(savedToy)
            })
            .catch(err => console.log('Cannot save toy', err))
    }

    function handleCancel() {
        if (isDirty && !window.confirm(
            'You have unsaved changes. Are you sure you want to leave?'
        )) {
            return
        }

        onCancel()
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

                <fieldset>
                    <legend>Labels</legend>

                    {labels.map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                checked={toy.labels.includes(label)}
                                onChange={() => handleLabelChange(label)}
                            />
                            {label}
                        </label>
                    ))}
                </fieldset>

                <button type="submit">Save</button>

                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </section>
    )
}

