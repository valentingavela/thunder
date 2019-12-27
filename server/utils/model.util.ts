import { IRequest, IResponse } from '../models/Express';

const getError = (stackError: any, errorCode = '500') => {
  switch (errorCode.toString()) {
    case '404':
      return {
        stack: stackError,
        img: '404',
        msg: 'Ha ocurrido un error. La pagina que busca no existe o no se puede encontrar.',
      };
    case '401':
      return {
        stack: stackError,
        img: 'forbidden',
        msg: 'Accesso no permitido. Intentó acceder a un recurso al cual no tiene permisos de acceso.',
      };
    case '500':
      return {
        stack: stackError,
        img: '500',
        msg: 'Hay un problema con la página que está intentando abrir y no se puede mostrar.',
      };
    default:
      return {
        stack: '',
        img: '500',
        msg: 'Hay un problema con la página que está intentando abrir y no se puede mostrar.',
      };
  }
};

const getBaseView = (req: IRequest, model: IViewModel) => {
  const { username } = req;
  const { status, requestCode } = model;

  return {
    requestCode,
    username,
    status,
  };
};

interface IViewModel {
  requestCode?: string;
  status?: string;
}

export { getError, getBaseView };
