
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({
        name: '',
        inStock: 'all',
        labels: [],
        sortBy: 'name',
    })

    const labels = toyService.getLabels()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSetFilter(filterBy)
        }, 400)

        return () => clearTimeout(timeoutId)
    }, [filterBy, onSetFilter])

    function handleChange({ target }) {
        const { name, value } = target

        setFilterBy(prevFilter => ({
            ...prevFilter,
            [name]: value,
        }))
    }

    function handleLabelChange(label) {
        setFilterBy(prevFilter => {
            const updatedLabels = prevFilter.labels.includes(label)
                ? prevFilter.labels.filter(item => item !== label)
                : [...prevFilter.labels, label]

            return {
                ...prevFilter,
                labels: updatedLabels,
            }
        })
    }

    return (
        <section className="toy-filter">
            <h3>Filter Toys</h3>

            <label htmlFor="name">Name:</label>
            <input
                id="name"
                name="name"
                value={filterBy.name}
                onChange={handleChange}
                placeholder="Search toys..."
            />

            <label htmlFor="inStock">Stock:</label>
            <select
                id="inStock"
                name="inStock"
                value={filterBy.inStock}
                onChange={handleChange}
            >
                <option value="all">All</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
            </select>

            <fieldset className="labels-filter">
                <legend>Labels:</legend>

                {labels.map(label => (
                    <label key={label}>
                        <input
                            type="checkbox"
                            checked={filterBy.labels.includes(label)}
                            onChange={() => handleLabelChange(label)}
                        />
                        {label}
                    </label>
                ))}
            </fieldset>

            <label htmlFor="sortBy">Sort By:</label>
            <select
                id="sortBy"
                name="sortBy"
                value={filterBy.sortBy}
                onChange={handleChange}
            >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>
        </section>
    )
}

