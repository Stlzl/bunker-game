import { useState, useEffect } from "react"
import {v4 as uuid} from "uuid"
import Lobby from "./Lobby"


export default function HomePage() {
    const [isCreate, setIsCreate] = useState(false)
    const [isJoin, setIsJoin] = useState(false)
    const [userName, setUserName] = useState('')
    const [lobbyUID, setLobbyUID] = useState('')
    const [isCreated, setIsCreated] = useState(false)
    let user = {}

    const formJoin = <div>
        <input type="text" placeholder="Name" onChange={e => setUserName(e.target.value)}/>
        <input type="text" placeholder="Room" onChange={e => setLobbyUID(e.target.value)}/>
    </div>

    const formCreate = <div>
        <input type="text" placeholder="Name" onChange={e => setUserName(e.target.value)}/>
    </div>

    const createPage = <div>            
        <>Welcome</>
        <button onClick={() => handleChangeChoice(1)}>Create game</button>
            {isCreate ? formCreate : null}
        <button onClick={() => handleChangeChoice(2)}>Join game</button>
            {isJoin ? formJoin : null}
        <button onClick={() => handleSubmit()}></button>
    </div>

    function handleChangeChoice(index) {
        if (!isCreate && !isJoin) {
            if (index == 1) {
                setIsCreate(true)
            } else {
                setIsJoin(true)
            }
        } else {
        setIsCreate(!isCreate)
        setIsJoin(!isJoin)
        }
    }

    function handleSubmit() {
        if(isCreate) {
            user = {
                Uid_user: uuid(),
                Uid_lobby: uuid().slice(0,4),
                User_name: userName,
            }
            fetch('http://thebunkergame.com/api/user_create', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        } else if(isJoin) {
            user = {
                Uid_user: uuid(),
                Uid_lobby: lobbyUID,
                User_name: userName
            }
            fetch('http://thebunkergame.com/api/users', {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    }

    return (
        <>
            {isCreated ? <Lobby user={user}/> : createPage}
        </>
    )
}