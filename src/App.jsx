
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

import './App.css'

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <section className="app">
                    <header>
                        <h1>Mister Toy 🧸</h1>
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

