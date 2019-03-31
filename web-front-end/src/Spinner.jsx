import React from "react";

const Spinner = () => {
  return (
    < >
      <div className="d-flex justify-content-center align-items-center" style={{minWidth:"100vw", minHeight: "90vh", maxHeight: "100vh", maxWidth: "100vw"}}>
        <div className="spinner-grow text-light d-flex justify-content-center align-items-center" style={{minWidth:"100px", minHeight: "100px"}} role="status">
          <div className="spinner-grow text-danger d-flex justify-content-center align-items-center" style={{minWidth:"80px", minHeight: "80px"}} role="status"></div>
          <div className="text-success d-flex justify-content-center align-items-center" style={{minWidth:"80px", minHeight: "80px"}} role="status">
          <i class="fas fa-play text-success ml-2" style={{fontSize: "38px"}}></i>
          </div>
          <div className="spinner-grow text-warning d-flex justify-content-center align-items-center" style={{minWidth:"80px", minHeight: "80px"}} role="status"></div>
        </div>
      </div>
    </>
  );
}

export default Spinner;