const Header = ({children}) => {
  return (
    <header className="flex text-white items-stretch justify-end gap-4 p-4">
      {children}
    </header>
  );
}

export default Header;
