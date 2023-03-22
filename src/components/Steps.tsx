import { Fragment } from 'react';

interface StepProps {
  quantity: number;
  position: number;
}

const Steps = ({ quantity, position }: StepProps) => {
  return (
    <div className="m-3 flex w-fit items-center">
      {Array.from({ length: quantity }, (_, index) => (
        <Fragment key={index}>
          <span
            className={`box-border h-4 w-4 rounded-full border-4 border-primary/50 ${
              !(index > position) && 'bg-primary/40'
            }`}
          />
          <hr className="w-2 border-2 border-primary/50 last:hidden" />
        </Fragment>
      ))}
    </div>
  );
};

export default Steps;
