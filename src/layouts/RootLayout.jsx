import Navbar from "../components/Navbar";


const RootLayout = ({children, headerText}) => {
  return (
    <div>
        <Navbar/>
        <h1>{headerText}</h1>
        <div>{children}</div>
        
    </div>
  );
};

export default RootLayout;