import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  transform: translateY(-100%);
  display: flex;
  justify-content: center;
`;

const FooterDiv = styled.div`
  width: 100%;
  border-top: 2px solid #ff2c55;
  padding-top: 1rem;
`;

const Footer = () => {
  return (
    <Wrapper>
      <FooterDiv>
        <div>
          <h2>Chukka</h2>
        </div>
        <div>example@ssafy.com</div>
      </FooterDiv>
    </Wrapper>
  );
};

export default Footer;
