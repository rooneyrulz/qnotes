import { useState } from "react"

const usePersistGoogle = () => {
    const [loading, setLoading] = useState(false);
    return [loading, setLoading]
}
export default usePersistGoogle