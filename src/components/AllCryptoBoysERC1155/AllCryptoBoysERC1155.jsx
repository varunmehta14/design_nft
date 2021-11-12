import React, { useState, useEffect,useRef } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import CryptoBoyNFTDetails from "../CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import ERC1155Highlights from "../ERC1155Highlights/ERC1155Highlights";
import Loading from "../Loading/Loading";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import data from '../data.json'
import CategoryContainer from '../DropdownContainer/DropdownContainer';
import '../AllCryptoBoys/AllCryptoBoys.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import Select from "react-select";
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import { IconButton } from "@material-ui/core";
const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
    //width:"-webkit-fill-available",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
  },
 
  
}));
const AllCryptoBoysERC1155 = ({
  
  accountAddress,
  cryptoBoys,
  //allcryptoBoys,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyCryptoBoy,
  callbackFromParent,
  erc1155contract
  //cryptoBoysContract,

}) => {
  
  const [loading, setLoading] = useState(true);
  const [address,setAddress]=useState("");
  const [start,setStart]=useState(1);
  const [startState,setStartState]=useState(1);
  const [end,setEnd]=useState(cryptoBoys.length);
  const [endState,setEndState]=useState(3);
  const [showCategory,setShowCategory]=useState(false);
  const [filters,setFilters]=useState([]);
  const [categories,setCategories]=useState("");
  //const [lastPosition,setLastPosition]=useState(perPage)
 // const [allCryptoBoys,setAllCryptoBoys]=useState(cryptoBoys.slice(0,perPage));
  const [endOfDesigns,setEndOfDesigns]=useState(false);
  
  const handleCategory=selectedOption=>{
    if(selectedOption){
    console.log(selectedOption)
    setCategories(selectedOption.value);

    console.log(categories)
    //searchFilters();
    }
    else{
      setCategories("");
      window.location.reload()
    }
  }
  const options = [
    { value: "fashionDesign", label: "Fashion Design" },
    { value: "art", label: "Art" },
    { value: "photoGraph", label: "Photograph" }
  ];
 

  
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
    setEnd(cryptoBoys.length);
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
    console.log(categories)
    //var flatArray = Array.prototype.concat.apply([], categories);
    //console.log(flatArray)
    let searchedResults=[];
    cryptoBoys.filter((cryptoBoy)=>{
      // categories.some((newItem)=>{
      //   cryptoBoy[newItem.push]
      // })
      //if(cryptoBoy.metaData!=undefined){
        if(cryptoBoy.metaData.categories===categories){
          searchedResults.push(cryptoBoy);
         // setLoading(false)
        }
     
      //}
      //else{
       // setLoading(true)
      //}

      // const found = cryptoBoy.metaData.categories.some(r=> flatArray.indexOf(r) >= 0)
      // if(found){
      //   searchedResults.push(cryptoBoy);
      // }
     // console.log( cryptoBoy.metaData.categories)
     // cryptoBoy.metaData.categories.filter((obj)=>obj.includes(categories))
     
    })
    setAllDesigns(searchedResults)
    setEnd(searchedResults.length)
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

      {cryptoBoys ?(
        <>
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
          {/* <button className="mt-3 btn btn-outline-primary" onClick={()=>{setShowCategory(!showCategory)}} style={{borderRadius:"20px"}}>
                Filters
              </button> */}
              {/* {showCategory?( */}
              
              {/* <CategoryContainer data={data} onChange={onChange}  texts={{placeholder:"Category"}} />  */}
              {/* <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
        <Select
          native
          value={categories}
          onChange={(e)=>{setCategories(e.target.value)}}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"fashionDesign"}>Fashion Design</option>
          <option value={"art"}>Art</option>
          <option value={"photoGraph"}>Photograph</option>
        </Select>

      </FormControl> 
       <button className="mt-3 btn btn-outline-primary" onClick={searchFilters} style={{borderRadius:"20px",marginLeft:"4px"}}>
              Search
              </button>*/}
        {/* <Select 
              options={options}
              className="basic-single breadth"
              classNamePrefix="select"
              name="ReactSelect"
              isClearable
              isSearchable
              //onChange={(selected=>{setCategories(selected)})}
              onChange={handleCategory}
               
            
              //onChange={(e)=>{setCategories(e.target.value)}}
              /> */}
                {/* <button className="mt-3 btn btn-outline-primary" onClick={searchFilters} style={{borderRadius:"20px",marginLeft:"4px"}}>
              Search
              </button> */}
              {/* <IconButton onClick={searchFilters} >
              <PageviewOutlinedIcon style={{ fontSize: 40 }}/>
              </IconButton> */}
              
              {/* ):null} */}
              </div>      
        <div style={{display:"flex",justifyContent:"center",padding:"1.5%",height:"100%"}}>
      
        <Grid classes={gridStyles} container spacing={4} >
       
        {allDesigns.map((cryptoboy) => {
          return (
            <>
             <Grid item xs={12} sm={6} lg={4} xl={3} >
             <ERC1155Highlights
                cryptoboy={cryptoboy}
                accountAddress={accountAddress}
                changeTokenPrice={changeTokenPrice}
                toggleForSale={toggleForSale}
                buyCryptoBoy={buyCryptoBoy}
                callbackFromParent={myCallback1}
                erc1155contract={erc1155contract}
                //cryptoBoysContract={cryptoBoysContract}
                //usersContract={usersContract}
                //users={users}
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
               {allDesigns.length===end?(<> <Alert severity="success" color="info">
      You are all Caught Up
      </Alert></>):
               (
                <button onClick={handleShowMorePosts}>Load more</button>
             )}
            
             </div></>
      ):(<Loading/>)}
      
      </div>
   
  );
// console.log(cryptoBoys)

// useEffect(() => {
//   if (cryptoBoys.length === totalTokensMinted) {
//     //if (cryptoBoys[0].metaData !== undefined) {
//       setLoading(false);
//    // }
//   }
//     else {
//      setLoading(true);
//    }
  
 
// // loadDesigns(start,end)
// }, []);
// const [designList, setDesignList] = useState({
//   list: []
// });
// const [categories,setCategories]=useState([]);
// const [end,setEnd]=useState(cryptoBoys.length);
// const [loading,setLoading]=useState(true)

// // tracking on which page we currently are
// const [page, setPage] = useState(0);
// // add loader refrence 
// const loader = useRef(null);

// let postsPerPage;
// const [height, setHeight] = useState(0)
// const ref = useRef(null)
// // useEffect(()=>{
// //   setAllCreators(props.users.slice(0,5));

// // },[props.users,window.innerWidth]);
// useEffect(() => {
// if(ref.current){
// setHeight(ref.current.clientHeight)

// }

// })
// console.log(height)
// //console.log("div height",height ,"window height",window.innerHeight)
// // let perPage;
// // console.log("window width",window.innerWidth)
// if(window.innerWidth>1280 && window.innerWidth<=1920 ){

// postsPerPage=4;
// // if( height/window.innerHeight<1){

// //   postsPerPage=postsPerPage+4;
  
// // }
// }
// else if(window.innerWidth>960 && window.innerWidth<=1280){
// postsPerPage=3;
// // if( height/window.innerHeight<1){

// //   postsPerPage=postsPerPage+3;
  
// // }
// }
// else if(window.innerWidth>600 && window.innerWidth<=960){
// postsPerPage=2;
// // if( height/window.innerHeight<1){

// //   postsPerPage=postsPerPage+2;
  
// // }
// }

// else if(window.innerWidth<="600"){
// postsPerPage=1;
// // if( height/window.innerHeight<1){

// //   postsPerPage=postsPerPage+1;
  
// // }
// }
// useEffect(() => {
//    var options = {
//       root: null,
//       rootMargin: "20px",
//       threshold: 1.0
//    };
//   // initialize IntersectionObserver
//   // and attaching to Load More div
//    const observer = new IntersectionObserver(handleObserver, options);
//    if (loader.current) {
//       observer.observe(loader.current)
//    }

// }, []);


// useEffect(() => {
//   // here we simulate adding new posts to List
//   console.log("Page",page)
//   console.log("post per page",postsPerPage)
//   console.log(cryptoBoys.length)

//   const newList =  designList.list.concat(cryptoBoys.slice(page,page+postsPerPage));
//   console.log("newList",newList)
//   setDesignList({
//       list:newList
//   })
//   console.log("designList",designList.list)

// }, [page,cryptoBoys])

// // here we handle what happens when user scrolls to Load More div
// // in this case we just update page variable
// const handleObserver = (entities) => {
//   const target = entities[0];
//   if (target.isIntersecting) {   
//     console.log("before ",page)
//       setPage((page) => page + postsPerPage)
//      console.log("after",page) 
//   }
// }
// const myCallback1=(dataFromChild1)=>{
//   //console.log(dataFromChild)
//  // setAddress(dataFromChild1)
//   callbackFromParent(dataFromChild1)
//  // console.log(address)
// }

// const onChange = (currentNode, selectedNodes) => {
//   const loc=selectedNodes.map(x=>x.value)
//   console.log(loc);
//   setCategories(loc);
  
//   console.log('onChange::', currentNode, selectedNodes)
// } 

// const searchFilters=()=>{
//   console.log(categories[0])
//   var flatArray = Array.prototype.concat.apply([], categories);
//   console.log(flatArray)
//   let searchedResults=[];
//   cryptoBoys.filter((cryptoBoy)=>{
//     // categories.some((newItem)=>{
//     //   cryptoBoy[newItem.push]
//     // })
//     const found = cryptoBoy.metaData.categories.some(r=> flatArray.indexOf(r) >= 0)
//     if(found){
//       searchedResults.push(cryptoBoy);
//     }
//    // console.log( cryptoBoy.metaData.categories)
//    // cryptoBoy.metaData.categories.filter((obj)=>obj.includes(categories))
   
//   })
//   setDesignList({list:searchedResults})
//   setEnd(searchedResults.length)
//   // const filteredArray = _.cloneDeep(cryptoBoys);
//   // filteredArray.map(obj => Object.keys(obj).forEach((key) => {
//   //   if (!categories.includes(key)) {
//   //     delete obj[key];
//   //   }
//   // }))
//   // console.log(filteredArray);
//   //console.log(cryptoBoys.filter((cryptoBoy)=>cryptoBoy.metaData.categories,{categories}));
//   console.log(searchedResults)
// }

// const gridStyles = useGridStyles();
// return (<>

// {!loading&&cryptoBoys?( 

// <div style={{padding:"0.5%"}}>
// <div className="card mt-1">
//   <div className="card-body align-items-center d-flex justify-content-center">
//     <h5>
//       Total No. of Designs On The Platform :{" "}
//       {totalTokensMinted}
//     </h5>
//   </div>
// </div>
// {/* <div style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}}>
        
//               <div style={{display:"flex",alignItems:"flex-end"}}> <CategoryContainer data={data} onChange={onChange}  texts={{placeholder:"Category"}} /> 
//               <button className="mt-3 btn btn-outline-primary" onClick={searchFilters} style={{borderRadius:"20px",marginLeft:"4px"}}>
//               Search
//               </button>
//               </div>
            
//               </div>       */}
// <div  ref={ref}style={{display:"flex",justifyContent:"center",padding:"1%",height:"100%" }}>
  
//   <Grid classes={gridStyles} container spacing={4} >
 
//   {designList.list.map((cryptoboy,index) => {
//           return (
//             <>
//              <Grid item xs={12} sm={6} lg={4} xl={3} >
//              <NFTHighlights
//                 cryptoboy={cryptoboy}
//                 accountAddress={accountAddress}
//                 changeTokenPrice={changeTokenPrice}
//                 toggleForSale={toggleForSale}
//                 buyCryptoBoy={buyCryptoBoy}
//                 callbackFromParent={myCallback1}
//                 cryptoBoysContract={cryptoBoysContract}
                
//               />
//              </Grid>
//            </> 
              
               
//               )
//           })
//       }
            
     
    
    
//      </Grid>
     

// </div>

// <div className="loading" ref={loader}  style={{display:"flex",justifyContent:"center"}}>
// {designList.list.length===cryptoBoys.length?(<> <Alert severity="success" color="info">
// You are all Caught Up      </Alert></>):(<><h2>Load More</h2></>)}
    
// </div></div>):<Loading/>}</>)

 };

export default AllCryptoBoysERC1155;