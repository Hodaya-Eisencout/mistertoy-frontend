
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

    function handleLabelsChange({ target }) {
        const selectedLabels = Array.from(
            target.selectedOptions,
            option => option.value
        )

        setFilterBy(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels,
        }))
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

            <label htmlFor="labels">Labels:</label>

            <select
                id="labels"
                multiple
                size={4}
                value={filterBy.labels}
                onChange={handleLabelsChange}
            >
                {labels.map(label => (
                    <option key={label} value={label}>
                        {label}
                    </option>
                ))}
            </select>


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

