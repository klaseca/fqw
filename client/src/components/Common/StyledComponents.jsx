import { styled, withStyles } from '@material-ui/core/styles';
import { Container, Tooltip } from '@material-ui/core';

const Article = styled('article')({
  backgroundColor: '#c9d6df',
  flex: '1',
  display: 'flex',
  alignItems: 'enter',
  paddingTop: '64px',
});

const SContainer = styled(Container)({
  paddingTop: '20px',
});

const SPreloaderBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#52616b',
});

const STooltip = withStyles(() => ({
  tooltip: {
    fontSize: '1.4em',
  },
}))(Tooltip);

export { Article, SContainer, SPreloaderBox, STooltip };
