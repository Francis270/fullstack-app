import React, { useEffect, useState } from 'react'

import Loading from '../features/loading/Loading'
import Logout from '../features/auth/Logout'

type HomeProps = {
}

const Home = (props: HomeProps) => {
    const [loadingIcon, setLoadingIcon] = useState(false)

    useEffect(() => {
        const init = async (ms = 500) => {
            setLoadingIcon(true)
            await new Promise(resolve => setTimeout(resolve, ms))
            setLoadingIcon(false)
        }

        init()
    }, [])

    return (
        <div className="Home">
            <Loading show={loadingIcon} />
            <Logout />
        </div>
    )
}

export default Home