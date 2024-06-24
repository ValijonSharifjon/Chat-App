import SearchInput from "./SearchInput.tsx";
import Conversations from "./Conversations.tsx";
import LogoutButton from "./LogoutButton.tsx";


const Sidebar = () => {
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <SearchInput/>
            <div className="divider px-3"></div>
            <Conversations/>
            <LogoutButton/>
        </div>
    );
};

export default Sidebar;