const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream(__dirname + '/out-linux.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log('Zip file created successfully with ' + archive.pointer() + ' total bytes.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory('out/', false);

archive.finalize();
