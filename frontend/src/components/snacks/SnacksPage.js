import React, { useEffect, useState } from 'react';
import SnacksItem from '../../components/snacks/SnacksItem';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchSnacks } from '../../features/snacks/snacksActions';
import { useInView } from 'react-intersection-observer';

const Wrapper = styled.div`
  div::-webkit-scrollbar {
    display: none;
  }
  .sort {
    width: 100%;
    height: 50px;
    float: right;
  }
  .sort > .sortButton {
    float: right;
    color: white;
    background-color: #ff2c55;
    opacity: 0.7;
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    border-radius: 12px;
    width: 60px;
    height: 30px;
    border: none;
    cursor: pointer;
    &:hover {
      z-index: 100;
      opacity: 1;
    }
    margin-right: 20px;
  }
  .section {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    overflow: auto;
  }
  .tag {
    width: 30%;
    height: 100px;
    /* border: white 2px solid; */
    border-radius: 10px;
    padding: 20px;
    position: sticky;
    top: 0px;
  }
  .ttl {
    padding: 10px;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .item {
    width: 50%;
  }
  .nonelist {
    list-style: none;
  }
  .listitem {
    float: left;
    flex-wrap: wrap;
    border: #ff2c55 1px solid;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 4px;
    opacity: 0.5;
    cursor: pointer;
    transition: background-color 500ms;
    &:hover {
      z-index: 100;
      opacity: 1;
      background-color: #ff2c55;
      font-weight: bold;
      margin-right: 0px;
    }
  }
  .snacks {
    margin-bottom: 20px;
    width: 100%;
    height: 700px;
  }
  .list {
    margin-bottom: 10px;
  }
`;

const SnacksPage = () => {
  // 여기에 코드 적자
  // {
  //   /*
  //       JS 어디에서 짜야하는지 잘 모르겠는데
  //       SnacksItem 중에 id my-video에 class "vjs-ended"가 생기면 영상이 끝난 것이므로
  //       그 다음 영상으로 스크롤 옮기고
  //       다음 영상을 자동재생시키고 싶음
  //       https://videojs.com/guides/options/#html5
  // */
  // }

  // 무한 스크롤
  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();

  const [ref, inView] = useInView();

  const { snacksList } = useSelector((state) => state.snacks);
  const { hasMore } = useSelector((state) => state.snacks);

  useEffect(() => {
    if (snacksList.length === 0) {
      dispatch(fetchSnacks(pageNum));
    }
  }, [dispatch]);

  useEffect(() => {
    if (snacksList.length !== 0 && inView && hasMore) {
      setPageNum((page) => {
        dispatch(fetchSnacks(page + 1));
        return page + 1;
      });
    }
  }, [inView]);

  return (
    <Wrapper>
      <div className="sort">
        <button className="sortButton">인기순</button>
        <button className="sortButton">인기순</button>
        <button className="sortButton">인기순</button>
        <button className="sortButton">인기순</button>
      </div>
      <div className="section">
        <div className="tag">
          <p className="ttl">실시간 인기 태그</p>
          <ul className="nonelist">
            <li className="listitem"># Hello</li>
            <li className="listitem"># World</li>
            <li className="listitem"># CHUKKA</li>
            <li className="listitem"># Do</li>
            <li className="listitem"># Your</li>
            <li className="listitem"># Best</li>
            <li className="listitem"># Daeyoung</li>
            <li className="listitem"># Sujin</li>
            <li className="listitem"># YeonYi</li>
            <li className="listitem"># Hojun</li>
            <li className="listitem"># Jiwon</li>
            <li className="listitem"># Moki</li>
            <li className="listitem"># The</li>
            <li className="listitem"># Greatest</li>
            <li className="listitem"># Developer</li>
            <li className="listitem"># Ever</li>
          </ul>
        </div>
        <div className="item">
          <ul className="nonelist list">
            {snacksList.map((snacks) => (
              <li key={snacks.snacksId}>
                <SnacksItem snacks={snacks} />
              </li>
            ))}
          </ul>
          <div ref={ref} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SnacksPage;
