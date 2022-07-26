import React from "react";

export default function Spinner() {
  return (
    <div className="spinner">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3>Please Wait</h3>
    </div>
  );
}
