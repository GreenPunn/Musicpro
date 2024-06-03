import config from '../config';
import Home from '../pages/Home';
import Playlist from '~/pages/Playlist';
import Podcast from '~/pages/Podcast';
import Favorite from '~/pages/Favorite';
import Login from '~/pages/Authen/Login';
import Signup from '~/pages/Authen/Signup';
import Empty from '~/pages/Empty';
import Collection from '~/pages/Collection';
import Admin from '~/pages/Admin';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.playlist, component: Playlist },
    { path: config.routes.podcast, component: Podcast },
    { path: config.routes.favorite, component: Favorite },
    { path: config.routes.login, component: Login },
    { path: config.routes.signup, component: Signup },
    { path: config.routes.empty, component: Empty },
    { path: config.routes.collection, component: Collection },
    { path: config.routes.admin, component: Admin },
];

export { publicRoutes };
