import fs from "fs"
import path from "path"
import express from "express"
import getFolderSize from "get-folder-size"
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Api Running")
})

// ROUTE      POST  /api/
// DESC       get directories using path
// ACCESS     Public

app.post("/api", (req, res) => {
  const { path: dir } = req.body
  let directory = path.join(...dir)
  fs.readdir(directory, (err, result) => {
    if (err) {
      throw new Error(err)
    } else {
      var dataToSend = []
      result.filter((r) => {
        let filePath = directory === "/" ? `/${r}` : `${directory}/${r}`
        try {
          const stats = fs.statSync(filePath)
          if (stats.isDirectory()) {
            dataToSend.push(r)
          }
        } catch (error) {
          throw new Error(error)
        }
      })

      res.json(dataToSend)
    }
  })
})

// ROUTE      POST  /api/files
// DESC       get content of a directory using directory name
// ACCESS     Public

app.post("/api/files", (req, res) => {
  const { path: dir } = req.body
  let directory = path.join(...dir)
  fs.readdir(directory, (err, result) => {
    if (err) {
      throw new Error(err)
    } else {
      var dataToSend = []
      result.filter((r) => {
        let filePath = directory === "/" ? `/${r}` : `${directory}/${r}`
        try {
          const stats = fs.statSync(filePath)
          if (stats.isFile()) {
            const type = path.extname(filePath)
            dataToSend.push({ name: r, size: stats.size / 1000000, type })
          }
        } catch (error) {
          throw new Error(error)
        }
      })

      res.json(dataToSend)
    }
  })
})

// ROUTE      POST /api/metadata
// DESC       get metadata of a route
// ACCESS     Public

app.post("/api/metadata", (req, res) => {
  const { path: dir } = req.body
  let directory = path.join(...dir)
  fs.readdir(directory, (err, result) => {
    if (err) {
      throw new Error(err)
    } else {
      var dataToSend = { path: directory }
      var totalExtension = 0
      var noExtension = 0
      result.filter((r) => {
        let filePath = directory === "/" ? `/${r}` : `${directory}/${r}`
        try {
          const stats = fs.statSync(filePath)
          if (stats.isFile()) {
            const type = path.extname(filePath)
            if (type) {
              totalExtension += 1
            } else {
              noExtension += 1
            }
          }
        } catch (error) {
          throw new Error(error)
        }
      })

      dataToSend["totalExtension"] = totalExtension
      dataToSend["noExtension"] = noExtension
      res.json(dataToSend)
    }
  })
})

// ROUTE      POST /api/getsize
// DESC       get size of a directory
// ACCESS     Public

//==calculating size takes in time so im making a seprate route for this and commenting this out===//

// =============  UNCOMMENT THE BELOW CODE TO MAKE SIZE WORK (THIS WILL SLOW DOWN THE FRONTEND)

// app.post("/api/getsize", async (req, res) => {
//   const { path: dir } = req.body
//   let directory = path.join(...dir)
//   const size = await getFolderSize.loose(directory)
//   await res.send(`${size / 1000000}`)
// })

//===========================================

app.listen(5000, (req, res) => {
  console.log("running")
})
