const ACTION = ' ';

export const typoedWordsMiddleware = ({ dispatch }) => {
  return next => {
    return action => {
      if (action.type === ACTION) {
        const foundWord = [];

        if (foundWord.length) {
          return dispatch({ type: 'FOUND_TYPO' });
        }
      }

      return next(action);
    };
  };
};
