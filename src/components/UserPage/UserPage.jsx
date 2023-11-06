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
          <p> My Feed:  </p>
        </div>



        <div class="gallery">
          {
            uploadList.length > 0 ? (
              uploadList.map(item => (
                <div key={item.id} class="gallery-item" tabindex="0" >
                  <img style={{ maxHeight: '200px' }} src={item.file_url} class="gallery-image" alt='IMAGE' />
                  <div className="gallery-text">
                    <DescriptionOutlinedIcon />{item.description}
                  </div>
                  <div className="gallery-text">
                    <PlaceOutlinedIcon /> {item.house_number}{item.street_address}, {item.city}, {item.state}{item.zip_code}
                  </div>
                  <div className="gallery-text">{item.country}</div>
                  <div className="gallery-text">
                    <AttachMoneyOutlinedIcon />{item.price}
                  </div>
                  <div className="gallery-text">
                    <GradeOutlinedIcon />{item.rating}
                  </div>
                  <div className="gallery-text">
                    <InsertEmoticonOutlinedIcon />{item.individual_selection}
                  </div>

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






