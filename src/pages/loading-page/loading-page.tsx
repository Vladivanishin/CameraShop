import { Oval } from 'react-loader-spinner';

export default function LoadingPage() : JSX.Element{
  return(
    <div style={{display: 'flex',height:'100vh', width: '300px', margin: '0 auto', padding: '30px', justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{color: '#65cd54', paddingRight: '10px'}}>Loading...</h2>
      <Oval
        height={80}
        width={80}
        color="#65cd54"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div >
  );
}
