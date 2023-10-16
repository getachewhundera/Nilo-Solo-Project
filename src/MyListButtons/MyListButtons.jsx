import React from 'react';
import { Link } from 'react-router-dom';

function MyListButtons() {
    
  return (
    <div className="MyListButtons-container">
      <Link to="/AddListItemPage"><button> Add New Item </button></Link>
      <Link to="/ViewMyListPage"><button> View My List </button></Link>
      <Link to="/CompletedListPage"><button> Completed  </button></Link>
      <Link to="/MapPage"><button> Map </button></Link>
    </div>
  );
}

export default MyListButtons;