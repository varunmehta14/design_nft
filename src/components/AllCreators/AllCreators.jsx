import React from "react";
import CreatorHighlights from "../CreatorHighlights/CreatorHighlights"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
  
    width:"-webkit-fill-available",
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
const AllCreators=(props)=>{
    console.log(props.users)
    const gridStyles = useGridStyles();
    return(
        <div style={{padding:"0.5%"}}>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>
             Creators
              
            </h5>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:"1%"}}>
        <Grid classes={gridStyles} container spacing={4} >
       
             {props.users.map((user)=>{
                return(
                    <> 
                     <Grid item xs={4}>
                    <CreatorHighlights user={user}/>
                    </Grid>
                    </>
                );
             })}
             
             </Grid>
             </div>
</div>
    );
}
export default AllCreators;