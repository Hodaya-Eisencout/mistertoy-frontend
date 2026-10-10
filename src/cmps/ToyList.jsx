
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys }) {
    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                </li>
            ))}
        </ul>
    )
}
