
import { useEffect } from 'react'
import '../assets/css/cmps/NicePopup.css'

export function NicePopup({
    heading,
    footing,
    onClose,
    children,
}) {
    useEffect(() => {
        function handleKeyDown(ev) {
            if (ev.key === 'Escape') {
                onClose()
            }
        }

        document.body.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    return (
        <div className="popup-overlay">
            <section className="nice-popup">
                <header>
                    <h2>{heading}</h2>
                    <button onClick={onClose}>✕</button>
                </header>

                <main>
                    {children}
                </main>

                <footer>
                    {footing}
                </footer>
            </section>
        </div>
    )
}
