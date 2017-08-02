import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HoverPaper from '../../atoms/hover-paper';
import styles from './styles';
import actions from './actions';


const mapStateToProps = (state) => ({
  from: state.interval.from,
  interval: state.interval.interval,
  response: state.geonodeAverageResponse.response,
  to: state.interval.to,
  uptime: state.uptime.response,
});


@connect(mapStateToProps, actions)
class Uptime extends React.Component {
  static propTypes = {
    autoRefresh: PropTypes.number,
    from: PropTypes.object,
    get: PropTypes.func.isRequired,
    interval: PropTypes.number,
    reset: PropTypes.func.isRequired,
    style: PropTypes.object,
    to: PropTypes.object,
    uptime: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.get = (
      from = this.props.from,
      to = this.props.to,
      interval = this.props.interval,
    ) => {
      this.props.get(from, to, interval);
    };
  }

  componentWillMount() {
    this.get();
    if (this.props.autoRefresh && this.props.autoRefresh > 0) {
      this.intervalID = setInterval(this.get, this.props.autoRefresh);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.from && nextProps.from !== this.props.from) {
        this.get(nextProps.from, nextProps.to, nextProps.interval);
      }
      if (nextProps.autoRefresh !== undefined) {
        if (nextProps.autoRefresh !== this.props.autoRefresh) {
          if (nextProps.autoRefresh > 0) {
            this.intervalID = setInterval(this.get, nextProps.autoRefresh);
          } else {
            clearInterval(this.intervalID);
            this.intervalID = undefined;
          }
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.reset();
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }

  render() {
    const style = {
      ...styles.content,
      ...this.props.style,
    };
    let uptime = 0;
    if (this.props.uptime) {
      const data = this.props.uptime.data.data;
      if (data.length > 0) {
        if (data[0].data.length > 0) {
          const metric = data[0].data[0];
          uptime = metric.count;
        }
      }
    }
    return (
      <HoverPaper style={style}>
        <h3>Uptime</h3>
        <span style={styles.stat}>{uptime} days</span>
      </HoverPaper>
    );
  }
}


export default Uptime;