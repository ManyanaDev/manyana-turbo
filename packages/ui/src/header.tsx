import { IoMdSearch } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";

export interface HeaderProps {
  links?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export const Header = ({ links }: HeaderProps) => {
  return (
    <div className="ui-navbar ui-bg-base-100">
      <div className="ui-navbar-start">
        <div className="ui-dropdown">
          <div
            tabIndex={0}
            role="button"
            className="ui-btn ui-btn-ghost ui-btn-circle"
          >
            <HiBars3BottomLeft size={30} />
          </div>
          <ul
            tabIndex={0}
            className="ui-menu ui-menu-sm ui-dropdown-content ui-mt-3 ui-z-[1] ui-p-2 ui-shadow ui-bg-base-100 ui-rounded-box ui-w-60"
          >
            {links?.map((link) => (
              <li key={link.label}>
                <div onClick={link.onClick}>{link.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ui-navbar-center">
        <a className="ui-btn ui-btn-ghost ui-text-xl">Manyana</a>
      </div>
      <div className="ui-navbar-end">
        <button className="ui-btn ui-btn-ghost ui-btn-circle">
          <IoMdSearch size={25} />
        </button>
        <button className="ui-btn ui-btn-ghost ui-btn-circle">
          <div className="ui-indicator">
            <FaRegBell size={20} />
            <span className="ui-badge ui-badge-xs ui-badge-primary ui-indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};
