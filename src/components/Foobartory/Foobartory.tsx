import React, { useState } from "react";
import Robot from "../Robot";
import Summary from "../Summary";
import styles from "./Foobartory.module.css";

export enum Job {
  Foo = "Collecting foo",
  Bar = "Collecting bar",
  Foobar = "Building foobar",
  Switching = "Switching jobs",
  Idle = "Idle",
}
export interface RobotInterface {
  id: number;
  job: Job;
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

      case Job.Idle:
        return 0;
    }
  };

  const startingRobotList = [
    { id: 1, job: Job.Idle, delay: getDelay(Job.Idle) },
    { id: 2, job: Job.Idle, delay: getDelay(Job.Idle) },
  ];
  const [robotList, setRobotList] =
    useState<ReadonlyArray<RobotInterface>>(startingRobotList);
  const [numberOfFoo, setNumberOfFoo] = useState<number>(0);
  const [numberOfBar, setNumberOfBar] = useState<number>(0);
  const [numberOfFoobar, setNumberOfFoobar] = useState<number>(0);
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getSimplesActions = (job: Job) => {
    switch (job) {
      case Job.Foo:
        return setNumberOfFoo;
      case Job.Bar:
        return setNumberOfBar;
      case Job.Foobar:
        return setNumberOfFoobar;
    }
  };

  const handleSimpleActions = (job: Job, id: number) => {
    const action = getSimplesActions(job);
    delay(getDelay(job)).then(
      () => action && action((number: number) => number + 1)
    );
    setRobotList((currentRobotList) =>
      currentRobotList.map((robot) =>
        robot.id === id ? { ...robot, job, delay: getDelay(job) } : robot
      )
    );
  };

  const handleRobotAction = (id: number, job: Job) => {
    switch (job) {
      case Job.Bar:
        handleSimpleActions(job, id);
        break;
      case Job.Foo:
        handleSimpleActions(job, id);
        break;
      case Job.Foobar:
        if (numberOfBar >= 1 && numberOfFoo >= 1) {
          const random = getRandomNumber(1, 100);
          if (random <= 60) {
            handleSimpleActions(job, id);
            setNumberOfBar((currentNumberofBar) => currentNumberofBar - 1);
            setNumberOfFoo((currentNumberOfFoo) => currentNumberOfFoo - 1);
          } else {
            setNumberOfFoo((currentNumberOfFoo) => currentNumberOfFoo - 1);
          }
        }
        break;
    }
  };

  const handleCreateNewRobot = () => {
    if (numberOfFoobar >= 3 && numberOfFoo >= 6) {
      setRobotList((currentRobotList) => [
        ...currentRobotList,
        {
          id: currentRobotList.length + 1,
          job: Job.Idle,
          delay: getDelay(Job.Idle),
        },
      ]);
      setNumberOfFoobar((currentNumberOfFoobar) => currentNumberOfFoobar - 3);
      setNumberOfFoo((currentNumberOfFoo) => currentNumberOfFoo - 6);
    }
  };

  const handleSwitchAction = (id: number, job: Job) => {
    setRobotList((currentRobotList) =>
      currentRobotList.map((robot) =>
        robot.id === id
          ? {
              ...robot,
              job: Job.Switching,
              delay: getDelay(Job.Switching),
            }
          : robot
      )
    );
    delay(getDelay(Job.Switching)).then(() =>
      setRobotList((currentRobotList) =>
        currentRobotList.map((robot) =>
          robot.id === id ? { ...robot, job, delay: getDelay(job) } : robot
        )
      )
    );
  };

  return (
    <div className={styles.Foobartory}>
      <div className={styles.Robots}>
        {robotList.map((robot) => (
          <Robot
            {...robot}
            handleRobotAction={handleRobotAction}
            handleSwitchAction={handleSwitchAction}
            key={robot.id}
          />
        ))}
      </div>
      <button
        onClick={handleCreateNewRobot}
        disabled={numberOfFoobar < 3 || numberOfFoo < 6}
      >
        Create a new robot
      </button>
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
