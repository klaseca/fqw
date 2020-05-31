import { Link } from 'react-router-dom';
import { styled, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const Article = styled('article')({
  backgroundColor: '#c9d6df',
  flex: '1',
  display: 'flex',
  alignItems: 'enter'
});

const SignBox = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const FormBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
});

const FormTitle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '2.5em',
  paddingBottom: '20px'
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '80%'
});

const STextField = withStyles({
  root: {
    paddingBottom: '10px',
    '& label.Mui-focused': {
      color: '#52616b'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#52616b'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#52616b'
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: '#f44336'
    }
  }
})(TextField);

const UnderFormText = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '20px',
  fontSize: '1.5em',
  color: '#52616b'
});

const SLink = styled(Link)({
  textDecoration: 'none',
  paddingLeft: '5px',
  color: '#1e2022'
});

const ErrorBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '1.5em',
  padding: '10px',
  color: '#e00000'
});

export {
  Article,
  SignBox,
  FormBox,
  FormTitle,
  Form,
  STextField,
  UnderFormText,
  SLink,
  ErrorBox,
};
