import { useState } from "react"

const Login = () =>{
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleLogin = () => {
        const payload = {
            email,
            pass
        }

        fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((res)=>res.json())
        .then((data)=>{
            alert(data.msg)
            localStorage.setItem("accessToken", data.token)
        })
        .catch((error)=>console.log(error))
    }
    return (
        <>
            <h2>Already a user, please login!</h2>
            <input type="text" placeholder="Enter email..." value={email} onChange = {(e)=>{setEmail(e.target.value)}}/>
            <input type="text" placeholder="Enter the Password..." value={pass} onChange = {(e)=>{setPass(e.target.value)}}/>
            <button onClick = {handleLogin}>Login!</button>
        </>
    )
}

export {Login}