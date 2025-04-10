import React from 'react';
import styled from 'styled-components';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
`;
const LoadingIcon = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
// const SuccessIcon = styled(Icon)`
//   background-color: #4caf50;
//   border-radius: 50%;
// `;
const SuccessIcon = ({message}: {message: string}) => {
   return (
     <div className='flex flex-col items-center'>
       <CheckCircleOutlineIcon style={{ fontSize: 48, color: 'green' }} />
       <p className='text-[18px]'>{message}</p>
     </div>
   );
}

const LoadingOverlay = ({ type, message }: {type: string, message: string}) => {
    return (
      <Overlay>
        {type === 'loading' ? <LoadingIcon /> : type === 'success' ? <SuccessIcon message={message} /> : null}
      </Overlay>
    );
  };

export default LoadingOverlay;