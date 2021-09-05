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
      <div>Number of Foo : {numberOfFoo}</div>
      <div>Number of Bar : {numberOfBar}</div>
      <div>Number of Foobar : {numberOfFoobar}</div>
      <div>Number of Robot : {numberOfRobot}</div>
    </div>
  );
};

export default Summary;
