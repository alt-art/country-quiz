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
            className={`box-content h-3 w-3 rounded-full border-4 border-primary/30 ${
              !(index > position) && 'border-primary/80 bg-primary/20'
            }`}
          />
          <hr className="w-2 border-2 border-primary/30 last:hidden" />
        </Fragment>
      ))}
    </div>
  );
};

export default Steps;
