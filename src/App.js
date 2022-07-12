import './App.css';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

function App() {
  const [oriImage, setOriImage] = useState('')
  const [oriImageFile, setOriImageFile] = useState('')
  const [comImage, setComImage] = useState('')
  const [comImageFile, setComImageFile] = useState('')
  const [fileName, setFileName] = useState('')

  const [oriImageVisibility, setoriImageVisibility] = useState('none')
  const [comImageVisibility, setcomImageVisibility] = useState('none')

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOriImage(imageFile)
    setOriImageFile(URL.createObjectURL(imageFile))
    setFileName(URL.createObjectURL(imageFile))
    console.log(fileName);
    setoriImageVisibility('')
  }

  const handleCompress = (e) => {
    e.preventDefault(e);
    if(oriImage){
      const options = {
        maxSize: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true
      }
  
      if(options.maxSizeMB >= oriImage / 1024){
        alert('The Image Size Is Too Low To Compress')
        return 0;
      }
      let output;
      imageCompression(oriImage, options)
      .then((x) => {
        output = x;
        const dowloadLink = URL.createObjectURL(output)
        setComImageFile(dowloadLink)
        setcomImageVisibility('')
        console.log(dowloadLink);
      })
    }
    else{
      alert('Please Select The Image')
    }
    
  }


  return (
    <div className="App">
      <div className='input'>
        <h2>Image <span>Compresser</span> </h2>
        <input class="form-control form-control-lg" id="formFileLg" type="file" accept='image/*' onChange={(e) => handle(e)}/>
        <button type="button" class="btn btn-success" onClick={(e) => handleCompress(e)}>Compress Image</button>
      </div>
      <div className='images'>
        <img src={oriImageFile} class="img-fluid img-01" alt="..." style={{display:`${oriImageVisibility}`}}/>
        <img src={comImageFile} class="img-fluid img-02" alt="..." style={{display:`${comImageVisibility}`}}/>
        
      </div>
      <button type="button" class="btn btn-info" style={{display:`${comImageVisibility}`}}><a href={comImageFile} download>Download Compressed Image</a></button>
    </div> 
  );
}

export default App;
