import { useState } from "react"

const CreateNote = () =>{
    const [title, setTitle] = useState("")
    const [description, setDes] = useState("")

    const handleAddition = () => {
        const payload = {
            title,
            description
        }

        fetch("http://localhost:8080/notes", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(payload)
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((error)=>console.log(error))
    }
    return (
        <>
            <h2>Welcom, Please go ahead and create a new note!</h2>
            <input type="text" placeholder="Enter title..." value={title} onChange = {(e)=>{setTitle(e.target.value)}}/>
            <textarea name="" id="" placeholder="Enter the description..." value={description} onChange = {(e)=>{setDes(e.target.value)}}></textarea>
            <button onClick = {handleAddition}>Add Note!</button>
        </>
    )
}

export {CreateNote}