import React from "react"

const File = ({ name, type, size }) => {
  return (
    <div className="file">
      <h4 className="name">{name}</h4>
      <h4 className="type">{type ? type : "-"}</h4>
      <h4 className="size">{size} MB</h4>
    </div>
  )
}

export default File
