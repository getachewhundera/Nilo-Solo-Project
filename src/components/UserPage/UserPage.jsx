import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './UserPage.css';


function UserPage() {
  const dispatch = useDispatch();

  const getItems = () => {
    dispatch({
      type: 'FETCH_ITEMS_FOR_FEED',
    });
  }

  useEffect(() => {
    getItems();
  }, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const fetchItems = useSelector((store) => store.uploadPostReducer.uploadedContent);
  console.log('these are the items', fetchItems);
  // const fetchItems = useSelector((store) => store.uploadPostReducer);

  return (
    <>
      <div className="container">
        <div className='homepagebuttons'>
          <ViewMyListPageButton />
          <UploadPageButton />
        </div>

        <div className='greeting'>
          <h2>Welcome, {user.username}!</h2>
          <p>Your ID is: {user.id}</p>
          <p> My Feed:  </p>
        </div>


        <div className='itemsContainers'>
          {
            fetchItems.length > 0 ? (
              fetchItems.map(item => (
                <div key={item.id}>
                  <img style={{ maxHeight: '200px' }} src={item.file_url} alt={item.description} />
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

// this allows us to use <App /> in index.js
export default UserPage;






