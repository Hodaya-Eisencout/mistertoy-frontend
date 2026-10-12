
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { NicePopup } from '../cmps/NicePopup.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => console.log('Cannot load toy', err))
    }, [toyId])

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>

            <p>Price: ${toy.price}</p>
            <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
            <p>Labels: {toy.labels.join(', ')}</p>

            <button onClick={() => setIsChatOpen(true)}>
                💬 Chat
            </button>

            <p>
                <Link to="/toy">Back to Toys</Link>
            </p>

            {isChatOpen && (
                <NicePopup
                    heading="Chat with Mister Toy"
                    footing="Mister Toy Customer Service"
                    onClose={() => setIsChatOpen(false)}
                >
                    <Chat />
                </NicePopup>
            )}
        </section>
    )
}

