
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyEdit } from './ToyEdit.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

export function ToyIndex() {
    const [toys, setToys] = useState(null)
    const [filterBy, setFilterBy] = useState({
        name: '',
        inStock: 'all',
    })
    const [isEditing, setIsEditing] = useState(false)
    const [selectedToyId, setSelectedToyId] = useState(null)

    useEffect(() => {
        loadToys()
    }, [filterBy])

    function loadToys() {
        toyService.query(filterBy)
            .then(setToys)
            .catch(err => console.log('Cannot load toys', err))
    }

    function onRemoveToy(toyId) {
        if (!confirm('Are you sure you want to delete this toy?')) return

        toyService.remove(toyId)
            .then(() => loadToys())
            .catch(err => console.log('Cannot remove toy', err))
    }

    function onEditToy(toyId = null) {
        setSelectedToyId(toyId)
        setIsEditing(true)
    }

    function onSaveToy() {
        setIsEditing(false)
        setSelectedToyId(null)
        loadToys()
    }

    function onCancelEdit() {
        setIsEditing(false)
        setSelectedToyId(null)
    }

    if (!toys) return <div>Loading...</div>

    return (
        <section className="toy-index">
            <h2>Our Toys</h2>

            <ToyFilter onSetFilter={setFilterBy} />

            <button onClick={() => onEditToy()}>
                Add Toy
            </button>

            {isEditing && (
                <ToyEdit
                    toyId={selectedToyId}
                    onSaveToy={onSaveToy}
                    onCancel={onCancelEdit}
                />
            )}

            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
            />
        </section>
    )
}


