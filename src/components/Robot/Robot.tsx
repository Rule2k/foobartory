import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        wrapperRef.current &&
        buttonRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    },
    [wrapperRef, buttonRef]
  );

  const togglePopup = () => setIsOpen((currentIsOpen) => !currentIsOpen);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  useEffect(() => {
    const interval =
      delay > 0 &&
      setInterval(() => {
        handleRobotAction(id, job);
      }, delay);

    if (interval) {
      return () => clearInterval(interval);
    }
  }, [delay]);

  const jobs = Object.values(Job);

  const robotClasses = cx(styles.Robotsvg, {
    [styles.Busy]: job !== Job.Idle && job !== Job.Switching,
    [styles.Switching]: job === Job.Switching,
    [styles.Idle]: job === Job.Idle,
  });

  return (
    <div className={styles.Robot}>
      <Robotsvg
        className={robotClasses}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.stopPropagation();
          togglePopup();
        }}
        ref={buttonRef}
      />
      <div>Current job :</div>
      <span className={styles.CurrentJob}>{job}</span>
      {isOpen && (
        <div ref={wrapperRef} className={styles.Popup}>
          {jobs.map((currentJob) => (
            <div
              key={currentJob}
              onClick={() => handleSwitchAction(id, currentJob)}
              className={cx(styles.Job, {
                [styles.Active]: job === currentJob,
              })}
            >
              {currentJob}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Robot;
