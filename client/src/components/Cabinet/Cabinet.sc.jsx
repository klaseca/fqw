import { styled } from '@material-ui/core/styles';
import { Grid, Modal } from '@material-ui/core';

const CabinetBox = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  marginBottom: '20px',
  position: 'relative',
});

const CircleButton = styled('div')({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bottom: '-1vmin',
  right: '-1vmin',
  borderRadius: '50%',
  backgroundColor: '#52616b',
  width: '6vmin',
  height: '6vmin',
  cursor: 'pointer',
  minHeight: '50px',
  minWidth: '50px',
});

const Square = styled('div')({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bottom: '-1vmin',
  right: '-1vmin',
  borderRadius: '10px',
  backgroundColor: '#52616b',
  width: '6vmin',
  height: '6vmin',
  minHeight: '50px',
  minWidth: '50px',
});

const CabinetBoxHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3em',
});

const UnderHeaderLine = styled('div')({
  width: '50px',
  height: '5px',
  backgroundColor: '#1e2022',
  marginTop: '5px',
});

const ContentBox = styled(Grid)((props) => ({
  display: 'flex',
  flexDirection: props.direction || 'column',
  padding: '20px',
  paddingBottom: props.paddingbottom,
}));

const ContentItem = styled(Grid)((props) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: props.paddingbottom || '20px',
  '&:last-child': {
    paddingBottom: '0',
  },
}));

const ContentKey = styled('div')({
  display: 'flex',
  fontSize: '1.5em',
});

const ContentValue = styled('div')({
  display: 'flex',
  fontSize: '2.3em',
  paddingTop: '5px',
  paddingLeft: '10px',
});

const SNoData = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  marginTop: '10px',
  backgroundColor: '#e8e8e8',
  fontSize: '2em',
});

const SCarItem = styled(Grid)({
  display: 'flex',
  padding: '20px',
  '&:nth-child(even)': {
    backgroundColor: '#e8e8e8',
  },
});

const BtnBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const ModalBox = styled(Modal)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SModal = styled('div')({
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  padding: '20px',
  outline: 0,
});

const WarningBox = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '15px',
  marginTop: '5px',
  borderRadius: '5px',
  fontSize: '2em',
  backgroundColor: '#ffce2e87',
});

export {
  CabinetBox,
  CircleButton,
  Square,
  CabinetBoxHeader,
  UnderHeaderLine,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
  SNoData,
  SCarItem,
  BtnBox,
  ModalBox,
  SModal,
  WarningBox,
};
