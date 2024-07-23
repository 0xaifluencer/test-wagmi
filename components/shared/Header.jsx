import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="navbar header-background">
      <div className="grow">
        <Link href="/"></Link>
      </div>
      <div>
        <ConnectButton showBalance={false} />
      </div>
    </nav>
  );
};

export default Header;
