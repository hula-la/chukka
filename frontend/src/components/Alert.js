import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const AlertDiv = styled.div`
.modal {
  text-align:center;
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
}
.modal button {
  outline: none;
  cursor: pointer;
  border: 0;
}
.modal > section {
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border : solid 2px;
  border-radius: 0.3rem;
  border-color:#ff2c55;
  background-color: black;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
}
.modal > section > header {
  position: relative;
  padding: 16px 50px 16px 50px;
  background-color: black;
  font-weight: 700;
}
.modal > section > header button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  background-color: transparent;
}
.modal > section > main {
  padding: 16px;
  border-top: 1px solid #dee2e6;
}
.modal > section > footer {
  padding: 0px 16px 16px;
  text-align: right;
}
.modal > section > footer button {
  padding: 6px 12px;
  background-color: black;
  border-radius: 5px;
  font-size: 13px;
}
.modal.openModal {
  display: flex;
  align-items: center;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-bg-show 0.3s;
}
@keyframes modal-show {
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
}
@keyframes modal-bg-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

`

const Alert = (props) => {
  const {open, close, header} = props;
  return(
    <AlertDiv>
      <div className={open ? 'openModal modal' : 'modal'}>
      {open?(
        <section>
          <header>
            {header}
            <button className="close" onClick={close}><CloseIcon/></button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              확인
            </button>
          </footer>
        </section>
      ):null}
      </div>
    </AlertDiv>
  );
};
export default Alert;
