import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import CryptoBoyNFTDetails from "../CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import NFTHighlights from "../NFTHighlights/NFTHighlights";
import Loading from "../Loading/Loading";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import data from '../data.json'
import CategoryContainer from '../DropdownContainer/DropdownContainer';

const _ = require('lodash');
const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
    //width:"-webkit-fill-available",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
  },
  // parent:{
  //   display: "grid",// activate grid
  //   gridTemplateColumns: "repeat(4, 1fr)", //make 4 cols with size 1fr
  //   gridGap: "20px", //gap between the rows
  // },
  // child:{
  //   '&:nthChild(3n+1)' :{
  //     gridColumn: 1,
  //   },
  //  ' &:nthChild(3n+2)' :{
  //     gridColumn: 2,
  //   },
  //   '&:nthChild(3n+3)' :{
  //     gridColumn: 3,
  //   },
  //   '&:nthChild(3n+4)' :{
  //     gridColumn: 1, //put the fourth item in a new row
  //   },
    
  // },
  
}));
const AllCryptoBoys = ({
  
  accountAddress,
  cryptoBoys,
  //allcryptoBoys,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyCryptoBoy,
  callbackFromParent,
  cryptoBoysContract,
  usersContract,
  cryptoBoysCount,
  users
}) => {
  
  const [loading, setLoading] = useState(true);
  const [address,setAddress]=useState("");
  const [start,setStart]=useState(1);
  const [startState,setStartState]=useState(1);
  const [end,setEnd]=useState(3);
  const [endState,setEndState]=useState(3);
  const [showCategory,setShowCategory]=useState(false);
  const [filters,setFilters]=useState([]);
  const [categories,setCategories]=useState([]);
  //const [lastPosition,setLastPosition]=useState(perPage)
 // const [allCryptoBoys,setAllCryptoBoys]=useState(cryptoBoys.slice(0,perPage));
  const [endOfDesigns,setEndOfDesigns]=useState(false);
  

 console.log(users)
  useEffect(() => {
    if (cryptoBoys.length !== 0) {
      if (cryptoBoys[0].metaData !== undefined) {
        //setLoading(false);
      } else {
       // setLoading(true);
      }
    }
   
  // loadDesigns(start,end)
  }, [usersContract,users]);
  
  //console.log(cryptoBoysContract)
  const myCallback1=(dataFromChild1)=>{
    //console.log(dataFromChild)
   // setAddress(dataFromChild1)
    callbackFromParent(dataFromChild1)
   // console.log(address)
  }

  if(window.innerWidth>1280 && window.innerWidth<=1920 ){
    
    postsPerPage=4;
    // if( height/window.innerHeight<1){
    
    //   perPage=perPage+4;
      
    // }
  }
  else if(window.innerWidth>960 && window.innerWidth<=1280){
    postsPerPage=3;
    // if( height/window.innerHeight<1){
    
    //   perPage=perPage+3;
      
    // }
  }
  else if(window.innerWidth>600 && window.innerWidth<=960){
    postsPerPage=2;
    // if( height/window.innerHeight<1){
    
    //   perPage=perPage+2;
      
    // }
  }
 
  else if(window.innerWidth<="600"){
    postsPerPage=1;
    // if( height/window.innerHeight<1){
    
    //   perPage=perPage+1;
      
    // }
  }
  let postsPerPage;
  let arrayForHoldingPosts = [];
   const [allDesigns,setAllDesigns]=useState([]);
   const [next,setNext]=useState(postsPerPage);

   const loopWithSlice = (start, end) => {
   // const slicedPosts = props.users.slice(start, end);
    // arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setAllDesigns((prev)=>[...prev,...cryptoBoys.slice(start,end)]);
  };
  // useEffect(() => {
  //   loopWithSlice(0, postsPerPage);
  // }, []);
  useEffect(()=>{
    setAllDesigns(cryptoBoys.slice(0,postsPerPage))
  },[cryptoBoys])

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  // const loadDesigns=async(start,end)=>{
  //   console.log("end",end)
  // //   const cryptoBoysCount = await cryptoBoysContract.methods
  // //   .cryptoBoyCounter()
  // //   .call();
  // // this.setState({ cryptoBoysCount }); 
  // if(cryptoBoysContract){
  //   if(totalTokensMinted!=0){
  //  for (var i = start; i <= end; i++) {
  
    
  //   const cryptoBoy = await cryptoBoysContract.methods
  //     .allCryptoBoys(i)
  //     .call();
  //     console.log(cryptoBoy)
  //  setAllCryptoBoys(allCryptoBoys=>
  //     [...allCryptoBoys, cryptoBoy]);
     
  //   if(i===totalTokensMinted){
  //     setEndOfDesigns(true)
  //     break;
  //   }}}
  // }
  // }
  
  // const scrollToEnd=()=>{
  //   // this.setState({page:this.state.page+1});
  //   if(allCryptoBoys.length==totalTokensMinted){
  //     setEndOfDesigns(true);
  //   return;}

  //   setTimeout(() => {
  //     setAllCryptoBoys((prev) => [...prev,...cryptoBoys.slice(lastPosition,lastPosition+perPage)]);
     
  //  }, 2000);
    
  //    setLastPosition(lastPosition+perPage);
  //    //setLoading(true);
  //    //console.log(console.log("start",start))
     
  //    //loadDesigns(start,end);
  //   }
     
     
   

    // console.log(this.state.page);
   
 
  //  window.onscroll=function(){
  //    console.log(window.innerHeight,document.documentElement.scrollTop,document.documentElement.offsetHeight)
  //    if(
  //      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight 
  //    ){
  //     if(!endOfDesigns){
  //      scrollToEnd();
  //     }
  //      console.log("here")
  //    }
  //  }
   const gridStyles = useGridStyles();
  
   const onChange = (currentNode, selectedNodes) => {
    const loc=selectedNodes.map(x=>x.value)
    console.log(loc);
    setCategories(loc);
    
    console.log('onChange::', currentNode, selectedNodes)
  } 

  const searchFilters=()=>{
    console.log(categories[0])
    var flatArray = Array.prototype.concat.apply([], categories);
    console.log(flatArray)
    let searchedResults=[];
    cryptoBoys.filter((cryptoBoy)=>{
      // categories.some((newItem)=>{
      //   cryptoBoy[newItem.push]
      // })
      const found = cryptoBoy.metaData.categories.some(r=> flatArray.indexOf(r) >= 0)
      if(found){
        searchedResults.push(cryptoBoy);
      }
     // console.log( cryptoBoy.metaData.categories)
     // cryptoBoy.metaData.categories.filter((obj)=>obj.includes(categories))
     
    })
    setAllDesigns(searchedResults)
    // const filteredArray = _.cloneDeep(cryptoBoys);
    // filteredArray.map(obj => Object.keys(obj).forEach((key) => {
    //   if (!categories.includes(key)) {
    //     delete obj[key];
    //   }
    // }))
    // console.log(filteredArray);
    //console.log(cryptoBoys.filter((cryptoBoy)=>cryptoBoy.metaData.categories,{categories}));
    console.log(searchedResults)
  }
  return (
    <div style={{padding:"0.5%"}}>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Total No. of Designs On The Platform :{" "}
            {totalTokensMinted}
          </h5>
        </div>
      </div>

      {cryptoBoys?(
        <>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <button className="mt-3 btn btn-outline-primary" onClick={()=>setShowCategory(!showCategory)} style={{borderRadius:"20px"}}>
                Filters
              </button>
              {showCategory?(<div style={{display:"flex",alignItems:"flex-end"}}> <CategoryContainer data={data} onChange={onChange}  texts={{placeholder:"Category"}} /> 
              <button className="mt-3 btn btn-outline-primary" onClick={searchFilters} style={{borderRadius:"20px",marginLeft:"4px"}}>
              Search
              </button>
              </div>):null}
              </div>      
        <div style={{display:"flex",justifyContent:"center",padding:"1.5%",height:"100%"}}>
      
        <Grid classes={gridStyles} container spacing={4} >
       
        {allDesigns.map((cryptoboy) => {
          return (
            <>
             <Grid item xs={12} sm={6} lg={4} xl={3} >
             <NFTHighlights
                cryptoboy={cryptoboy}
                accountAddress={accountAddress}
                changeTokenPrice={changeTokenPrice}
                toggleForSale={toggleForSale}
                buyCryptoBoy={buyCryptoBoy}
                callbackFromParent={myCallback1}
                cryptoBoysContract={cryptoBoysContract}
                usersContract={usersContract}
                users={users}
              />
             </Grid>
           </> 

            // {/* // <div
            // //   key={cryptoboy.tokenId.toNumber()}
            // //   className="col-md-6 "
            // //   className="w-50 p-4 mt-1 border "
            // //   style={{display:"flex"}}
              
            // // >
            // //   {!loading ? (
            // //     <CryptoBoyNFTImage
            // //     cryptoboy={cryptoboy}
            // //     />
              
               
            // //   ) : (
            // //     <Loading />
            // //   )}</div>
            // //   {/* <CryptoBoyNFTDetails
            // //     cryptoboy={cryptoboy}
            // //     accountAddress={accountAddress}
            // //     changeTokenPrice={changeTokenPrice}
            // //     toggleForSale={toggleForSale}
            // //     buyCryptoBoy={buyCryptoBoy}
            // //     callbackFromParent={myCallback1}
            // //   /> */}
            // //   <div className="col-md-6 "
            // //   className="w-50 p-4 mt-1 border text-center"
            // //   >
            // //   <NFTHighlights
            // //     cryptoboy={cryptoboy}
            // //     accountAddress={accountAddress}
            // //     changeTokenPrice={changeTokenPrice}
            // //     toggleForSale={toggleForSale}
            // //     buyCryptoBoy={buyCryptoBoy}
            // //     callbackFromParent={myCallback1}
            // //     cryptoBoysContract={cryptoBoysContract}
            // //     usersContract={usersContract}
            // //   />
               
            // //   </div>
            // //   <hr/> */}
        
            
          );
        })}
        </Grid>
             </div>
             <div style={{display:"flex",justifyContent:"center"}}>
               {allDesigns.length===cryptoBoys.length?(<> <Alert severity="success" color="info">
      You are all Caught Up
      </Alert></>):
               (
                <button onClick={handleShowMorePosts}>Load more</button>
             )}
            
             </div></>
      ):(<Loading/>)}
      
      </div>
   
  );
};

export default AllCryptoBoys;
