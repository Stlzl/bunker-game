import { useState } from "react"
import {v4 as uuid} from "uuid"
import Lobby from "./Lobby"
import "./homePage.css"


export default function HomePage() {
    const [isCreate, setIsCreate] = useState(false)
    const [isJoin, setIsJoin] = useState(false)
    const [userName, setUserName] = useState('')
    const [lobbyUID, setLobbyUID] = useState('')
    const [isCreated, setIsCreated] = useState(false)
    let user = {
        uid_user: uuid().slice(0, 19)
    }

   const [styleCreate, setStyleCreate] = useState({
    fontSize: '24px',
    marginLeft: '0px'
   })
   const [styleJoin, setStyleJoin] = useState({
    fontSize: '24px',
    marginLeft: '0px'
   })

    const formJoin = <div>
        <input type="text" placeholder="Name" onChange={e => setUserName(e.target.value)}/>
        <input type="text" placeholder="Room" onChange={e => setLobbyUID(e.target.value)}/>
    </div>

    const formCreate = <div>
        <input type="text" placeholder="Name" onChange={e => setUserName(e.target.value)}/>
    </div>

    const createPage = <div className="screenHome">
        <div className="welcomeContent">        
        <h1>Welcome to the Bunker</h1>
        <button onClick={() => handleChangeChoice(1)} style={styleCreate}>Create game</button>
            {isCreate ? formCreate : null}
        <button onClick={() => handleChangeChoice(2)} style={styleJoin}>Join game</button>
            {isJoin ? formJoin : null}
        <button onClick={() => handleSubmit()}>Play</button>
        </div>    
    </div>

    function handleChangeChoice(index) {  
            if (index == 1) {
                setIsCreate(true)
                setStyleCreate({
                    backgroundColor: 'rgb(135, 255, 135)',
                    marginLeft: '6px'
                })
                setStyleJoin({
                    fontSize: '12px'
                })
                setIsJoin(false)
            } else {
                setIsJoin(true)
                setStyleJoin({
                    backgroundColor: 'rgb(135, 255, 135)',
                    marginLeft: '6px'
                })
                setStyleCreate({
                    fontSize: '12px'
                })
                setIsCreate(false)
            }
    }


    function handleSubmit() {
        if(isCreate) {
            user.uid_lobby = uuid().slice(0,4)
            user.user_name = userName
            fetch('http://thebunkergame.com/api/users', {
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
                setIsCreated(true)
                console.log(user)
        } else if(isJoin) {
            user.uid_lobby = lobbyUID
            user.user_name = userName
            console.log(user)
            fetch('http://thebunkergame.com/api/users/with-lobby', {
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
        }
    }

    return (
        <>
            {isCreated ? <Lobby user={user}/> : createPage}
        </>
    )
}