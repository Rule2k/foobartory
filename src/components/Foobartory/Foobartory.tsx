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
}

const Foobartory = () => {
  const startingRobotList = [
    { id: 1, job: Job.Idle },
    { id: 2, job: Job.Idle },
  ];
  const [robotList, setRobotList] =
    useState<ReadonlyArray<Robot>>(startingRobotList);
  const [numberOfFoo, setNumberOfFoo] = useState<number>(0);
  const [numberOfBar, setNumberOfBar] = useState<number>(0);
  const [numberOfFoobar, setNumberOfFoobar] = useState<number>(0);

  return (
    <div>
      {robotList.map(({ id }) => (
        <div key={id}>Robot {id}</div>
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
