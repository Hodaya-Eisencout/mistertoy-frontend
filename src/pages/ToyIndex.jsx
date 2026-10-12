
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import {
    SET_TOYS,
    REMOVE_TOY,
    ADD_TOY,
    UPDATE_TOY,
} from '../store/toy.reducer.js'

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyEdit } from './ToyEdit.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import '../assets/css/pages/ToyIndex.css'

export function ToyIndex() {
    const toys = useSelector(state => state.toys)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
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
            .then(toys => {
                dispatch({ type: SET_TOYS, toys })
            })
            .catch(err => console.log('Cannot load toys', err))
            .finally(() => setIsLoading(false))
    }

    function onRemoveToy(toyId) {
        if (!confirm('Are you sure you want to delete this toy?')) return

        toyService.remove(toyId)
            .then(() => {
                dispatch({ type: REMOVE_TOY, toyId })
            })
            .catch(err => console.log('Cannot remove toy', err))
    }

    function onEditToy(toyId = null) {
        setSelectedToyId(toyId)
        setIsEditing(true)
    }

    function onSaveToy(savedToy) {
        if (selectedToyId) {
            dispatch({ type: UPDATE_TOY, toy: savedToy })
        } else {
            dispatch({ type: ADD_TOY, toy: savedToy })
        }

        setIsEditing(false)
        setSelectedToyId(null)
    }

    function onCancelEdit() {
        setIsEditing(false)
        setSelectedToyId(null)
    }

    if (isLoading && !toys.length) {
        return <div>Loading...</div>
    }

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


