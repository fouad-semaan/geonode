/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {connect} = require('react-redux');
const {getData, zoomInOut} = require('../actions/disaster');
const {topBarSelector} = require('../selectors/disaster');
const {toggleControl} = require('../../MapStore2/web/client/actions/controls');
const Notifications = connect(state => ({notifications: state.notifications}))(require('react-notification-system-redux'));
const TopBar = connect(topBarSelector, {zoom: zoomInOut, getData, toggleTutorial: toggleControl.bind(null, 'tutorial', null)})(require('../components/TopBar'));
const DataContainer = require('../containers/DataContainer');
const MapContainer = require('../containers/MapContainer');
const Page = require('../../MapStore2/web/client/containers/Page');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const NotificationStyle = require('../../assets/js/NotificationStyle');

const Home = React.createClass({
    propTypes: {
        params: React.PropTypes.object,
        locale: React.PropTypes.string,
        messages: React.PropTypes.object,
        plugins: React.PropTypes.object
    },
    componentWillMount() {
        console.log(this.props.params.splat);
    },
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.params.splat !== this.props.params.splat);
    },
    render() {
        const {plugins} = this.props;
        let pluginsHome = ConfigUtils.getConfigProp("plugins") || {};
        let pagePlugins = {
            "desktop": pluginsHome.common || [],
            "mobile": pluginsHome.common || []
        };
        let pluginsConfig = {
            "desktop": pluginsHome.home || [],
            "mobile": pluginsHome.home || []
        };
        return (
            <div className="disaster">
                <Notifications style={NotificationStyle}/>
                    <Page
                      id="home"
                      pagePluginsConfig={pagePlugins}
                      pluginsConfig={pluginsConfig}
                      plugins={plugins}
                      params={this.props.params}
                      />
                    <TopBar/>
                    <div className="container-fluid">
                        <div className="row">
                            <DataContainer/>
                            {<MapContainer plugins={plugins}/>}
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = connect((state) => {
    return {
        error: state.loadingError || (state.locale && state.locale.localeError) || null,
        locale: state.locale && state.locale.current,
        messages: state.locale && state.locale.messages || {}
    };
})(Home);
