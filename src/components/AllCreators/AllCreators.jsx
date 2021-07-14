import React from "react";
import CreatorHighlights from "../CreatorHighlights/CreatorHighlights"
const AllCreators=(props)=>{
    console.log(props.users)
    return(
        <div style={{padding:"0.5%"}}>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>
             Creators
              
            </h5>
          </div>
        </div>
        <div>
             {props.users.map((user)=>{
                return(
                    <>
                    <CreatorHighlights user={user}/>
                    </>
                );
             })}
        </div>
</div>
    );
}
export default AllCreators;