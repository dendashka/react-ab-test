const chokidar        = require( 'chokidar' );
const { buildModule } = require( './build-module' );

chokidar.watch( [ './src/**/*.jsx', './src/**/*.js' ] ).on( 'change', async () => {
  console.log( 'Building Script...' );
  await buildModule();
  console.log( 'Finished' );
} );
