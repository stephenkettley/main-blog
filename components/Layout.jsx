import { Header } from "./";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
};

export default Layout;
