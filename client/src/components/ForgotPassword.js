import React, { useState } from 'react'

function ForgotPassword() {
    const [disableBtn, setDisabledBtn] = useState(true)

    const enableBtn = () => {
        setDisabledBtn(!disableBtn)
    }
    return (
        <div>
            <button onClick={enableBtn}>Enable button</button>
            <button disabled={disableBtn}>Click me</button>
        </div>
    )
}

export default ForgotPassword
