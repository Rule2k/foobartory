import React from "react";
import styles from "./Summary.module.css";
interface Props {
  numberOfFoo: number;
  numberOfBar: number;
  numberOfFoobar: number;
  numberOfRobot: number;
}

const Summary = ({
  numberOfFoo,
  numberOfBar,
  numberOfFoobar,
  numberOfRobot,
}: Props) => {
  return (
    <>
      <div className={styles.Summary}>
        <div>Foo : {numberOfFoo}</div>
        <div>Bar : {numberOfBar}</div>
        <div>Foobar : {numberOfFoobar}</div>
        <div>Robot : {numberOfRobot}</div>
      </div>
      <div>
        <div className={styles.Rules}>
          You need <span>1 foo</span> and <span>1 bar</span> to create a foobar,
          with 60% chances of success. You need <span>3 foobar</span> and{" "}
          <span>6 foo</span> to create a single robot.
        </div>
      </div>
    </>
  );
};

export default Summary;
