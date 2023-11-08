import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  const user = useSelector((store) => store.user);

  return (
    <div className='footer-page'>
      <footer class="footer">
        <p id="footer-text"> Nilo: Created By Getachew Hundera</p>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="footerLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="footerLink" to="/user">
              Home
            </Link>

            <Link className="footerLink" to="/about">
              About
            </Link>
          </>
        )}
      </footer>
    </div>
  );
};


export default Footer;