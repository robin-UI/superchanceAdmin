import Header from "../components/navComponents/Header";
import { Outlet } from "react-router";


function Home() {



  return (
    <>
      <Header />
      <Outlet />
      {/* <Paper component={Button}>
        <AddIcon color="primary" />
      </Paper> */}

    </>
  );
}

export default Home;
