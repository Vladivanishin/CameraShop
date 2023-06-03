import { InfinitySpin } from 'react-loader-spinner';

export default function LoadingPage() : JSX.Element{
  return(
    <div>
      <h2>Loading...</h2>
      <InfinitySpin
        width='200'
        color="#65cd54"
      />
    </div >
  );
}
