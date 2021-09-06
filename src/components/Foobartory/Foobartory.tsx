import React, { useState } from "react";
import { delay, getRandomNumber } from "../../utils/utils";
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

export interface SummaryInterface {
  foo: number;
  bar: number;
  foobar: number;
}

const Foobartory = () => {
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
  const startingSummary = {
    foo: 0,
    bar: 0,
    foobar: 0,
  };

  const [robotList, setRobotList] =
    useState<ReadonlyArray<RobotInterface>>(startingRobotList);
  const [summaryList, setSummaryList] =
    useState<SummaryInterface>(startingSummary);
  const { foo, bar, foobar } = summaryList;

  const handleRobotAction = (id: number, job: Job) => {
    switch (job) {
      case Job.Bar:
        delay(getDelay(job)).then(() =>
          setSummaryList((summary) => ({
            ...summary,
            bar: summary.bar + 1,
          }))
        );
        // we need to reset the delay with a new value for the collectingBar action,
        // otherwise the value will never get updated since the useEffect of Robot will always use the initial value
        setRobotList((currentRobotList) =>
          currentRobotList.map((robot) =>
            robot.id === id
              ? {
                  ...robot,
                  delay: getDelay(job),
                }
              : robot
          )
        );
        break;
      case Job.Foo:
        delay(getDelay(job)).then(() =>
          setSummaryList((summary) => ({
            ...summary,
            foo: summary.foo + 1,
          }))
        );
        break;
      case Job.Foobar:
        const random = getRandomNumber(1, 100);
        if (random <= 60) {
          delay(getDelay(job)).then(() =>
            setSummaryList((summary) => {
              if (summary.foo >= 1 && summary.bar >= 1) {
                return {
                  foo: summary.foo - 1,
                  bar: summary.bar - 1,
                  foobar: summary.foobar + 1,
                };
              } else {
                return {
                  ...summary,
                };
              }
            })
          );
        } else {
          setSummaryList((summary) => {
            if (summary.foo >= 1 && summary.bar >= 1) {
              return {
                ...summary,
                foo: summary.foo - 1,
              };
            } else {
              return {
                ...summary,
              };
            }
          });
        }
        break;
    }
  };

  const handleCreateNewRobot = () => {
    if (foobar >= 3 && foo >= 6) {
      setRobotList((currentRobotList) => [
        ...currentRobotList,
        {
          id: currentRobotList.length + 1,
          job: Job.Idle,
          delay: getDelay(Job.Idle),
        },
      ]);
      setSummaryList((summary) => ({
        ...summary,
        foobar: summary.foobar - 3,
        foo: summary.foo - 6,
      }));
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
      <div className={styles.Title}>Foobartory</div>
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
      <button onClick={handleCreateNewRobot} disabled={foobar < 3 || foo < 6}>
        Create a new robot
      </button>
      <Summary
        numberOfFoo={foo}
        numberOfBar={bar}
        numberOfFoobar={foobar}
        numberOfRobot={robotList.length}
      />
    </div>
  );
};

export default Foobartory;
