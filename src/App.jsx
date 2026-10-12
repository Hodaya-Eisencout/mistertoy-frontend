
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { useOnlineStatus } from './hooks/useOnlineStatus.js'

import './App.css'

export default function App() {
    const isOnline = useOnlineStatus()

    return (
        <Provider store={store}>
            <BrowserRouter>
                <section className="app">
                    <header>
                        <h1>Mister Toy 🧸</h1>

                        <p>
                            Status: {isOnline ? '🟢 Online' : '🔴 Offline'}
                        </p>

                        <nav>
                            <Link to="/toy">Toys</Link>
                        </nav>
                    </header>

                    <main>
                        <Routes>
                            <Route path="/" element={<ToyIndex />} />
                            <Route path="/toy" element={<ToyIndex />} />
                            <Route path="/toy/:toyId" element={<ToyDetails />} />
                        </Routes>
                    </main>
                </section>
            </BrowserRouter>
        </Provider>
    )
}

