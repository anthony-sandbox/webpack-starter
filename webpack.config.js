import path                             from 'path';
import webpack                          from 'webpack';
import cssnano                          from 'cssnano';
import glob                             from 'glob';
import PurifyCSSPlugin                  from 'purifycss-webpack';
import HtmlWebpackPlugin                from 'html-webpack-plugin';
import CleanWebpackPlugin               from 'clean-webpack-plugin';
import UnminifiedWebpackPlugin          from 'unminified-webpack-plugin';
import ExtractTextWebpackPlugin         from 'extract-text-webpack-plugin';
import OptimizeCssAssetsWebpackPlugin   from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackExcludeAssetsPlugin   from 'html-webpack-exclude-assets-plugin';

let config = {
    entry: {
        app: [path.resolve(__dirname, "src", "app.js")],
        style:[path.resolve(__dirname, "src", "scss", "style.scss")]
    },
    
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "public/js/[name].min.js"
    },
    stats: {
       assets: false,
       assetsSort: "field",
       cached: false,
       cachedAssets: false,
       children: false,
       chunks: false,
       chunkModules: false,       
       chunkOrigins: false,
       colors: true,
       depth: false,
       entrypoints: false,
       errors: false,
       errorDetails: false,
       exclude: [],
       hash: false,
       maxModules: 15,
       modules: false,
       modulesSort: "field",
       performance: false,
       providedExports: false,
       publicPath: false,
       reasons: false,
       source: false,
       timings: false,
       usedExports: false,
       version: false,
       warnings: true 
    },
    module: {
        rules: [
            {            
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: 'standard-loader',                
                exclude: /(node_modules|bower_components)/,               
                options: {            
                    error: false,        
                    snazzy: true,            
                    parser: 'babel-eslint',
                    fix: true
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','purifycss-loader','postcss-loader','sass-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                include: /src\/img/,
                loaders: [
                    {
                        loader: 'file-loader',
                            options: {
                                name: '../img/[name].[ext]', 
                                outputPath: "public/img/"                   
                            }                            
                    },
                    'img-loader'
                ]
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot|svg)(\?[\s\S]+)?$/,
                include: [/node_modules\/bootstrap-sass/, /node_modules\/font-awesome/],
                loader: 'file-loader?name=../fonts/[name].[ext]&publicPath=../fonts/&outputPath=public/fonts/',
        }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: []
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new UnminifiedWebpackPlugin(),
        new ExtractTextWebpackPlugin('public/css/style.css'),
        new ExtractTextWebpackPlugin('public/css/style.min.css'),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.min\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            excludeAssets: [/style.*.js/, /style.css/],
            minify: {
               collapseWhitespace: true 
            }
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new PurifyCSSPlugin({
                paths: glob.sync(path.join(__dirname, 'src/views/*.html')),
                minimize: false
            }),
    ]
};

export default config;