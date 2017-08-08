import React, { Component } from 'react';
import Header from '../../components/organisms/header';
import ErrorList from '../../components/organisms/error-list';
import styles from './styles';


class SWPerf extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Header />
        <ErrorList />
      </div>
    );
  }
}


export default SWPerf;