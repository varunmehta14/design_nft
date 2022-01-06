import React, { useEffect, useState, useRef  } from 'react';
import CreatorHighlights from "../CreatorHighlights/CreatorHighlights"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Loading from "../Loading/Loading"

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
    minHeight:"100vh",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
  },
  
  
 }));

const AllCreators = (props) => {
  console.log(props.allusers)
    const [creatorList, setCreatorList] = useState({
        list: []
    });
    
    // tracking on which page we currently are
    const [page, setPage] = useState(0);
    // add loader refrence 
    const loader = useRef(null);

    let postsPerPage;
    const [height, setHeight] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
      if(ref.current){
      setHeight(ref.current.clientHeight)
      
      }

    })
    console.log(height)
    
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
        const newList = creatorList.list.concat(props.allusers.slice(page,page+postsPerPage));
        setCreatorList({
            list: newList
        })
        console.log(creatorList.list.length)
    }, [page,props.allusers])

    // here we handle what happens when user scrolls to Load More div
   // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + postsPerPage)
            
        }
    }

    const gridStyles = useGridStyles();
    return (<>
    
    {props.allusers?( 
     
             <div style={{padding:"0.5%"}}>
             <div className="card mt-1">
               <div className="card-body align-items-center d-flex justify-content-center">
                 <h5>
                  Creators    
                 </h5>
               </div>
             </div>
    <div  ref={ref}style={{display:"flex",justifyContent:"center",padding:"1%",height:"100%" }}>
        
        <Grid classes={gridStyles} container spacing={4} >
       
                      {
                creatorList.list.map((user, index) => {
                  
                    return (

                  <>
                 
                      <Grid  item xs={12} sm={6} lg={4} xl={3} >
                     <CreatorHighlights user={user} designs={props.cryptoBoys}/>
                     </Grid>
                     </>
                    
                     
                    )
                })
            }
                  
           
          
          
           </Grid>
           
      
    </div>
    
    <div className="loading" ref={loader}  style={{display:"flex",justifyContent:"center"}}>
    {creatorList.list.length===props.allusers.length?(<> <Alert severity="success" color="info">
      You are all Caught Up      </Alert></>):(<><h2>Load More</h2></>)}
          
 </div></div>):<Loading/>}</>)
}

export default AllCreators;