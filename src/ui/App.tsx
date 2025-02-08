import { useEffect, useState } from 'react'
import './App.css'

declare global {
  interface Window {
    electron: any;
  }
}

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [columns, setColumns] = useState([{ name: '', prop: '', type: '' }]);
  const fullPath = "C:\\Users\\Wesley\\AppData\\Roaming\\dbtest\\my-folder\\";


  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    console.log(columns)
    if (file) {
      const filePath = fullPath+file.name;
      console.log(filePath)
      const json = await window.electron.invoke('parse-xlsx', [filePath, columns]);
      setFileContent(json);
    }
  };

  const handleColumnChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(event.target)
    const values = [...columns];
    const { name, value } = event.target;
    values[index] = { ...values[index], [name]: value };
    setColumns(values);
  };

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', prop: '', type: '' }]);
  };

  return (
    <>
      <div>
      <h3>Columns</h3>
          {columns.map((column, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Column Name"
                value={column.name}
                onChange={(event) => handleColumnChange(index, event)}
              />
              <input
                type="text"
                name="prop"
                placeholder="Display name"
                value={column.prop}
                onChange={(event) => handleColumnChange(index, event)}
              />
              <select
                name="type"
                value={column.type}
                onChange={(event) => handleColumnChange(index, event)}
              >
                <option value="">Select Type</option>
                <option value="String">Text</option>
                <option value="Number">Number</option>
              </select>
            </div>
          ))}
          <button onClick={handleAddColumn}>Add Column</button>
      <h2>Parse an excel file</h2>
      <input type="file" name="file" id="file" onChange={handleFileChange} />
        <div className='json-content'>
          {fileContent ? fileContent : 'content of the file.'}
        </div>
      </div>
    </>
  )
}

export default App
