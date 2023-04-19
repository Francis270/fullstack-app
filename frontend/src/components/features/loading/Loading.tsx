import './loading.scss'

type LoadProps = {
    show: boolean
}

const Loading = (props: LoadProps) => {
    return (
        <div className={`loading-progress-screen ${props.show ? 'show' : 'hide'}`}>
            <span className="loading-icon"></span>
        </div>
    )
}

export default Loading