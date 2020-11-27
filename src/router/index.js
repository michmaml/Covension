import Vue from "vue";
import Auth from '@okta/okta-vue';
import Router from "vue-router";

import MainPanelComponent from '@/components/MainPanel.vue';
import LoginComponent from '@/components/MainPanel.vue';

// {okta} stuff
const OKTA_DOMAIN = process.env.cvn_DOMAIN;
const CLIENT_ID = process.env.cvn_CLIENT_ID;
const CALLBACK_PATH = '/login/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scope: SCOPES.split(/\s+/),
};

Vue.use(Auth, { ...config });

const router = new Router({
  mode: 'history',
  routes: [
    //{ path: '/login', component: LoginComponent },
    { path: CALLBACK_PATH, component: Auth.handleCallback() },
    { path: '/', component: MainPanelComponent, meta: { requiresAuth: true } }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

Vue.use(Router);

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
