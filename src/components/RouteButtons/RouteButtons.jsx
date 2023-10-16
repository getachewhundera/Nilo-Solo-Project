import React from 'react';
import { Link } from 'react-router-dom';

function Buttons() {
    
  return (
    <div className="buttons-container">
      <Link to="/AddListItemPage"><button> Add New Item </button></Link>
      <Link to="/ViewMyListPage"><button> View My List </button></Link>
      <Link to="/CompletedListPage"><button> Completed  </button></Link>
      <Link to="/MapPage"><button> Map </button></Link>
      <Link to="/UserPage"><button> My Feed </button></Link>
      <Link to="/UploadPage"><button> Upload </button></Link>
    </div>
  );
}

export default Buttons;