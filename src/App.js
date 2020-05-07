import React from 'react';
import './App.css';
import Admin from './Components/Admin/index';
import SignIn from './Components/Auth/signIn';
import OwnerAdmin from './Components/OwnerAdmin/index';

function App() {
  return (
    <div className="App">
      {/*    <Admin  /> */}
      <OwnerAdmin />
      <SignIn />
    </div>
  );
}

export default App;
