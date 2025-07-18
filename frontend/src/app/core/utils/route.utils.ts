import { Route } from '@angular/router';
import { titleResolver } from '@core/resolvers';

export function buildRoute(options: Route): Route {
  return {
    ...options,
    resolve: {
      ...options.resolve,
      title: titleResolver,
    },
  };
}
