import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SnacksItem from '../../components/snacks/SnacksItem';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useInView } from 'react-intersection-observer';
import { fetchSnacks, fetchTags } from '../../features/snacks/snacksActions';
import { changeSort } from '../../features/snacks/snacksSlice';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';

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
    height: 85vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    overflow: auto;
  }
  .tag {
    width: 30%;
    height: 100px;
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
  .nonelist {
    list-style: none;
  }
  .snacksitem {
    margin-bottom: 5rem;
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
  .tag-selected {
    z-index: 100;
    opacity: 1;
    background-color: #ff2c55;
    font-weight: bold;
    margin-right: 0px;
  }
  .snacks {
    margin-bottom: 20px;
    width: 100%;
    height: 700px;
  }
  .list {
    margin-bottom: 10px;
  }
  .upload-parent {
    position: fixed;
  }
  .upload-btn {
    position: absolute;
    right: 8rem;
    width: 4rem;
    height: 4rem;
    fill: #ff2c55;
    opacity: 0.6;
    transition: 300ms;
    :hover {
      opacity: 1;
    }
  }
  .upload-menu {
    transition: all 0.8s;
    text-align: center;
    width: 113px;
    position: absolute;
    top: 3.5rem;
    right: 6.1rem;
    padding: 0rem 1.2em 0 1.2rem;
    display: none;
  }
  .upload-menu li {
    list-style: none;
    margin-top: 1rem;
    padding-bottom: 0.2rem;
    border-bottom: solid 3px #6b6b6b;
    :hover {
      border-bottom: solid 3px #ff2c55;
    }
  }
  .show-menu {
    display: block;
  }
`;

const SnacksPage = ({ history }) => {
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
  // 인기순, 최신순 정렬
  const [sortSnacks, setSortSnacks] = useState('snacksId,DESC');
  const [tagList, setTagList] = useState([]);
  const [tags, setTags] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  const onClickNew = () => {
    if (sortSnacks !== 'snacksId,DESC') {
      setSortSnacks('snacksId,DESC');
    }
  };
  const onClickPop = () => {
    if (sortSnacks !== 'snacksLikes,DESC') {
      setSortSnacks('snacksLikes,DESC');
    }
  };

  const onMouseEnterHandler = () => {
    setOpenMenu(true);
  };

  const onMouseLeaveHandler = () => {
    setOpenMenu(false);
  };

  // 무한 스크롤, 스낵스 받아오기
  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();

  const [ref, inView] = useInView();

  const { snacksList } = useSelector((state) => state.snacks);
  const { hasMore } = useSelector((state) => state.snacks);

  const onClickTags = (e) => {
    setTagList((tagList) => {
      const nextTags = tagList.map((tag) => {
        if (tag.tag === e.target.id) {
          return {
            tag: tag.tag,
            selected: !tag.selected,
          };
        } else return tag;
      });
      return nextTags;
    });
  };

  useEffect(() => {
    if (snacksList.length === 0) {
      const newPage = pageNum;
      dispatch(fetchSnacks({ newPage, sortSnacks, tags }));
    }
  }, [dispatch]);

  useEffect(() => {
    // console.log(sortSnacks);
    if (snacksList.length !== 0) {
      setPageNum(() => {
        dispatch(changeSort());
        const newPage = 1;
        dispatch(fetchSnacks({ newPage, sortSnacks, tags }));
        return 1;
      });
    }
  }, [dispatch, sortSnacks, tags]);

  useEffect(() => {
    if (snacksList.length !== 0 && inView && hasMore) {
      setPageNum((page) => {
        const newPage = page + 1;
        setTimeout(() => {
          dispatch(fetchSnacks({ newPage, sortSnacks, tags }));
        }, 500);
        return page + 1;
      });
    }
  }, [inView]);

  // 인기 태그 조회
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const { snacksPopularTags } = useSelector((state) => state.snacks);

  useEffect(() => {
    const tmp = snacksPopularTags.map((tag) => ({
      tag,
      selected: false,
    }));
    setTagList(tmp);
  }, [snacksPopularTags]);

  useEffect(() => {
    // 성목
    // 선택된 태그 가져오기
    setTags(() => {
      const selectedTags = tagList
        .filter((tag) => tag.selected)
        .map((tag) => tag.tag);
      return selectedTags;
    });
  }, [tagList]);

  return (
    <Wrapper>
      <div className="sort">
        <button onClick={onClickNew} className="sortButton">
          최신순
        </button>
        <button onClick={onClickPop} className="sortButton">
          인기순
        </button>
      </div>
      <div className="section">
        <div className="tag">
          <p className="ttl">실시간 인기 태그</p>
          <ul className="nonelist">
            {tagList.map((tag, index) => {
              return (
                <li
                  className={'listitem' + (tag.selected ? ' tag-selected' : '')}
                  key={index}
                  onClick={onClickTags}
                >
                  <div id={tag.tag}># {tag.tag}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="item">
          <ul className="nonelist list">
            {snacksList.map((snacks, index) => {
              return (
                <li className="snacksitem">
                  <SnacksItem key={index} snacks={snacks} />
                </li>
              );
            })}
          </ul>
          <div ref={ref} />
        </div>
        <Link to="upload">
          <div
            className="upload-parent"
            onMouseLeave={onMouseLeaveHandler}
            onMouseEnter={onMouseEnterHandler}
          >
            <LoupeOutlinedIcon className="upload-btn" />
            <div className={openMenu ? 'upload-menu show-menu' : 'upload-menu'}>
              <ul>
                <li>
                  <Link to="record">촬영하기</Link>
                </li>
                <li>
                  <Link to="upload">업로드</Link>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default SnacksPage;
