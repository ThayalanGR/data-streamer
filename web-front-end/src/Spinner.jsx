import React from "react";

const Spinner = props => {
  console.log(props);
  let isSmall = props.size.size === "small" ? false : true;
  console.log(isSmall)
  return isSmall ? (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minWidth: "100vw",
          minHeight: "90vh",
          maxHeight: "100vh",
          maxWidth: "100vw"
        }}
      >
        <div
          className="spinner-grow text-light d-flex justify-content-center align-items-center"
          style={{ minWidth: "100px", minHeight: "100px" }}
          role="status"
        >
          <div
            className="text-success d-flex justify-content-center align-items-center"
            style={{ minWidth: "80px", minHeight: "80px" }}
            role="status"
          >
            <i
              className="fas fa-play text-success ml-2"
              style={{ fontSize: "38px" }}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
     <div
        className="text-center"
      >
        <div
          className="spinner-grow text-light d-flex justify-content-center align-items-center"
          style={{ minWidth: "100px", minHeight: "100px" }}
          role="status"
        >
          <div
            className="text-success d-flex justify-content-center align-items-center"
            style={{ minWidth: "80px", minHeight: "80px" }}
            role="status"
          >
            <i
              className="fas fa-play text-success ml-2"
              style={{ fontSize: "38px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
