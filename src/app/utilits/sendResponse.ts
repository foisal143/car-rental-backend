import { Response } from 'express';

const sendResponse = (data: any, res: Response, message?: string) => {
  if (data) {
    res.send({
      success: true,
      message,
      data,
    });
  } else {
    res.send({
      success: false,
      statusCode: 404,
      message: 'No data found',
      data: [],
    });
  }
};

export default sendResponse;
