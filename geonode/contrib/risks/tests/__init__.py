# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################

from django.test import TestCase

class RisksTestCase(TestCase):
    fixtures = [
        'sample_admin',
        'default_oauth_apps',
        'initial_data',
        '001_risks_adm_divisions',
        '002_risks_hazards',
        '003_risks_analysis',
        '004_risks_dymension_infos',
        '005_risks_test_base',
        '005_risks_test_layer'
    ]
