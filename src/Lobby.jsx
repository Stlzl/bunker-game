import { useEffect, useState } from "react"

export default function Lobby({user}) {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('http://thebunkergame.com/api/get-by-lobby', {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type" : "application/json"
                },
            })
                .then(response => response.json())
                .then(data => setData(data))
                .then(data => console.log(data))
                .catch(error => console.error(error));
    })
    return (
        <>Hello world</>
    )
}