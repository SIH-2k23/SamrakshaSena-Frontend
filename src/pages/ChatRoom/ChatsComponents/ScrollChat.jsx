import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../../context/ChatProvider'
import { isLastMessage , isSameSender , isSameSenderMargin , isSameUser} from '../../../config/ChatLogic';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollChat = ({messages}) => {

  //console.log(messages);  
  const {CurrentUser} = ChatState();
  const user = CurrentUser;
  //console.log(CurrentUser);
    
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.AgencyName} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.AgencyName}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollChat
