// --------------------------------------------------------------------------------
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersControllers';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

// --------------------------------------------------------------------------------
// ROTA: Receber uma requisição, chamar outro arquivo, e devolver uma resposta.
const providersRouter = Router();

const providersController = new ProvidersController();

const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();


providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index); // ...

providersRouter.get('/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }), providerMonthAvailabilityController.index);

providersRouter.get('/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }), providerDayAvailabilityController.index);


export default providersRouter;
