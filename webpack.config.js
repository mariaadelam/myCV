'use strict' //enable strict mode for better error handling and debugging

// Import required modules
const path = require('path') // Module to handle and transform file paths
let fs = require('fs'); // Module to work with the file system
const autoprefixer = require('autoprefixer') // Adds vendor prefixes to CSS for browser compatibility
const HtmlWebpackPlugin = require('html-webpack-plugin') // Generates an HTML file and injects bundles
const miniCssExtractPlugin = require('mini-css-extract-plugin') // Extracts CSS into separate files
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Copies files or directories to the output directory

// Define paths for source and output directories
const paths = {
  /* Path to source files directory */
  source: path.resolve(__dirname, './src/'),
  /* Path to built files directory */
  output: path.resolve(__dirname, './dist/'),
};

// Define paths for additional resources
const favicon = path.resolve(paths.source, 'images', 'favicon.ico'); // Path to the favicon
const myHeader = fs.readFileSync(paths.source + '/views/header.html'); // Read the header HTML file
const myBanner = fs.readFileSync(paths.source + '/views/banner.html'); // Read the banner HTML file
const myAbout = fs.readFileSync(paths.source + '/views/about.html'); // Read the about section HTML file
const myExp = fs.readFileSync(paths.source + '/views/experience.html'); // Read the experience section HTML file
const myPort = fs.readFileSync(paths.source + '/views/portfolio.html'); // Read the portfolio section HTML file
const myGHA = fs.readFileSync(paths.source + '/views/githubapi.html'); // Read the GitHub API section HTML file
const myContact = fs.readFileSync(paths.source + '/views/contact.html'); // Read the contact section HTML file
const myFooter = fs.readFileSync(paths.source + '/views/footer.html'); // Read the footer HTML file

// Export the Webpack configuration
module.exports = {
  stats: 'errors-only', // Only display errors in the console
  // Uncomment the following for more detailed stats
  // stats: {
  //     errorDetails: true,
  //     children: true
  // },

  mode: 'development', // Set the mode to development for easier debugging
  entry: './src/index.js', // Entry point for the application
  output: {
    filename: 'js/main.bundle.js', // Name of the output JavaScript file
    path: paths.output, // Output directory
    clean: true, // Clean the output directory before generating new files
  },
  plugins: [
    // Plugin to generate an HTML file and inject resources
    new HtmlWebpackPlugin({
      hash: true, // Add a unique hash to resources for cache busting,
      //ensuring that browsers load the latest version of the files
      favicon: favicon, // Add the favicon
      myHeader: myHeader, // Inject the header content
      myBanner: myBanner, // Inject the banner content
      myAbout: myAbout, // Inject the about section content
      myExperience: myExp, // Inject the experience section content
      myPortfolio: myPort, // Inject the portfolio section content
      myGitHubApi: myGHA, // Inject the GitHub API section content
      myContact: myContact, // Inject the contact section content
      myFooter: myFooter, // Inject the footer content
      template: './src/index.html', // Path to the base HTML template
      filename: 'index.html', // Name of the generated HTML file
      inject: 'body' // Inject scripts into the body tag
    }),
    // Plugin to extract CSS into a separate file
    new miniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    // Plugin to copy files and directories to the output directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, 'images'), // Source directory for images
          to: path.resolve(paths.output, 'images'), // Destination directory for images
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'], // Ignore unnecessary files
          },
        },
        {
          from: path.resolve(paths.source, 'lang'), // Source directory for language files
          to: path.resolve(paths.output, 'lang'), // Destination directory for language files
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'], // Ignore unnecessary files
          },
        },
        // Uncomment the following block to copy video files
        // {
        //     from: path.resolve(paths.source, 'videos'),
        //     to: path.resolve(paths.output, 'videos'),
        //     toType: 'dir',
        //     globOptions: {
        //         ignore: ['*.DS_Store', 'Thumbs.db'],
        //     },
        // },
      ],
    }),
  ],
  module: {
    rules: [
      {
        // Rule for processing SVG files
        mimetype: 'image/svg+xml',
        scheme: 'data',
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash].svg' // Output file naming pattern for SVGs
        }
      },
      {
        // Rule for processing font files
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i, 
        //regular expression used to match font file extensions
        //The i flag makes the regex case-insensitive
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]' // Output file naming pattern for fonts
        }
      },
      {
        // Rule for processing SCSS files
        test: /\.(scss)$/,
        use: [
          {
            // Extracts CSS into separate files
            loader: miniCssExtractPlugin.loader
          },
          {
            // Resolves `@import` and `url()` in CSS
            loader: 'css-loader'
          },
          {
            // Processes CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer // Adds vendor prefixes for browser compatibility
                ]
              },
            }
          },
          {
            // Compiles SASS/SCSS to CSS
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: "compressed", // Minifies the CSS output
                charset: false, // Removes the @charset declaration
                quietDeps: true, // Suppresses warnings from dependencies
              }
            }
          }
        ]
      },
      {
        // Rule for processing JSON files
        test: /\.json$/,
        type: 'json' // Treat JSON files as JSON modules
      },
      {
        // Rule for processing image files (JPEG, PNG, WebP)
        test: /\.(jpe?g|png|webp)$/,
        type: 'asset/resource', // Emits a separate file and exports the URL
        generator: {
          filename: './images/[name].[hash:6][ext]', // Output file naming pattern with a 6-character hash
        },
      },
      {
        // Rule for processing JavaScript and TypeScript files
        test: /\.(js|ts)$/,
        loader: 'babel-loader', // Transpiles modern JavaScript/TypeScript to older versions
        exclude: '/node_modules/' // Exclude files in the node_modules directory
      },
    ]
  },
  performance: {
    hints: false, // Disable performance hints
    maxAssetSize: 100000, // Maximum asset size in bytes
  }
}