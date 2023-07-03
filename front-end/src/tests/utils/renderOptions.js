import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../../context/Provider';

export function renderWithRouterAndProvider(component, initialRoute = '/') {
  const history = createMemoryHistory({ initialEntries: [initialRoute] });

  return {
    ...render(
      <Router history={ history }>
        <Provider>
          {component}
        </Provider>
      </Router>,
    ),
    history,
  };
}

export function renderWithRouter(component, initialRoute = '/') {
  const history = createMemoryHistory({ initialEntries: [initialRoute] });

  return {
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
  };
}
