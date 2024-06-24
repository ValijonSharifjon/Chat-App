import Conversation from "./Conversation.tsx";
import useGetConversations from "../../hooks/useGetConversations.ts";
import {getRandomEmoji} from "../../utils/emojis.ts";


const Conversations = () => {
    const {loading, conversations} = useGetConversations()
    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((conversation: any, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversation.length - 1}
                />
            ))}
            {loading ? <span className="loading loading-spinner mx-auto"></span> : null }
        </div>
    );
};

export default Conversations;