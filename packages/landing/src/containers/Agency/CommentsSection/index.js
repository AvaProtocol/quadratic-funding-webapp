import React, { useState } from 'react';

import Container from 'common/components/UI/Container';
import Button from 'common/components/Button';
import CommentsSectionWrapper from './commentsSection.style';

import Comments from 'common/components/Comments';
import Contributors from 'common/components/Contributors';
import Transactions from 'common/components/Transactions';

const CommentsSection = ({
  ...props
}) => {
  const [tab, setTab] = useState(0);

  return (
    <CommentsSectionWrapper
      {...props}
    >
      <Container>
        <div>
          <div className="buttons">
            <Button title="Comments" className={tab === 0 ? 'selected' : 'notSelected'} onClick={() => setTab(0)}></Button>
            <Button title="Contributors" className={tab === 1 ? 'selected' : 'notSelected'} onClick={() => setTab(1)}></Button>
            <Button title="Transactions" className={tab === 2 ? 'selected' : 'notSelected'} onClick={() => setTab(2)}></Button>
          </div>
          {
            tab === 0 && (<Comments></Comments>)
          }
          {
            tab === 1 && (<Contributors></Contributors>)
          }
          {
            tab === 2 && (<Transactions></Transactions>)
          }
        </div>
      </Container>
    </CommentsSectionWrapper>
  );
};

export default CommentsSection;
