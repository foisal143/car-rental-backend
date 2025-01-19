import { ZodError } from 'zod';

const zodError = (error: ZodError) => {
  const message = 'Validation error';
  const errorSources = error.issues.map(issue => {
    return {
      path: issue.path[issue.path.length - 1],
      message: `${issue.path[issue.path.length - 1]} is required`,
    };
  });
  return {
    message,
    errorSources,
  };
};

export default zodError;
