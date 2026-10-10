
import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />

                    <Link to={`/toy/${toy._id}`}>
                        Details
                    </Link>

                    <button onClick={() => onEditToy(toy._id)}>
                        Edit
                    </button>

                    <button onClick={() => onRemoveToy(toy._id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}
