import React, { useState } from "react";
import Robot from "../Robot";
import Summary from "../Summary";
export enum Job {
  Foo = "Collecting foo",
  Bar = "Collecting bar",
  Foobar = "Building foobar",
  Robot = "Building robot",
  Switching = "Switching jobs",
  Idle = "Idle",
}
export interface RobotInterface {
  id: number;
  job: Job;
  loading: boolean;
  delay: number;
}

const Foobartory = () => {
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getDelay = (job: Job) => {
    switch (job) {
      case Job.Foo:
        return 1000;

      case Job.Bar:
        return getRandomNumber(500, 2000);

      case Job.Foobar:
        return 2000;

      case Job.Switching:
        return 5000;

      case Job.Robot:
        return 0;

      case Job.Idle:
        return 0;
    }
  };

  const startingRobotList = [
    { id: 1, job: Job.Idle, loading: false, delay: getDelay(Job.Idle) },
    { id: 2, job: Job.Idle, loading: false, delay: getDelay(Job.Idle) },
  ];
  const [robotList, setRobotList] =
    useState<ReadonlyArray<RobotInterface>>(startingRobotList);
  const [numberOfFoo, setNumberOfFoo] = useState<number>(0);
  const [numberOfBar, setNumberOfBar] = useState<number>(0);
  const [numberOfFoobar, setNumberOfFoobar] = useState<number>(0);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getAction = (job: Job) => {
    switch (job) {
      case Job.Foo:
        return setNumberOfFoo;
      case Job.Bar:
        return setNumberOfBar;
      case Job.Foobar:
        return setNumberOfFoobar;
    }
  };

  const handleRobotAction = (id: number, job: Job) => {
    if (job === Job.Idle || job === Job.Switching) {
      console.log("TODO");
    } else if (job === Job.Robot) {
      numberOfFoobar >= 3 &&
        numberOfFoo >= 6 &&
        setRobotList((currentRobotList) => [
          ...currentRobotList,
          {
            id: currentRobotList.length + 1,
            job: Job.Idle,
            loading: false,
            delay: getDelay(Job.Idle),
          },
        ]);
    } else {
      const action = getAction(job);
      setRobotList((currentRobotList) =>
        currentRobotList.map((robot) =>
          robot.id === id ? { ...robot, loading: true, job } : robot
        )
      );
      delay(getDelay(Job.Foo)).then(
        () => action && action((number: number) => number + 1)
      );
      setRobotList((currentRobotList) =>
        currentRobotList.map((robot) =>
          robot.id === id ? { ...robot, loading: true, job } : robot
        )
      );
    }
  };

  const handleSwitchAction = (id: number, job: Job) => {
    setRobotList((currentRobotList) =>
      currentRobotList.map((robot) =>
        robot.id === id
          ? { ...robot, loading: true, job: Job.Switching }
          : robot
      )
    );
    delay(getDelay(Job.Switching)).then(() =>
      setRobotList((currentRobotList) =>
        currentRobotList.map((robot) =>
          robot.id === id ? { ...robot, loading: true, job } : robot
        )
      )
    );
  };

  return (
    <div>
      {robotList.map((robot) => (
        <Robot
          {...robot}
          handleRobotAction={handleRobotAction}
          handleSwitchAction={handleSwitchAction}
          key={robot.id}
        />
      ))}
      <br />
      <br />
      <br />
      <br />
      <br />
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
