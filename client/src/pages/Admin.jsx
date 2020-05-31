import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Article } from 'components/Common/StyledComponents';
import TabPanel from 'components/Admin/TabPanel';
import UsersList from 'components/Admin/UsersList';
import Orders from 'components/Admin/Orders';
import Services from 'components/Admin/Services';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    '& > div > span': {
      backgroundColor: '#52616b',
    },
  },
  tabPanel: {
    flex: '1',
  }
}));

export default function Admin() {
  const { root, tabs, tabPanel } = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Article className={root}>
      <Tabs
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={tabs}>
        <Tab label='Клиенты' {...a11yProps(0)} />
        <Tab label='Заказы' {...a11yProps(1)} />
        <Tab label='Услуги' {...a11yProps(2)} />
      </Tabs>
      <TabPanel className={tabPanel} value={value} index={0}>
        <UsersList />
      </TabPanel>
      <TabPanel className={tabPanel} value={value} index={1}>
        <Orders />
      </TabPanel>
      <TabPanel className={tabPanel} value={value} index={2}>
        <Services />
      </TabPanel>
    </Article>
  );
}
