import { useEffect, useState } from 'react'
import './App.css'

declare global {
  interface Window {
    electron: any;
  }
}

function App() {
  const [fileContent, setFileContent] = useState(null);
  const fullPath = "C:\\Users\\Name\\AppData\\Roaming\\dbtest\\my-folder\\"

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      const filePath = fullPath+file.name;
      console.log(filePath)
      const json = await window.electron.invoke('parse-xlsx', filePath);
      setFileContent(json);
    }
  };

  return (
    <>
      <div>
      <h2>Parse an excel file</h2>
      <input type="file" name="file" id="file" onChange={handleFileChange} />
        <div className='content'>
          {fileContent ? fileContent : 'content of the file.'}
        </div>
      </div>
    </>
  )
}

export default App
