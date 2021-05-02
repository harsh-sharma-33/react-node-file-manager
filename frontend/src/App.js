import React, { useEffect, useState } from "react"
import axios from "axios"
import Directory from "./components/Directory"
import File from "./components/File"
import "./styles/app.scss"
function App() {
  const [dir, setDir] = useState([])
  const [path, setPath] = useState(["/"])
  const [files, setFiles] = useState([])
  const [metaData, setMetaData] = useState({})
  const [size, setSize] = useState("")

  useEffect(() => {
    // Fetching Directories
    const fetchDirByPath = async () => {
      const { data } = await axios.post(`/api`, { path })
      await setDir(data)
    }
    fetchDirByPath()

    // Fetching Files
    const fetchFiles = async () => {
      const { data } = await axios.post(`/api/files`, { path })
      await setFiles(data)
    }
    fetchFiles()

    // Fetching Metadata of  the directory
    const fetchMetadata = async () => {
      const { data } = await axios.post(`/api/metadata`, { path })
      await setMetaData(data)
    }
    fetchMetadata()

    // Fetching Size of  the directory
    // UNCOMMENT THE FUNCTION BELOW TO MAKE SIZE WORK (WILL SLOW DOWN)
    //===============================
    // const fetchSize = async () => {
    //   const { data } = await axios.post(`/api/getsize`, { path })
    //   await setSize(data)
    //   console.log(data)
    // }
    // fetchSize()
    //=================================
  }, [path])

  // Function to move back from a directory
  const goBack = () => {
    const newPath = [...path]
    newPath.pop()
    setPath(newPath)
  }

  return (
    <div className="App">
      <h1 className="head">React File System</h1>

      <div className="info">
        <p className="folder">Folder {metaData.path}</p>
        <p className="total-extension">
          Total Extension {metaData.totalExtension}
        </p>
        <p className="no-extension">
          File with no Extension {metaData.noExtension}
        </p>
        <p className="size">Size {size} MB</p>
      </div>
      <main>
        <div className="left">
          <h2>Directories</h2>
          <p className="go-back" onClick={goBack}>
            ..
          </p>
          {dir &&
            dir.map((d, index) => {
              return (
                <Directory key={index} name={d} path={path} setPath={setPath} />
              )
            })}
        </div>
        <div className="right">
          <div className="head">
            <div className="name">
              <h3>Name</h3>
            </div>
            <div className="type">
              <h3>Type</h3>
            </div>
            <div className="size">
              <h3>Size</h3>
            </div>
          </div>
          {files &&
            files.map((file, index) => {
              return (
                <File
                  key={index}
                  name={file.name}
                  size={file.size}
                  type={file.type}
                />
              )
            })}
        </div>
      </main>
    </div>
  )
}

export default App
