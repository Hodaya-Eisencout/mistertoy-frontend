import '../assets/css/cmps/ToyPreview.css'

export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h3>{toy.name}</h3>
            <p>Price: ₪{toy.price}</p>
            <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
        </article>
    )
}
