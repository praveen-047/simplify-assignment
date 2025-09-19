import { useState, useEffect } from "react";
import axios from "axios";                                  //we use axios to fetch the data
import UserCard from "./component/UserCard.js";
import "./App.css";

function App() {
  const [userDetails, setUserDetails] = useState([]);      //userDetails state is used to store the user data
  const [loading, setLoading] = useState(true);            //loading state is used to keep track of loading status

  useEffect(() => {                                        //useEffect is used to fetch the data from api when component is first rendered
    const getUserDate = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUserDetails(response.data);
      } catch (e) {
        console.log("error fetching users:", e);
      } finally {
        setLoading(false);
      }
    };
    getUserDate();
  }, []);                                                   //empty dependency []--> prevents unnecessary re-fetching on every render 

  return (
    <div className="app-container">
      {loading ? (
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      ) : (
        userDetails.map((user) => <UserCard key={user.id} details={user} />)  //.map() is used to pass the earc user details to UserCard component
      )}
    </div>
  );
}

export default App;
