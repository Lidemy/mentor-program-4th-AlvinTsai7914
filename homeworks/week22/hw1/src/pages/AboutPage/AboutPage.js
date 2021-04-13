import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../WebAPI';

import React, { useState, useEffect } from 'react';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  padding: 0 20%;
`;

const PostTitle = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  margin-top: 64px;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 16px;
`;
const PostNickName = styled.div`
  color: #333;
  font-size: 24px;
`;

const PostDate = styled.div`
  font-size: 20px;
  color: #333;
  color: rgba(0, 0, 0, 0.8);
`;

const PostContent = styled.p`
  margin-top: 32px;
  font-size: 20px;
  line-height: 2em;
`;
// Post.propTypes = {
//   post: PropTypes.object,
// };

export default function AboutPage() {
  const [post, setPost] = useState({});
  let { id } = useParams();
  useEffect(() => {
    getPostById(id).then((newPost) => setPost(...newPost));
  }, [id]);

  return (
    <Root>
      <PostContainer>
        <PostTitle>關於我</PostTitle>
        <PostInfo></PostInfo>
        <PostContent>關於留</PostContent>
      </PostContainer>
    </Root>
  );
}
