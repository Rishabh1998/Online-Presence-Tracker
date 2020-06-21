import React, {Component} from 'react';
import './styles/presence.css'
import m1 from './images/m1.webp'
import m2 from './images/m2.webp'
import m3 from './images/m3.webp'
import m4 from './images/m4.png'
import { firebaseDB } from './firebase';
class Presence extends Component{

    state = {
        status: true,
        username: '',
        users: [],
        offlineUsers: [],
        timestamps: [],
        dp: ["m1", "m2", "m3", "m4"]
    }
    // let users = []

    
    render(){

        if(!!localStorage.getItem('username') && this.state.username !== localStorage.getItem('username')){
            let t = localStorage.getItem('status') === "false"?false:true
            this.setState({username: localStorage.getItem('username'), status: t})
            
        }
        
        let firebaseUsers = [], offlineUsers = [], timestamps = []
        firebaseDB.ref('users').on('value', (snapshot) => {
            console.log("triggered")
            snapshot.forEach((child) => {
                console.log("child", child.val())
                    if(child.val().session){
                        if(child.val().username !== this.state.username)
                        firebaseUsers.push(child.val().name)
                        console.log("data firebase", firebaseUsers)
                    }else{
                        offlineUsers.push(child.val().name)
                        timestamps.push(child.val().timestamp)
                    }
            })
            if(JSON.stringify(this.state.users) !== JSON.stringify(firebaseUsers) || JSON.stringify(this.state.offlineUsers) !== JSON.stringify(offlineUsers)){
                this.setState({users: firebaseUsers, offlineUsers: offlineUsers, timestamps: timestamps})
                firebaseUsers = []
            }
        
        });
        console.log("this is the data", firebaseUsers)
       let users = this.state.users.map((user, index) => {
           let image;
           if(this.state.dp[index] === "m1")
           image = m1;
           else if (this.state.dp[index] === "m2")
           image = m2;
           else if (this.state.dp[index] === "m3")
           image = m3;
           else 
           image = m4;
           return(
           <div className="user tooltip"><span class="tooltiptext">{user}</span><img src={image} alt="Avatar"/></div>
           )
           
       })

       let offlineUsersView = this.state.offlineUsers.map((user, index) => {
           let date = new Date(this.state.timestamps[index])
           return(
                   <div class="alert success">
                    <strong>{user}</strong> Last seen at - <strong>{date.toLocaleString()}</strong>
                    </div>
           )
       })
       let usernames = this.state.users.map((user) => {
           return(
               <div>{user}</div>
           )
       })

       return(
           <div>
        { !this.state.status?
           <div className="sign_up">
               
               
               <h2>Online Users: </h2>
               {users.length == 0?
               <div> No one else is currenly online</div>
            :
            users.slice(0,3)}
               {usernames.length - 3 <= 0?null:
       <div className="user tooltip numberCircle"><span class="tooltiptext">{usernames.slice(3)}</span>+{usernames.length-3}</div>
               }
               
               <h2 className="padding">Offline Users: </h2>
               {offlineUsersView}
               
               </div>
            :
            <div class="alert">

            <strong>Error!</strong> You need to login to see the dashboard.
            </div>
               
            }
            </div>
       )
    }
}

export default Presence;