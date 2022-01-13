import React from 'react';

export interface IDummyProps {
  text: string;
  text2: string;
}
const Dummy = (props: IDummyProps) => {
  return (
    <div>
      <h3>{props.text}</h3>
      <h2>{props.text2}</h2>
    </div>
  );
};

export default Dummy;
