import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from './Button';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  
  animation-duration: 0.25s;
  // 처음에는 빨랐다가 나중에는 느려짐.
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  
  ${props => 
    props.disappear && 
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1.125rem;
  }
  
  animation-duration: 0.25s;
  // 처음에는 빨랐다가 나중에는 느려짐.
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  
  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
  /*
  아래와 같이 버튼 사이의 margin 값을 조정할 수 있으나
  가급적이면 !important 사용은 피하는 것이 좋음.
  button + button {
    margin-left: 0.5rem !important;
  }
  */
`;

// 대신 아래와 같이 기존의 Button 을 상속받아서 새 버튼을 만드는 것이 좋음.
const ShortMarginButton = styled(Button)`
  & + & {
    margin-left: 0.5rem;
  }
`;

function Dialog({title, children, confirmText, cancelText, onConfirm, onCancel, visible}) {
    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(visible);

    useEffect(() => {
        // visible true -> false
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);

    if (!localVisible && !animate) return null;

    return (
        <DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <ShortMarginButton color="gray" onClick={onCancel}>{cancelText}</ShortMarginButton>
                    <ShortMarginButton color="pink" onClick={onConfirm}>{confirmText}</ShortMarginButton>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    );
}

Dialog.defaultProps = {
    cancelText: '취소',
    confirmText: '확인',
};

export default Dialog;