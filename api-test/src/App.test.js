import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './mocks';
import StarWarsPeople from './StarWarsPeople.js';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays the title of the first person', async () => {
  render(<StarWarsPeople />);
  const firstPersonTitle = await screen.findByRole('heading');
  expect(firstPersonTitle).toHaveTextContent('Luke Skywalker');
});

test('displays an error message for server error', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<StarWarsPeople />);
  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage).toHaveTextContent('Oops... something went wrong, try again 🤕');
});

test('displays a custom error message for status code 418', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
      return res(ctx.status(418));
    })
  );

  render(<StarWarsPeople />);
  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage).toHaveTextContent("418 I'm a tea pot 🫖, silly");
});

