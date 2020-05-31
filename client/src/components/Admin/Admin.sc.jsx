import { styled } from '@material-ui/core/styles';
import { Grid, FormControl } from '@material-ui/core';

const SFiltredBox = styled(Grid)({
  padding: '10px',
});

const FilterTitle = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '1.5em',
  alignItems: 'center',
  padding: '0 10px',
});

const SFormControl = styled(FormControl)({
  minWidth: '120px',
  '& > div': {
    marginBottom: '16px',
  },
});

const FilterBox = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
});

const NotOrders = styled('div')({
  display: 'flex',
  fontSize: '3em',
});

export { SFiltredBox, FilterTitle, SFormControl, FilterBox, NotOrders };
