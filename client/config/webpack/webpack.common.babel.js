import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//import LodashModuleReplacementPlugin from ​'lodash-webpack-plugin';
import paths from './paths';
import rules from './rules';

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    entry: paths.entryPath,
    module: {
        rules
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.scss', '.css']
    },
    plugins: [
        
        new LodashModuleReplacementPlugin({
            // Necessary as a workaround for https://github.com/apollographql/react-apollo/issues/1831
            flattening: true,
            //Necessart for the shorthands in the collections specially function as _.filter with object as itratee
            'shorthands': true,
            'collections': true
        }),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    ]
};
