import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './UserPage.css';
//Material UI Icons 
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';

import Tooltip from '@mui/material/Tooltip';


function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const uploadList = useSelector((store) => store.uploadPostReducer.uploadedContent);

  useEffect(() => {
    getUploadedPost();
  }, []);

  const getUploadedPost = () => {
    dispatch({ type: 'FETCH_ITEMS_FOR_FEED' })
  }

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
        dispatch({ type: 'DELETE_POST', payload: itemId }); // Dispatch action to delete item
    }
};

  return (
    <>
      <div className="container">
        <div className='homepagebuttons'>
          <ViewMyListPageButton />
          <UploadPageButton />
        </div>

        <div className='greeting'>
          <h2>Welcome, {user.firstname}!</h2>
          {/* <p>Your ID is: {user.id}</p> */}
          <p> Experiences:  </p>
        </div>



        <div class="gallery">
          {
            uploadList.length > 0 ? (
              uploadList.map(item => (
                <div key={item.id} class="gallery-item" tabindex="0" >
                  <img style={{ maxHeight: '200px' }} src={item.file_url} class="gallery-image" alt='IMAGE' />

                  <div className="gallery-item-content">
                    <Tooltip title={item.description} placement="top" arrow>
                      <div className="gallery-text">
                        <span className="icon"><DescriptionOutlinedIcon /></span>
                        <span>{item.description}</span>
                      </div>
                    </Tooltip>

                    <Tooltip title={`Location: ${item.house_number} ${item.street_address}, ${item.city}, ${item.state} ${item.zip_code}`} placement="top" arrow>
                      <div className="gallery-text">
                        <span className="icon"><PlaceOutlinedIcon /></span>
                        {`${item.house_number} ${item.street_address}, ${item.city}, ${item.state} ${item.zip_code}`}
                      </div>
                    </Tooltip>

                    <Tooltip title={`Price: ${item.price}`} placement="top" arrow>
                      <div className="gallery-text">
                        <span className="icon"><AttachMoneyOutlinedIcon /></span>
                        {item.price}
                      </div>
                    </Tooltip>

                    <Tooltip title={`Rating: ${item.rating}`} placement="top" arrow>
                      <div className="gallery-text">
                        <span className="icon"><GradeOutlinedIcon /></span>
                        {item.rating}
                      </div>
                    </Tooltip>

                    <Tooltip title={`Selection: ${item.individualSelection}`} placement="top" arrow>
                      <div className="gallery-text">
                        <span className="icon"><InsertEmoticonOutlinedIcon /></span>
                        {item.individualSelection}
                      </div>
                    </Tooltip>

                  </div>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No items to display</p>
            )
          }
        </div>

        <div className='homepageLogoutButton'>

          <LogOutButton className="btn" />
        </div>
      </div>
    </>
  );
}

export default UserPage;






