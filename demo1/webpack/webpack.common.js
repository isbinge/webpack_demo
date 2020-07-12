const path = require('path')

const appSourcePath = path.resolve(process.cwd(),'src');
const appDistPath = path.resolve(process.cwd(),'dist')

module.exports = {
    entry:{
        main: appSourcePath
    },
    output:{
        path: appDistPath,
        filename: '[name].[contenthash].js'
    },
    optimization:{
        splitChunks:{
            chunks:'all'
        },
        runtimeChunk:'single',
        moduleIds:'deterministic'
    },
    resolve:{
        modules:[appSourcePath,'node_modules'],
        extensions:['.tsx','.ts','.js','.ejs'],
        alias:{
            "@":appSourcePath
        }
    }
}