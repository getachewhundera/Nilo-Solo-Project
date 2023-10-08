import { useState } from 'react';
import { useDispatch } from 'react-redux';


function ImageUploadForm() {
  const [imageDescription, setImageDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch();

  const onImageSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPLOAD_IMAGE',
      payload: {
        imageDescription,
        selectedFile
      }
    })
  }

  return (
    <div className="grid-col grid-col_5">
      <h3>Image Upload:</h3>
      <form className="uploadForm"
        onSubmit={onImageSubmit}>
        <input 
          type="text"
          placeholder="provide a description"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}/>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}/>
        <button>Submit</button>
      </form>
    </div>
  );
}


export default ImageUploadForm;
