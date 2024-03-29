import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from '../components/Spinner';
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals) || {};

  useEffect(() => {
    console.log("Effect triggered");
    if (isError) {
      console.log("Error:", message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());

    return () => {
      console.log("Cleanup");
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  console.log("Rendering Dashboard", { goals, isLoading, isError, message });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        
        {goals && goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
              
            ))}
            {console.log("Get Items")}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
