
import { useEffect, useRef, useState } from 'react'
import '../assets/css/cmps/Chat.css'

export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')
    const timeoutsRef = useRef([])

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout)
        }
    }, [])

    function onSendMsg(ev) {
        ev.preventDefault()

        const msgTxt = txt.trim()
        if (!msgTxt) return

        const newMsg = {
            id: Date.now() + Math.random(),
            txt: msgTxt,
            by: 'You',
        }

        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        setTxt('')

        const timeoutId = setTimeout(() => {
            const reply = {
                id: Date.now() + Math.random(),
                txt: `Thanks for your message: ${msgTxt}`,
                by: 'Mister Toy',
            }

            setMsgs(prevMsgs => [...prevMsgs, reply])
        }, 1000)

        timeoutsRef.current.push(timeoutId)
    }

    return (
        <section className="chat">
            <h3>Chat with Mister Toy</h3>

            <ul className="chat-msgs">
                {msgs.map(msg => (
                    <li key={msg.id}>
                        <strong>{msg.by}: </strong>
                        {msg.txt}
                    </li>
                ))}
            </ul>

            <form onSubmit={onSendMsg}>
                <input
                    type="text"
                    value={txt}
                    onChange={ev => setTxt(ev.target.value)}
                    placeholder="Write a message..."
                />

                <button type="submit">Send</button>
            </form>
        </section>
    )
}

