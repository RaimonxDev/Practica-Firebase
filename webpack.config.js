const HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    postcss = require('postcss-loader')

module.exports = {

    entry: {
        js: './src/index.js'
      },
      output: {
        filename: '[name].[chunkhash].js'
    },
    //source map es para mapear los errores simpre necesario 
    devtool: 'source-map',

    module: {
        //rules para loader 
        rules: [
            //babel
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            //html
            {
                test: /\.tpl.html$/,
                use:'es6-template-string'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }

            },
            // css sass
            {
                test: /\.(css|scss)$/,
                exclude: '/node-modules',
                use: [
                    'style-loader',// permite crear cadenas de texto a node
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'resolve-url-loader',//para resolver el tema de las rutas
                    'sass-loader?outputStyle=compressed&sourceMap',
                ]
            },
            //Webpack reconozca imagenes jpg
            {
                // "i" para dectectar letras tanto mayusculas y minisculas
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    'file-loader?name=assets/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          bypassOnDebug: true, // webpack@1.x
                          disable: true, // webpack@2.x and newer
                        },
                      }
                  ],
            },
            {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]'  
            }
        ]
    },
    plugins: [
        //limpiar carpeta dist cada vez que ejecutemos build
        // parametros para borrar todo lo antetior
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*']}),
        new MiniCssExtractPlugin({
            //opciones para que el css tenga el mismo nombre y hash del archivo css
            filename: '[name].[chunkhash].css',
            chunkFilename: '[id].css'
        }), //primero es css y luego html
        new HtmlWebpackPlugin({
            //entrada
            template: './src/template.html',
            //salida
            filename: './index.html',
            //chunks hace referencia a los valores de entrada
            chunks: ['js']
        })

    ]



}