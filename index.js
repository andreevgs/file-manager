import {homedir} from 'os';
import {readdir, lstat} from "fs/promises";

let currentWorkingDirectory = homedir();

process.stdin.on('data', async chunk => {
    let command = chunk.toString().replace('\n', '');

    if(command === 'ls'){
        const content = await readdir(currentWorkingDirectory);
        const directories = [];
        const files = [];
        for (const element of content) {
            const isFile = (await lstat(`${currentWorkingDirectory}/${element}`)).isFile();
            if(isFile){
                files.push({Name: element, Type: 'file'});
            }
            else {
                directories.push({Name: element, Type: 'directory'});
            }
        }
        directories.sort((a, b) => {
            return a.Name - b.Name;
        });
        files.sort((a, b) => {
            return a.Name - b.Name;
        });
        const table = directories.concat(files);
        console.table(table);
    }
    process.stdout.write(`You are currently in ${currentWorkingDirectory}\n`);
});