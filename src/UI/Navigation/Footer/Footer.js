import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import Modal from '../../Modal/Modal';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width:'100%',
    backgroundColor:'#2196f3'
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let modal=null
  const[info,setInfo]=useState(null)
    let infoModal= <Modal show={info} modalClosed={()=>setInfo(false)} >
                      <h3>this site has been desinged for a demo purpose</h3>
                  </Modal>
  if(info){
      modal=infoModal
    }
  const infoHandler=()=>{
    setInfo(true)  
  }
  const[favourite,setFavourite]=useState(null)
      const favouriteModal= <Modal show={favourite} modalClosed={()=>setFavourite(false)} >
                      <h3>Sorry, you have not Selected anything!</h3>
                  </Modal>
      modal=favourite? favouriteModal:modal
  const favouriteHandler=()=>{
    setFavourite(true)  
  }
  const[contact,setContact]=useState(null)
    const contactModal= <Modal show={contact} modalClosed={()=>setContact(false)} >
                      <h3>You can contact us on:- <br/></h3>
                      <p>mobile:-8083397576</p>
                      <p>mail:- abhinandanPandey.ap@gmail.com</p>
                  </Modal>
      modal=contact?contactModal:modal
  const contactHandler=()=>{
    setContact(true)  
  }

  return (
    <Auxiliary>
    {modal}
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<InfoIcon />} label="About Us"  onClick={infoHandler}/>
        <Tab icon={<FavoriteIcon />} label="Favourates" onClick={favouriteHandler} />
        <Tab icon={<PhoneIcon />} label="Contact Us" onClick={contactHandler}/>
      </Tabs>
       <h4><b>&#169; 2020-2021 e-commerce.com</b><br/>
       <b>Created & Managed By-Mr. Abhinandan Kumar Pandey</b></h4>
    </Paper>
  </Auxiliary>
  );
}
