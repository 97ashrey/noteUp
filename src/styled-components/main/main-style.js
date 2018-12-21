import styled from 'styled-components';

import { Section, sectionPadding } from '../Section';

export const Group = styled(Section)`
  & > * {
    margin-bottom: ${sectionPadding};
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;