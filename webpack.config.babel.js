let path = require('path');
let webpack = require('webpack');

let merge = require('webpack-merge');
let version = require('./package.json').version;
let TARGET = process.env.npm_lifecycle_event;


TARGET = TARGET.split('-');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');


//项目路劲配置


let src_path = TARGET[1] + '/src/index.js';
let dev_path = TARGET[1] + '/server';
let dist_path = TARGET[1] + '/dist';
let tpl_path = TARGET[1] + '/server/index.tpl.html';


if (TARGET[2] != undefined) {
    src_path = TARGET[1] + '/src/tpl.js';
}
//开发模式下样式转换器字符串
let devStyleLoaderStr = TARGET[2] == undefined ? 'style!css?modules&importLoaders=1!postcss' : 'style!css?importLoaders=1!postcss';
//生产模式下样式转换器字符串
let buildStyleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[hash:base64:4]!postcss';
//基础配置
let baseConfig = {

    entry: {
        main: path.resolve(__dirname, src_path),
        vendor: ['react', 'react-dom', 'redux', 'react-redux']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    vue: {
        cssModule: {
            localIdentName: '[hash:base64:5]',
            camelCase: true
        }
    },

    postcss: () => {
        // todo 学习cssnext
        return [
            require('autoprefixer')({
                remove: false
            })
        ];
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']


        }),


        //垫片插件
        new webpack.ProvidePlugin({
            Vue: 'vue',
            React: 'react',
            ReactDOM: 'react-dom'
        }),


        new CopyWebpackPlugin([
            {from: __dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'},
        ])

    ]


};

//开发模式下
if (TARGET[0] == 'dev') {
    module.exports = merge(baseConfig, {
        output: {
            path: path.resolve(__dirname, dev_path),
            filename: '[name].js'
        },
        module: {


            loaders: [
                {
                    test: /\.css$/,
                    loader: devStyleLoaderStr
                },

                {
                    test: /\.less$/,
                    loader: devStyleLoaderStr + '!less'
                }

            ]
        },
        vue: {

            loaders: {
                css: 'style!css!postcss',
                less: 'style!css!postcss!less'
            }
        },
        devServer: {
            contentBase: './' + TARGET[1] + '/server',
            hot: true,
            inline: true,
            // open: true,
            colors: true
        }


    });

}


//生产模式下
if (TARGET[0] == 'build') {


    module.exports = merge(baseConfig, {

        output: {
            path: path.resolve(__dirname, dist_path),
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', buildStyleLoaderStr)
                },

                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', buildStyleLoaderStr + '!less')
                }
            ]
        },
        vue: {

            loaders: {
                css: ExtractTextPlugin.extract('style', 'css!postcss'),
                less: ExtractTextPlugin.extract('style', 'css!postcss!less')
            }
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin(
                {
                    compress: {
                        warnings: false
                    }
                }
            ),
            new HtmlWebpackPlugin({
                title: 'test',
                template: path.resolve(__dirname, tpl_path),
                inject: 'body'
            }),
            new ExtractTextPlugin('css.' + version + '.css'),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
            })

        ]
    });


}


