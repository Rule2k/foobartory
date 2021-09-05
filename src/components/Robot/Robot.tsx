import React, { useEffect } from "react";
import { Job, RobotInterface } from "../Foobartory/Foobartory";
import Robotsvg from "./Robotsvg";
import styles from "./Robot.module.css";
import cx from "classnames";
interface Props extends RobotInterface {
  handleRobotAction: (id: number, job: Job) => void;
  handleSwitchAction: (id: number, job: Job) => void;
}

const Robot = ({
  job,
  id,
  delay,
  handleRobotAction,
  handleSwitchAction,
}: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      delay > 0 && handleRobotAction(id, job);
    }, delay);

    return () => clearInterval(interval);
  }, [job]);

  const jobs = Object.values(Job);

  const robotClasses = cx(styles.Robotsvg, {
    [styles.Busy]: job !== Job.Idle && job !== Job.Switching,
    [styles.Switching]: job === Job.Switching,
    [styles.Idle]: job === Job.Idle,
  });

  return (
    <div>
      <Robotsvg className={robotClasses} />
      <div>{`Current job : ${job}`}</div>
      {jobs.map((job) => (
        <div key={job} onClick={() => handleSwitchAction(id, job)}>
          {job}
        </div>
      ))}
      <br />
      {}
    </div>
  );
};

export default Robot;
