import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
export default function Chat() {
  const [contacts, setContacts] = useState();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const getContacts = async (userCurrent) => {
    if (userCurrent) {
      if (userCurrent.isAvatarImageSet) {
        const data = await axios.get(`${allUserRoute}/${userCurrent._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getContacts(currentUser);
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts === undefined ? "Loading" : contacts}
          currentuser={currentUser === undefined ? "Loading" : currentUser}
          chatChange={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome
            currentUser={currentUser === undefined ? "Loading" : currentUser}
          />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
