import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center p-9 border-b-2 border-primaryGrey-100">
      <Link to="/">
        <img src="/images/logo.png" alt="company logo" />
      </Link>
    </header>
  );
}
