import React, { useState, useEffect,useRef } from "react";
import NFTHighlights from "../NFTHighlights/NFTHighlights";
import Loading from "../Loading/Loading";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import 'react-dropdown-tree-select/dist/styles.css';
import './AllCryptoBoys.css'
import Select from "react-select";
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import { IconButton } from "@material-ui/core";
const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
  },
 
  
}));
const AllCryptoBoys = ({
  
  accountAddress,
  cryptoBoys,
  totalTokensMinted,
  callbackFromParent,

}) => {
  console.log(cryptoBoys)
  
  const [end,setEnd]=useState(cryptoBoys.length);
  const [categories,setCategories]=useState("");
  
  
  //view selected categories in search field
  const handleCategory=selectedOption=>{
    if(selectedOption){
    console.log(selectedOption)
    setCategories(selectedOption.value);

    console.log(categories)
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
 

  
 
  const myCallback1=(dataFromChild1)=>{

    callbackFromParent(dataFromChild1)

  }

  if(window.innerWidth>1280 && window.innerWidth<=1920 ){
    
    postsPerPage=4;
  }
  else if(window.innerWidth>960 && window.innerWidth<=1280){
    postsPerPage=3;
  }
  else if(window.innerWidth>600 && window.innerWidth<=960){
    postsPerPage=2;
  }
 
  else if(window.innerWidth<="600"){
    postsPerPage=1;
  }
  let postsPerPage;
  let arrayForHoldingPosts = [];
   const [allDesigns,setAllDesigns]=useState([]);
   const [creatorList, setCreatorList] = useState({
    list: []
});
   const [next,setNext]=useState(postsPerPage);
   // tracking on which page we currently are
   const [page, setPage] = useState(0);
   // add loader refrence 
   const loader = useRef(null);
   const [height, setHeight] = useState(0)
   const ref = useRef(null)

   const loopWithSlice = (start, end) => {
   // const slicedPosts = props.users.slice(start, end);
    // arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setAllDesigns((prev)=>[...prev,...cryptoBoys.slice(start,end)]);
  };
  // useEffect(() => {
  //   loopWithSlice(0, postsPerPage);
  // }, []);
  useEffect(()=>{
    //setAllDesigns(cryptoBoys.slice(0,postsPerPage))
    setAllDesigns(cryptoBoys);
    setEnd(cryptoBoys.length);
  },[cryptoBoys])

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  
  
  useEffect(() => {
    if(ref.current){
    setHeight(ref.current.clientHeight)
    
    }

  })
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
        setPage((page) => page + postsPerPage)
        
    }
    }
  useEffect(() => {
    var options = {
       root: null,
       rootMargin: "20px",
       threshold: 1.0
    };
   // initialize IntersectionObserver
   // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
       observer.observe(loader.current)
    }

}, []);

useEffect(() => {
// here we simulate adding new posts to List
const newList = creatorList.list.concat(cryptoBoys.slice(page,page+postsPerPage));
setCreatorList({
    list: newList
})
console.log("length:",creatorList.list.length)
}, [page,cryptoBoys])

   const gridStyles = useGridStyles();
  
   const onChange = (currentNode, selectedNodes) => {
    const loc=selectedNodes.map(x=>x.value)
    console.log(loc);
    setCategories(loc);
    
    console.log('onChange::', currentNode, selectedNodes)
  } 

  const searchFilters=()=>{
    console.log(categories)
    let searchedResults=[];
    cryptoBoys.filter((cryptoBoy)=>{
      
        if(cryptoBoy[0].metadata.categories===categories){
          searchedResults.push(cryptoBoy);
        
        }
    })
    setAllDesigns(searchedResults)
    setEnd(searchedResults.length)
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

      {cryptoBoys.length!=0 ?(
        <>
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
       
        <Select 
              options={options}
              className="basic-single breadth"
              classNamePrefix="select"
              name="ReactSelect"
              isClearable
              isSearchable
              onChange={handleCategory}
              />
              
              <IconButton onClick={searchFilters} >
              <PageviewOutlinedIcon style={{ fontSize: 40 }}/>
              </IconButton>
              
              
              </div>      
        <div ref={ref} style={{display:"flex",justifyContent:"center",padding:"1.5%",height:"100%"}}>
      
        <Grid classes={gridStyles} container spacing={4} >
       
        {allDesigns.map((cryptoboy) => {
          return (
            <>
             <Grid item xs={12} sm={6} lg={4} xl={3} >
             <NFTHighlights
                cryptoboy={cryptoboy}
                accountAddress={accountAddress}
                callbackFromParent={myCallback1}
              />
             </Grid>
           </>   
          );
        })}
        </Grid>
             </div>
             <div style={{display:"flex",justifyContent:"center"}}>
               {allDesigns.length===end?(<> <Alert severity="success" color="info">
      You are all Caught Up
      </Alert></>):
               (
                // <button onClick={handleShowMorePosts}>Load more</button>
                <></>
             )}
            
             </div>
              {/* <div className="loading" ref={loader}  style={{display:"flex",justifyContent:"center"}}>
    {creatorList.list.length===cryptoBoys.length?(<> <Alert severity="success" color="info">
      You are all Caught Up      </Alert></>):(<><h2>Load More</h2></>)}
          
 </div> */}
             </>
      ):(<Loading/>)}
      
      </div>
   
  );

 };

export default AllCryptoBoys;