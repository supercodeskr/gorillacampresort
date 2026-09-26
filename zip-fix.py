import os
import zipfile

def zip_dir_with_posix_paths(dir_path, zip_path):
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(dir_path):
            for file in files:
                file_path = os.path.join(root, file)
                # Ensure posix path (forward slashes) for inside the zip
                arcname = os.path.relpath(file_path, dir_path).replace(os.sep, '/')
                zipf.write(file_path, arcname)

print("Creating out-linux.zip...")
zip_dir_with_posix_paths('out', 'out-linux.zip')
print("Successfully created out-linux.zip!")
