// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
    'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
    'http://ivaynberg.github.com/select2/select2-3.2/select2.js',
  'app/components/angular/angular.js',
  'app/components/angular-mocks/angular-mocks.js',
  'app/components/angular-ui/build/angular-ui.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'test/mock/**/*.js',
  'test/spec/**/*.js'
];

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress','coverage'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

coverageReporter = {
    type : 'text',
    dir : 'coverage/',
    file : 'coverage.txt'
}


// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 50000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
