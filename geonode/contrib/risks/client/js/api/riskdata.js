/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const axios = require('../../MapStore2/web/client/libs/ajax');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const riskdataCache = {};
const toBlob = require('canvas-to-blob');
var FileSaver = require('file-saver');
const Api = {
    getData: function(url) {
        const cached = riskdataCache[url];
        if (cached && new Date().getTime() < cached.timestamp + (ConfigUtils.getConfigProp('cacheDataExpire') || 60) * 1000) {
            return new Promise((resolve) => {
                resolve(cached.data);
            });
        }
        return axios.get(url).then((response) => {
            riskdataCache[url] = {
                timestamp: new Date().getTime(),
                data: response.data
            };
            return response.data;
        });
    },
    getReport: function(url, mapImg, chartImg, legendImg) {
        const mapBlob = toBlob(mapImg);
        const chartBlob = toBlob(chartImg);
        const legendBlob = toBlob(legendImg);
        let data = new FormData();
        data.append('map', mapBlob);
        data.append('chart', chartBlob);
        data.append('legend', legendBlob);
        return axios.post(url, data, {responseType: 'blob'})
            .then((response) => {
                FileSaver.saveAs(response.data, "report.pdf");
                return response;
            })
            .catch((e) => { throw new Error(e.statusText); });
    }
};

module.exports = Api;
