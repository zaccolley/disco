% resets
clc; % clear commands
close all; % close figures
clear; % reset variables

inPath = 'resources/';

% 001.jpg - 002.jpg (normal, blue, normal width)

'non-speeding car'
[colour, speed, size] = test(strcat(inPath, '001.jpg'), strcat(inPath, '002.jpg'))

% 001.jpg - 003.jpg (speeding, blue, normal width)

'speeding car'
[colour, speed, size] = test(strcat(inPath, '001.jpg'), strcat(inPath, '003.jpg'))

% fire01 - fire02.jpg (speeding, red, normal width)

'fire engine'
[colour, speed, size] = test(strcat(inPath, 'fire01.jpg'), strcat(inPath, 'fire02.jpg'))

% oversize.jpg (normal, blue, oversized width)

'oversize'
[colour, speed, size] = test(strcat(inPath, 'oversize.jpg'), strcat(inPath, 'oversize.jpg'))