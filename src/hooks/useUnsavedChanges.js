
import { useEffect } from 'react'

export function useUnsavedChanges(isDirty) {
    useEffect(() => {
        if (!isDirty) return

        function handleBeforeUnload(ev) {
            ev.preventDefault()
            ev.returnValue = ''
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isDirty])
}
