import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ImageList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_IMAGES'
    })
  }, [])

  const images = useSelector(store => store.images);

  return (
    <div className="grid-col grid-col_7">
      <h3>My Images:</h3>
      {images.map((image) => {
        return (
          <div key={image.id} className="width-80">
            <p>{image.description}</p>
            <img src={image.image_path}/>
          </div>
        )
      })}
    </div>
  );
}


export default ImageList;
