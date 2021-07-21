import React,{useState,useEffect,useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreatorHighlights from "../CreatorHighlights/CreatorHighlights"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
   // width:"-webkit-fill-available",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
    // [breakpoints.up('xs')]:{
    //   perPage:1,
    // },
    // [breakpoints.up('sm')]:{
    //   perPage:2,
    // },
    // [breakpoints.up('lg')]:{
    //   perPage:3,
    // },
    // [breakpoints.up('xl')]:{
    //   perPage:4,
    // },
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
const AllCreators=(props)=>{

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  // useEffect(() => {
  //   if (!isFetching) return;
  //   fetchMoreListItems();
  // }, [isFetching]);

  function fetchMoreListItems() {
    setTimeout(() => {
      console.log("last position",lastPosition)
      setAllCreators((prev) => [...prev,...props.users.slice(lastPosition,lastPosition+3)]);
      setIsFetching(false);
    }, 2000);
  }
  function handleScroll() {
    console.log(window.innerHeight,document.documentElement.scrollTop,document.documentElement.offsetHeight)
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    console.log('Fetch more list items!');
    fetchMoreListItems();
    setIsFetching(true);
    
  }
  const [height, setHeight] = useState(0)
  const ref = useRef(null)
  useEffect(()=>{
    setAllCreators(props.users.slice(0,perPage));

  },[props.users,window.innerWidth]);
  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })
  console.log("div height",height ,"window height",window.innerHeight)
  let perPage;
  console.log("window width",window.innerWidth)
  if(window.innerWidth>1280 && window.innerWidth<=1920 ){
    
    perPage=4;
    if( height/window.innerHeight<1){
    
      perPage=perPage+4;
      
    }
  }
  else if(window.innerWidth>960 && window.innerWidth<=1280){
    perPage=3;
    if( height/window.innerHeight<1){
    
      perPage=perPage+3;
      
    }
  }
  else if(window.innerWidth>600 && window.innerWidth<=960){
    perPage=2;
    if( height/window.innerHeight<1){
    
      perPage=perPage+2;
      
    }
  }
 
  else if(window.innerWidth<="600"){
    perPage=1;
    if( height/window.innerHeight<1){
    
      perPage=perPage+1;
      
    }
  }
  console.log(window.innerHeight/height)
  
  console.log(perPage)
  const [allCreators, setAllCreators] = useState(props.users.slice(0,perPage));
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastPosition, setLastPosition] = useState(perPage);
  
  
  //console.log(props.users.slice(0,perPage))
  

  const loadProducts =() => {
    if(allCreators.length==props.users.length){
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      console.log("set timeout")
      console.log("last Position",lastPosition)
       setAllCreators((prev) => [...prev,...props.users.slice(lastPosition,lastPosition+perPage)]);
      
    }, 2000);

    setLastPosition(lastPosition + perPage);
  };

  console.log("allCreators",allCreators);
  //  console.log(props.users)
    const gridStyles = useGridStyles();
    return(
      <>
      {props.users?( 
      <InfiniteScroll
      dataLength={allCreators.length}
      next={loadProducts}
      hasMore={hasMore}
      loader={ <p style={{ textAlign: 'center' }}>
      <b>Loading....</b>
    </p>    }
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>     
      }
     // height={window.InnerHeight}
    >
        <div style={{padding:"0.5%"}}>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>
             Creators    
            </h5>
          </div>
        </div>
        <div  ref={ref} style={{display:"flex",justifyContent:"center",padding:"1%" }}>
        <Grid classes={gridStyles} container spacing={4} >
       
             {allCreators.map((user)=>{
                return(
                    <> 
                     <Grid  item xs={12} sm={6} lg={4} xl={3} >
                    <CreatorHighlights user={user}/>
                    </Grid>
                    </>
                );
             })}
             
             </Grid>
             </div>
           
</div>
 </InfiniteScroll>
 )
 :(<>Loading</>)}
     
 </>
    );
}
export default AllCreators;