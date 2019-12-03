const path = require("path"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin");


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        "main": PATHS.src,
        // "index": `${PATHS.src}/pages/templates/index/index.js`,
        // "block": `${PATHS.src}/pages/templates/block/block.js`
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].css`
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/pages/templates/index/index.html`,
            filename: `./index.html`,
            chunks: ["main"]
        }),
        // new HtmlWebpackPlugin({
        //     template: `${PATHS.src}/pages/templates/block/block.html`,
        //     filename: `./block.html`,
        //     chunks: ["main"]
        // }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img/`, to: `${PATHS.dist}/assets/img/` },
        ]),
    ],
    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
    },
    module: {
        rules: [

            // Html handler
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                    }
                }]
            },

            // Css handler
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { config: { path: 'postcss.config.js' } }
                    },
                ]
            },

            // Sass handler
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { config: { path: 'postcss.config.js' } }
                    },
                    'sass-loader',
                ]
            },

            // Fonts handler
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader?name=./assets/fonts/[name].[ext]'
                    },
                    {
                        loader: 'file-loader?name=./assets/fonts/[name].[ext]'
                    }
                ]
            },

            // Image handler
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: `./assets/img/`
                        }
                    }
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 5
                    //         },
                    //         optipng: {
                    //             enabled: false,
                    //         },
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ],
            },

            // JS handler
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/env", {
                                targets: {
                                    edge: "17",
                                    firefox: "60",
                                    chrome: "67",
                                    safari: "11.1",
                                    ie: "10"
                                },
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },

        ]
    }

};