import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { TbSend } from "react-icons/tb";
import { BsEmojiSmileFill } from "react-icons/bs";
export default function ChatInput() {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setEmojiPicker(!emojiPicker);
  };
  return (
    <Container>
      <div className="button-containe">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {emojiPicker && <Picker />}
        </div>
      </div>
      <form className="input-container">
        <input type="text" name="" placeholder="Type Your Message Here" id="" />
        <button>
          <TbSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
  }
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
  }
  .input-container {
    width: 100%;
    background-color: transparent;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    justify-content: space-between;
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
