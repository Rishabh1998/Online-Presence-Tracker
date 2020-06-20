import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { firebase, firebaseDB } from './firebase';


const App = (props) =>{
    
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App auth={user}/>, document.getElementById('root'));
})

window.addEventListener('beforeunload', function (e) { 
    localStorage.removeItem('username');
    localStorage.removeItem('status');
    firebaseDB.ref("users/"+localStorage.getItem('id')+"/session").set(false)
    firebaseDB.ref("users/"+localStorage.getItem('id')+"/timestamp").set(Date.now())
}); 


