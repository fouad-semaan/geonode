import React from 'react';
import HoverPaper from '../../atoms/hover-paper';
import HR from '../../atoms/hr';
import CPU from '../../cels/cpu';
import Memory from '../../cels/memory';
import styles from './styles';


const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


class GeoserverStatus extends React.Component {
  render() {
    return (
      <HoverPaper style={styles.content}>
        <h3>Geoserver status</h3>
        <CPU cpu={5} data={data} />
        <HR />
        <Memory memory={5} data={data} />
      </HoverPaper>
    );
  }
}


export default GeoserverStatus;