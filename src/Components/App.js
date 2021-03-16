import './App.css';
import React from 'react';
import { Grid, Button, Popup } from 'semantic-ui-react';
import downloadCsv from 'download-csv';

import TopHeader from './TopHeader';
class App extends React.Component {
    constructor(){
      super()
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
    render(){
      return(
        <Grid padded className = "app-home">
          <TopHeader />
          <div style={{marginTop:"2%"}}>
            <Popup content='Muzzle count in IffcoTokio' trigger={<Button primary  onClick={()=>this.download()}>Download</Button>} />
          </div>
             
        </Grid>
      )
    }
  }
  
export default App
