import { Fragment, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const Steps = () => {
  const {
    questionsCount,
    quiz: { questionIndex },
  } = useContext(QuizContext);

  return (
    <div className="m-3 flex w-fit items-center">
      {Array.from({ length: questionsCount }, (_, index) => (
        <Fragment key={index}>
          <span
            className={`box-content h-3 w-3 rounded-full border-4 border-primary/30 ${
              !(index > (questionIndex > 0 ? questionIndex - 1 : 0)) &&
              'border-primary/80 bg-primary/20'
            }`}
          />
          <hr className="w-2 border-2 border-primary/30 last:hidden" />
        </Fragment>
      ))}
    </div>
  );
};

export default Steps;
