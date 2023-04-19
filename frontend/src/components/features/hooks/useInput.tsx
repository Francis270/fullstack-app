import { useState } from 'react'

export type inputProps = {
    type: string
    class: string
}

export const useInput = (props: inputProps) => {
    const [value, setValue] = useState<string>('')
    const input = <input className={ props.class } value={ value } onChange={ e => setValue(e.target.value) } type={ props.type } />
    
    return [value, input]
}