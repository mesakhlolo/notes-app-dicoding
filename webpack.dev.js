import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devServer: {
    static: './dist',
    port: 9000,
    open: false,
    client: {
      overlay: true,
    },
  },
  devtool: 'eval-source-map',
});
