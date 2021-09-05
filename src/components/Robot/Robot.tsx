import React, { useEffect } from "react";
import { Job, RobotInterface } from "../Foobartory/Foobartory";

interface Props extends RobotInterface {
  handleRobotAction: (id: number, job: Job) => void;
}

const Robot = ({ job, id, loading, delay, handleRobotAction }: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      handleRobotAction(id, job);
    }, delay);

    return () => clearInterval(interval);
  }, [job]);
  return (
    <div>
      <div>Robot</div>
      <div>Current job : {job}</div>
    </div>
  );
};

export default Robot;
