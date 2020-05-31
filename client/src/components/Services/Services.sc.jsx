import { styled, withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

const Title = styled('div')({
  display: 'flex',
  fontSize: '3.5em',
  paddingBottom: '20px',
});

const Paragraph = styled('div')({
  fontSize: '1.7em',
  textIndent: '20px',
});

const SExpansionBox = styled('div')({
  paddingTop: '15px',
});

const SExpansionPanel = withStyles({
  root: {
    border: '1px solid #f0f5f9',
    boxShadow: 'none',
    backgroundColor: '#f0f5f9',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(ExpansionPanel);

const SExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#c9d6df',
    borderBottom: '1px solid #f0f5f9',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

const SExpansionPanelDetails = styled(ExpansionPanelDetails)({
  padding: '10px 15px',
  flexDirection: 'column',
  
});

const AddButton = styled('div')({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '5vmin',
  height: '5vmin',
  right: '5vmin',
  bottom: '5vmin',
  backgroundColor: '#52616b',
  minHeight: '50px',
  minWidth: '50px',
  cursor: 'pointer',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
});

const Description = styled('div')({
  display: 'flex',
  fontSize: '2em',
  paddingBottom: '10px',
});

const PriceBox = styled('div')({
  display: 'flex',
  fontSize: '1.5em',
  padding: '13px',
  backgroundColor: '#c6e2b7',
  borderRadius: '5px',
});

export {
  Title,
  Paragraph,
  SExpansionBox,
  SExpansionPanel,
  SExpansionPanelSummary,
  SExpansionPanelDetails,
  AddButton,
  Description,
  PriceBox,
};
