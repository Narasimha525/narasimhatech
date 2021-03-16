import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/dvaraLogo.jpg';
import { Button, Confirm, Grid, GridColumn, Table, Icon } from 'semantic-ui-react';
import firebase from '../firebaseConnection';
import { connect } from 'react-redux';
import axios from 'axios';

import moment from 'moment';



class TopHeader extends React.Component {
    state = { open: false}

    show = () => this.setState({ open : true});
    handleConfirm = () => this.setState({ open : false});
    handleCancel = () => this.setState({ open : false });

    handleLogout = () => {
        firebase.auth().signOut().then (() => {
          console.log('signed out');
        })
      }
      download = () =>{
        // fetch('http://34.105.16.205:4943/pdfgeneration',{
        //   method:'post',
        //   body:JSON.stringify({
        //     image:"https://firebasestorage.googleapis.com/v0/b/samastha-7552a.appspot.com/o/images%2Fcattles%2F-MSwSbwyKJv6P8YfJPEN%2FFull_side_view_Muzzle_to_Tail.jpg?alt=media&token=c248ab6e-29a7-446d-b9c3-a8207e97e686",
        //     cowIDORPetName:"CATTLE132",
        //     about:"பரிந்துடரகள் :",
        //     recommendations:"ಹಸುವನ್ನು ಡಿವರ್ಮ್ ಮಾಡಿ,ಖನಿಜ ಮಿಶ್ರಣವನ್ನು ಸರಬರಾಜು ಮಾಡಿ"}),
        //   headers:{
        //     'Content-Type': 'application/json'
        //   }
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //   console.log(data);
        // })
        axios({
          url:'http://34.105.16.205:4943/dd?cowIDORPetName=CATTLE12',
          method:'GET',
          headers:{'Content-Type': 'application/octet-stream'},
          responseType:'blob'
          })
          .then((response)=>{
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          
          link.setAttribute('download','image.docx')
          link.click()
          })
      }
    render(){


        return (
            <div className = "headerContainer">
            <Link className = "headerWrapper" to = '/'>
                <div className = "dvaraLogoImgWrapper">
                    <img className = "dvaraLogoImg"src = {logo} alt = "DvaraLogo"/>
                </div>
            </Link>
            <div className = "headerCustomTitleWrapper">
              <div className = "headerCustomTitle">DVARA E-DAIRY TECH DASHBOARD</div>
            </div>
            <div>
                {/* <Button onClick = {this.download}>Hi</Button> */}
                <Button onClick = {this.show} style = {{background: 'red', color: 'white'}}> Logout
                </Button>

                <Confirm 
                    open = {this.state.open}
                    cancelButton = 'Never mind'
                    confirmButton = "Let's do it"
                    onCancel = {this.handleCancel}
                    onConfirm = {this.handleConfirm,this.handleLogout}
                />
            </div>
          </div>
        );
    }
};

const mapStateFromProps = state => ({
});

export default connect(mapStateFromProps)(TopHeader);