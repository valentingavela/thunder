import { IRequest, IResponse } from 'models/Express';

export function getMostRepeatedElement(arr: any[], path: string) {
  let mf = 1;
  let m = 0;
  let item;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i][path] === arr[j][path]) m++;
      if (mf < m) {
        mf = m;
        item = arr[i];
      }
    }

    m = 0;
  }

  return { item, times: mf };
}

export function get2DArrayColumn(arr: any[][], n: number) {
  return arr.map(x => x[n]);
}

export function mapPrice(currency: string, rawAmount: number) {
  const [amount, decimals] = String(rawAmount).split('.');

  return {
    currency,
    amount: Number(amount),
    decimals: decimals ? Number(decimals) : 0,
  };
}

export function handleErrorResponse(req: IRequest, res: IResponse, err: any) {
  const { method, body, params, url } = req;
  const response = {} as any;

  switch (err && err.response.status) {
    case 404:
      response.code = err.response.status;
      response.message = 'Item Not Found';
      break;

    default:
      response.code = 500;
      response.message = `Internal Server Error: ${err}`;
      break;
  }

  console.error('-----------------------------------------------------------------');
  console.error(method + ' - ' + url);
  console.error('Status: ' + err.response.status + ' ' + err.response.data.message);

  if (method.toLowerCase() === 'post') {
    console.error('Request body: ' + JSON.stringify(body));
  }

  console.error('Params: ' + JSON.stringify(params));
  console.error('error: ' + err);
  console.error('stackTrace error: ' + JSON.stringify(err.stack));

  res.status(response.code).send(response);
}
