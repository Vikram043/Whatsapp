import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api';

//components
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBox = () => {
    const { person } = useContext(UserContext);
    const { account } = useContext(AccountContext);

    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const fetchConversationDetails = async () => {
            try {
                const data = await getConversation({ senderId: account.sub, receiverId: person.sub });
                setConversation(data);
            } catch (error) {
                console.error("Error fetching conversation details:", error);
            }
        };

        fetchConversationDetails();
    }, [account.sub, person.sub]);

    return (
        <Box style={{ height: '75%' }}>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} />
        </Box>
    );
};

export default ChatBox;
