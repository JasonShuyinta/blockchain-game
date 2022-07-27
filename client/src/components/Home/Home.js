import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import AccountLessHome from "./AccountLessHome";
import MonsterSelection from "./MonsterSelection";
import UserCreation from "./UserCreation";
import Homepage from "./Homepage";

export default function Home() {
  const { currentAccount, userHasMonsters, user } = useContext(DataContext);

  return (
    <div>
      {currentAccount ? (
        <>
          {user.username ? (
            <>{userHasMonsters ? <Homepage /> : <MonsterSelection />}</>
          ) : (
            <UserCreation />
          )}
        </>
      ) : (
        <AccountLessHome />
      )}
    </div>
  );
}
