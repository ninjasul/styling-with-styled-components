import React from 'react';
import styled from 'styled-components';
import Button from './Button';

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
    if (!visible) return null;

    return (
        <DarkBackground>
            <DialogBlock>
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