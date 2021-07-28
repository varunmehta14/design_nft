import React,{useState,useEffect,useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreatorHighlights from "../CreatorHighlights/CreatorHighlights"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
    //width:"100vh",
   
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

  // function fetchMoreListItems() {
  //   setTimeout(() => {
  //     console.log("last position",lastPosition)
  //     setAllCreators((prev) => [...prev,...props.users.slice(lastPosition,lastPosition+3)]);
  //     setIsFetching(false);
  //   }, 2000);
  // }
  // function handleScroll() {
  //   console.log(window.innerHeight,document.documentElement.scrollTop,document.documentElement.offsetHeight)
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
  //   console.log('Fetch more list items!');
  //  // fetchMoreListItems();
  //  // setIsFetching(true);
    
  // }
  // useEffect(() => {
  //   const loadUsers = async () => {
  //     setLoading(true);
     
  //     setAllCreators((prev) => [...prev, ...props.users.slice(lastPosition,lastPosition+2)]);
  //     setLoading(false);
  //   };

  //   loadUsers();
  // }, [lastPosition]);
  // const handleScroll = (event) => {
  //   const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
  // console.log("Scroll top",scrollTop);
  // console.log("clientHeight" ,clientHeight);
  // console.log("scrollHeight",scrollHeight);
  //   if (scrollHeight - scrollTop === clientHeight) {
  //     setLastPosition(prev => prev + 1);
  //   }
  // };


  const [height, setHeight] = useState(0)
  const ref = useRef(null)
  // useEffect(()=>{
  //   setAllCreators(props.users.slice(0,5));

  // },[props.users,window.innerWidth]);
  useEffect(() => {
    if(ref.current){
    setHeight(ref.current.clientHeight)
    }
  })
  //console.log("div height",height ,"window height",window.innerHeight)
  // let perPage;
  // console.log("window width",window.innerWidth)
  if(window.innerWidth>1280 && window.innerWidth<=1920 ){
    
    postsPerPage=4;
    if( height/window.innerHeight<1){
    
      postsPerPage=postsPerPage+4;
      
    }
  }
  else if(window.innerWidth>960 && window.innerWidth<=1280){
    postsPerPage=3;
    if( height/window.innerHeight<1){
    
      postsPerPage=postsPerPage+3;
      
    }
  }
  else if(window.innerWidth>600 && window.innerWidth<=960){
    postsPerPage=2;
    if( height/window.innerHeight<1){
    
      postsPerPage=postsPerPage+2;
      
    }
  }
 
  else if(window.innerWidth<="600"){
    postsPerPage=1;
    if( height/window.innerHeight<1){
    
      postsPerPage=postsPerPage+1;
      
    }
  }
  // console.log(window.innerHeight/height)
  
  // console.log(perPage)
  // const [allCreators, setAllCreators] = useState(props.users.slice(0,1));
  // const [isFetching, setIsFetching] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const [lastPosition, setLastPosition] = useState(postsPerPage+1);
  // const [loading,setLoading]=useState(true);
  
  // const page=1;
  
  //console.log(props.users.slice(0,perPage))
  

  // const loadProducts =() => {
  //   if(allCreators.length==props.allusers.length){
  //     setHasMore(false);
  //     return;
  //   }
  //   setTimeout(() => {
  //     console.log("set timeout")
  //     console.log("last Position",lastPosition)
  //      setAllCreators((prev) => [...prev,...props.allusers.slice(lastPosition,lastPosition+postsPerPage)]);
      
  //   }, 2000);

  //   setLastPosition(lastPosition +postsPerPage);
  // };
 
  let postsPerPage;
  let arrayForHoldingPosts = [];
   const [allCreators,setAllCreators]=useState([]);
   const [next,setNext]=useState(postsPerPage);

   const loopWithSlice = (start, end) => {
   // const slicedPosts = props.users.slice(start, end);
    // arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setAllCreators((prev)=>[...prev,...props.allusers.slice(start,end)]);
  };
  // useEffect(() => {
  //   loopWithSlice(0, postsPerPage);
  // }, []);
  useEffect(()=>{
    setAllCreators(props.allusers.slice(0,postsPerPage))
  },[props.allusers])

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  console.log("allCreators",allCreators);
  //console.log("allusers",users);
  //  console.log(props.users)
    const gridStyles = useGridStyles();
    return(
      <>
      {props.allusers?( 
     
        <div style={{padding:"0.5%"}}>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>
             Creators    
            </h5>
          </div>
        </div>
        {/* <InfiniteScroll
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
     
    > */}
        <div  ref={ref} style={{display:"flex",justifyContent:"center",padding:"1%",height:"100%" }}>
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
             <div style={{display:"flex",justifyContent:"center"}}>
               {allCreators.length===props.allusers.length?(<> <Alert severity="success" color="info">
      You are all Caught Up
      </Alert></>):
               (
                <button onClick={handleShowMorePosts}>Load more</button>
             )}
            
             </div>
             {/* </InfiniteScroll> */}
           
</div>

 )
 :(<>Loading</>)}
     
 </>
    );
}
export default AllCreators;