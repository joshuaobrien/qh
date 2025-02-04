# Qantas Hotels front-end takehome task

## Main technologies used
- React & TypeScript
- CSS modules
- Zod
- React Testing Library
- Vitest
- TanStack Query
- Biome

## Design considerations
- Next.js: I didn't use it, mainly so that there are fewer moving parts, given the interview context.
- Dependency injection focus: where reasonably possible, I injected dependencies. This makes the code much easier to test.
- Performance: I didn't use `useMemo` or `useCallback` anywhere. There are no observable performance problems, so I'd rather not reach for these tools unless I know they're going to have a meaningful benefit.
- Skeleton components: I tend to create 'skeleton' components that are solely responsible for receiving nodes and placing them in the right spot. This makes features more maintainable and makes it much easier to use feature flags to turn things on or off or to give different cohorts of users different experiences.
- Type safety: Type safety is a priority for me. I used Zod to define schemas, ensuring data accuracy and removing entire classes of bugs at compile time.
- Feature composition: I placed design system components in their own separate folder. In a larger application, the goal is that most features would be composed primarily of design system components, with minimal CSS in feature folders. This ensures consistency across the product.
- Error handling: I used Zod to validate API responses to prevent unexpected crashes due to malformed data. In a larger project, I would integrate global error handling mechanisms, potentially logging errors to an external service.
- Logging and debugging: I kept logging minimal, but in a real-world project, I would add structured logs with contextual information for easier debugging in production.

## Data fetching and state management
- I used TanStack Query to make API calls (well, simulated API calls) and manage server (well, simulated server) state.
- For client state, I simply used React state with no bells or whistles. In a more complicated project with complex client state, I'd consider reaching for something like MobX, Zustand, or Jotai.
- The data layer is structured behind a service interface, as in a real-world application where data comes from a backend. For this project, I implemented a mock client using the provided data with synthetic load times.

## Testing
- I wrote individual component tests for the more complicated components (e.g., Ratings).
- For smaller components, I relied on snapshot tests taken at the page level.
- I wrote tests for the feature as a whole using a mocked API service.
- I focused on writing tests for the feature as a whole rather than exhaustively testing every individual component, as the broader tests already cover the same functionality
- In a production environment, I am an advocate for visual regression testing. When available, I tend to use it for all components. Given the context of this project, though, I didn’t set it up and instead focused on unit and snapshot tests.

## Development workflow
- I typically use Storybook as a development harness for UI components, but given the constraints of this take-home project, I opted not to set it up.
- Linting and formatting are enforced via Biome, ensuring code consistency across the project.

## Accessibility
I tested things out with a screen reader to ensure that sufficient information is available to non-sighted users. Admittedly, though, improvements could be made here, as things were a bit verbose.

## Commands you can run
- `yarn dev` - Starts the dev server
- `yarn build` - Does a production build
- `yarn test` - Runs the tests
- `yarn lint-and-format` - Runs the formatter and linter, with autofix on
