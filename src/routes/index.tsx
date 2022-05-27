import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/Home";

const AppMain: React.FC<{}> = () => {
  return (
    <>
      <Suspense fallback={<span>loading</span>}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppMain;
