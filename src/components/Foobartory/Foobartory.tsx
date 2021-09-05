import React, { useState } from "react";
import Summary from "../Summary";
enum Job {
  GettingFoo,
  GettingBar,
  AssemblingFoobar,
  AssemblingRobot,
  Idle,
}
interface Robot {
  id: number;
  job: Job;
  loading: boolean;
}

const Foobartory = () => {
  const startingRobotList = [
    { id: 1, job: Job.Idle, loading: false },
    { id: 2, job: Job.Idle, loading: false },
  ];
  const [robotList, setRobotList] =
    useState<ReadonlyArray<Robot>>(startingRobotList);
  const [numberOfFoo, setNumberOfFoo] = useState<number>(0);
  const [numberOfBar, setNumberOfBar] = useState<number>(0);
  const [numberOfFoobar, setNumberOfFoobar] = useState<number>(0);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getFoo = (id: number) => {
    setRobotList((currentRobotList) =>
      currentRobotList.map((robot) =>
        robot.id === id
          ? { ...robot, loading: true, job: Job.GettingFoo }
          : robot
      )
    );
    delay(1000).then(() => setNumberOfFoo((numberOfFoo) => numberOfFoo + 1));
    setRobotList((currentRobotList) =>
      currentRobotList.map((robot) =>
        robot.id === id ? { ...robot, loading: false } : robot
      )
    );
  };

  return (
    <div>
      {robotList.map(({ id }) => (
        <div key={id} onClick={() => getFoo(id)}>
          Robot {id}
        </div>
      ))}
      <Summary
        numberOfFoo={numberOfFoo}
        numberOfBar={numberOfBar}
        numberOfFoobar={numberOfFoobar}
        numberOfRobot={robotList.length}
      />
    </div>
  );
};

export default Foobartory;
