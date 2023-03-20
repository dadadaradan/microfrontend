import { createApp } from 'vue';
import Dashboard from './components/Dashboard';

export const mount = (el) => {
  const app = createApp(Dashboard);

  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const elem = document.querySelector('#dashboard-root');

  if (elem) {
    mount(elem);
  }
}
