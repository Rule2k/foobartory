import React, { useEffect } from "react";
import { Job, RobotInterface } from "../Foobartory/Foobartory";

interface Props extends RobotInterface {
  handleRobotAction: (id: number, job: Job) => void;
  handleSwitchAction: (id: number, job: Job) => void;
}

const Robot = ({
  job,
  id,
  loading,
  delay,
  handleRobotAction,
  handleSwitchAction,
}: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      job !== Job.Idle && handleRobotAction(id, job);
    }, delay);

    return () => clearInterval(interval);
  }, [job]);

  const jobs = Object.values(Job);
  console.log({ jobs });

  return (
    <div>
      <div>Robot</div>
      <div>Current job : {job}</div>
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
