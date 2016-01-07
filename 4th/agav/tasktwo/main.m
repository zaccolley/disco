% resets
clc; % clear commands
close all; % close figures
clear; % reset variables

inPath = 'resources/';

for files = {'001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg', ...
             '006.jpg', '007.jpg', '008.jpg', '009.jpg', '010.jpg', ...
             '011.jpg', 'fire01.jpg', 'fire02.jpg', 'oversize.jpg' };
    process(strcat(inPath, files{1}));
end