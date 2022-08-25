import React, { useState } from 'react'

const ExcursionPage = () => {
    const [register, setRegister] = useState(false);

    return (
        <div>
            <h1>EXCURSION PAGE 1</h1>
            <p>Image goes here</p>
            <p>Number of seats available</p>
            <p>Cost for adults</p>
            <p>Cost for children</p>
            <p>Cancellatio fee</p>
            <p>Additional requirements (if any)</p>
            <p>Register button goes here</p>
        </div>
    )
}

export default ExcursionPage;