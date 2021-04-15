import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPosts } from '../../WebAPI';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const ChangePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const ChangePageButton = styled.button`
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  margin: 4px;
  cursor: pointer;
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [startPoint, setStartPoint] = useState(0);

  function getPages() {
    getPosts(startPoint).then((posts) => {
      setPosts(posts);
    });
    getPosts(startPoint + 5).then((nextPage) => {
      if (nextPage.length === 0) {
        return setNextPage(false);
      }
      setNextPage(true);
    });
    getPosts(startPoint - 5).then((lastPage) => {
      if (lastPage.length === 0) {
        return setLastPage(null);
      }
      setLastPage(true);
    });
  }

  useEffect(() => {
    getPages();
  }, [startPoint]);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <ChangePageContainer>
        {lastPage === true && (
          <ChangePageButton
            onClick={() => {
              setStartPoint(startPoint - 5);
            }}
          >
            上一頁
          </ChangePageButton>
        )}
        {nextPage === true && (
          <ChangePageButton
            onClick={() => {
              setStartPoint(startPoint + 5);
            }}
          >
            下一頁
          </ChangePageButton>
        )}
      </ChangePageContainer>
    </Root>
  );
}
