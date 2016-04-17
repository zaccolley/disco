% resets
clc;       % clear commands
close all; % close figures
clear;     % reset variables

inPath = 'resources/';

disp(sprintf('          ___________\n  ~  ~~~ // --|||-- \\\\   \n ~~~~ __//____|||____\\\\____   \n   ~  | _|    " | "   --_  || \n  ~~~ |/ \\______|______/ \\_|| \n ______\\_/_____________\\_/_______     =~+ ZAC`S MAD af GRAPHICS PROGRAMME +~='))

disp('┌──────────────────┬──────────┬────────────────────────────┬─────────────────────┐')
disp('│ Name             │ Red?     │ Speed              (mp/h)  │ Size          (m)   │')
disp('├──────────────────┼──────────┼────────────────────────────┼─────────────────────┤')

% 001.jpg - 002.jpg (normal, blue, normal width)

name = 'Non-speeding car'; 
[red, speedResult, speed, width, size] = calc(strcat(inPath, '001.jpg'), strcat(inPath, '002.jpg'));
fprintf('│ %16s │ %8s │ %16s (%6.2f) │ %12s (%4.2f) │\n', name, red, speedResult, speed, size, width)

% 001.jpg - 003.jpg (speeding, blue, normal width)

name = 'Speeding car';
[red, speedResult, speed, width, size] = calc(strcat(inPath, '001.jpg'), strcat(inPath, '003.jpg'));
fprintf('│ %16s │ %8s │ %16s (%6.2f) │ %12s (%4.2f) │\n', name, red, speedResult, speed, size, width)

% fire01 - fire02.jpg (speeding, red, normal width)

name = 'Fire engine';
[red, speedResult, speed, width, size] = calc(strcat(inPath, 'fire01.jpg'), strcat(inPath, 'fire02.jpg'));
fprintf('│ %16s │ %8s │ %16s (%6.2f) │ %12s (%4.2f) │\n', name, red, speedResult, speed, size, width)

% oversize.jpg (normal, blue, oversized width)

name = 'Oversized car';
[red, speedResult, speed, width, size] = calc(strcat(inPath, 'oversize.jpg'), strcat(inPath, 'oversize.jpg'));
fprintf('│ %16s │ %8s │ %16s (%6.2f) │ %12s (%4.2f) │\n', name, red, speedResult, speed, size, width)
          

disp('└──────────────────┴──────────┴────────────────────────────┴─────────────────────┘')
disp('   :¬)                                   Special thanks to my boy Dr. Tan x0x0x   ')

% ... yes lads