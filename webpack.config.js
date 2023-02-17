const path = require("path");
module.exports = {
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "auto",
        filename: "index.js",
        chunkFilename: "[id].js"
    },
    resolve: {
        alias: {"@public": path.resolve(__dirname, "public")},
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    devServer: {
        static: "./dist/",
        historyApiFallback: true,
        compress: true, open: true, port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: "ts-loader"
            },
            {
                test: /\.(css)$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|svg|jpg|jpeg|webp|avif)$/i,
                type: "asset/resource"
            }
        ]
    }
};


