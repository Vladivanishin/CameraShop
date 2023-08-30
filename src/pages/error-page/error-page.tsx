import { Link } from 'react-router-dom';

export default function ErrorPage () : JSX.Element{
  return(
    <div data-testid='error-page'>
      <h1>ERROR!</h1>
      <Link to="/">
        <u>Back to Main page</u>
      </Link>
    </div>
  );
}
