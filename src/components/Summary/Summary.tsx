import React from "react";

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
    <div>
      <span>Number of Foo : {numberOfFoo}</span>
      <span>Number of Bar : {numberOfBar}</span>
      <span>Number of Foobar : {numberOfFoobar}</span>
      <span>Number of Robot : {numberOfRobot}</span>
    </div>
  );
};

export default Summary;
