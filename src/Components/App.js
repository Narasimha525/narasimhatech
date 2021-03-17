import './App.css';
import React from 'react';
import { Grid, Button, Popup, Icon, Loader, Confirm } from 'semantic-ui-react';
import downloadCsv from 'download-csv';

import TopHeader from './TopHeader';
class App extends React.Component {
    constructor(){
      super()
      this.state={
        open:false,
        loader:false
      }
      this.download = this.download.bind(this)
    }
    download(){
      fetch(' https://edairy-backend.herokuapp.com/rfidmatch')
      .then(res=>res.json())
      .then(data=>{
        var arr = []
        const columns = { c1: '', c2: '' };
        arr.push({c1:"Total Cattle ",c2:"'"+data['cattleLength']+"'"})
        arr.push({c1:"Total Cattle with RFID ",c2:"'"+data['match']+"'"})
        arr.push({c1:"Total Cattle under muzzle ",c2:"'"+data['muzzlesLength']+"'"})
        downloadCsv(arr,columns,`iffcotokio_rfid_match_Count.csv`);
      })
    }
    insurance_report(){
      console.log("TODO");
    }
    handleButtonClick = () => this.setState({ open: true,loader:false })
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })
    iffco_report(){
      this.setState({loader:true})
      fetch('http://34.105.16.205:4943/iffcoreport')
      .then(res=>res.json())
      .then(data=>{
        this.handleButtonClick()
      })
    }
    render(){
      return(
        <Grid padded className = "app-home">
          <TopHeader />
          <div style={{marginTop:"2%"}}>
            <Popup content='Muzzle count in IffcoTokio' trigger={<Button primary  onClick={()=>this.download()}>Muzzle count in IffcoTokio</Button>} />
            {/* <Button icon onClick={()=>this.insurance_report()}> <Icon name='mail'/> Insurance Report</Button> */}
            <Button icon onClick={()=>this.iffco_report()}> <Icon name='mail'/> Iffcotokio Report <Loader size='mini' active={this.state.loader} inline/></Button> 
          </div>

          <Confirm
          content='Report is sent to your mail.Please Check!!'
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size='mini'
        />   
        </Grid>
      )
    }
  }
  
export default App
