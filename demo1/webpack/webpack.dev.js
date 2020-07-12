const path = require('path')
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')



module.exports= merge(common,{
    mode: 'development',
    devtool: 'inline-source-map',
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                exclude:/node_modules/,
                loader:'ts-loader'
            },
            {
                test:/\.s[ca]ss$/,
                include: path.resolve(process.cwd(),'src'),
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'webpack demo1',
            template:'./src/template.ejs'
        })
    ],
    devServer:{
        contentBase: path.resolve(process.cwd(),'dist'),
        port:process.env.npm_package_config_port,
        hot:true
    }
})
