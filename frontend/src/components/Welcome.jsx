import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import robot from "../assets/lottie/lf30_editor_jzgsf6l1.json";
export default function Welcome({ currentUser }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: robot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container>
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        height={200}
        width={200}
      />
      <h1>
        Welcome
        <span>
          {currentUser.username === undefined
            ? "Loading"
            : "\n" + currentUser.username}
        </span>
      </h1>
      <h3>Please Select A Chat To Start Message</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  h1 {
    margin-top: 2rem;
  }
  span {
    color: #4e0eff;
  }
`;
