  import styled from "styled-components";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import StyledButton from '../components/Button';
import { Link } from "react-router-dom";

const Wapper = styled.div`
  border-radius: 33px;
  border: solid 5px #ff2e55;
  width:70%;
  margin: auto;
`
const Content = styled.div`
  width:70%;
  text-align: center;
  margin: auto;
  padding : 5rem 0 ;
  h1{
    width:fit-content;
    padding-bottom:1rem;
    margin : 0 auto 2rem auto;
    border-bottom: solid 3px #e6e6e6;
  }
  .icon{
    width:50%;
    font-size: 200px;
    margin-bottom:2rem;
  }
  button{
    margin : 0.5rem 1rem;
  }
`


const NotFound = () => {
  return (
    <Wapper>
      <Content>
        <h1>요청하신 페이지를 찾을 수 없습니다.</h1>
        <AnnouncementIcon className="icon"/>
        <div className="btn-group">
          <Link to ="/"><StyledButton content={"메인으로"}></StyledButton></Link>
          <Link to="/lectures"><StyledButton content={"강의 목록"}></StyledButton></Link>
        </div>
      </Content>
    </Wapper>
  );
};

export default NotFound;
