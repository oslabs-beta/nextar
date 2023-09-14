const path = require('path')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    mode : 'production',

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: path.resolve(__dirname, 'node-modules') ,
                use: [
                    {loader : 'babel-loader',
                    options: {
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /.(css|scss)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader']
            },
        ]
    }
}