const esbuild = require( 'esbuild' );
const name    = 'react-ab-test';

async function buildScript( format = 'esm' ) {
  return esbuild.build( {
    entryPoints: [ `./src/index.js` ],
    bundle     : true,
    outfile    : `./dist/${ name }.${ format }.js`,
    format,
    external   : [ 'react', 'react-dom' ],
    target     : [ 'es2019' ],
  } );
}

async function buildModule() {
  return Promise.all( [
    buildScript(),
    buildScript( 'cjs' ),
  ] );
}

buildModule().catch( console.error );
exports.buildScript = buildScript;
exports.buildModule = buildModule;
