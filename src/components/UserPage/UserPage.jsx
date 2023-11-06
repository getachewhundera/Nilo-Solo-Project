import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './UserPage.css';


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


        <div className='itemsContainers'>
          {
            uploadList.length > 0 ? (
              uploadList.map(item => (
                <div key={item.id}>
                  <img style={{ maxHeight: '200px' }} src={item.file_url} alt='IMAGE' />
                  <div>{item.description}</div>
                  <div>{item.house_number}</div>
                  <div>{item.street_address}</div>
                  <div>{item.zip_code}</div>
                  <div>{item.city}</div>
                  <div>{item.state}</div>
                  <div>{item.country}</div>
                  <div> {item.price}</div>
                  <div>{item.rating}</div>
                  <div>{item.individual_selection}</div>

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






