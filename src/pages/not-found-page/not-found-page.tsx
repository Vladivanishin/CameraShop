import { Link } from 'react-router-dom';

export default function NotFoundPage () : JSX.Element{
  return(
    <div data-testid='not-found'>
      <h1>404 Not Found</h1>
      <Link to="/">
        <u>Back to Main page</u>
      </Link>
    </div>
  );
}
