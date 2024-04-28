"user client"
import { FaBars } from "react-icons/fa";

const Header = ({ title }) => {

  return (
    <header className="header bg-primary">
      <div className="h-16 px-4 flex justify-between items-center">
        <div>
          <FaBars size={18} role="button" onClick={() => {
            document.querySelector('.dashboard')?.classList.toggle(window.innerWidth > 1024 ? 'mini' : 'mobile')
          }} className="!text-white"/>
        </div>
        <div className="flex items-center gap-x-2">
          
        </div>
      </div>
    </header>
  );
};

export default Header;
