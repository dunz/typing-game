require('./css/style.scss');

import {PlayPage} from './pages/PlayPage';
import {ReportPage} from './pages/ReportPage';
import {Router} from './Router';

new Router([
    {page: PlayPage, path: 'play'},
    {page: ReportPage, path: 'report'}
]);