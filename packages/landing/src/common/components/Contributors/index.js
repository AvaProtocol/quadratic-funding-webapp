import React from 'react';

import ContributorsStyle from './contributors.style';

const Contributors = ({
  ...props
}) => {
  return (
    <ContributorsStyle
      {...props}
    >
      <text>Contributors</text>
    </ContributorsStyle>
  );
};

export default Contributors;
