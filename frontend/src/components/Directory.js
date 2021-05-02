import React from "react"

const Directory = ({ name, setDirContent, path, setPath }) => {
  const fetchByPath = () => {
    // setPath(`${path}/${name}`)
    setPath((old) => [...old, name])
    console.log(path)
  }

  return (
    <div className="file-name" onClick={fetchByPath}>
      <h3>{name}</h3>
    </div>
  )
}

export default Directory
