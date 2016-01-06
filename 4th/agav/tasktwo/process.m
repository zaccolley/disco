
% resets
clc; % clear commands
close all; % close figures
clear; % reset variables

% some variables to use througout

inPath = 'resources/';

% read in image

file = strcat(inPath, '002.jpg');
originalImage = imread(file);
image = originalImage;

% get the height and width for later on
[imageHeight, imageWidth, imageDim] = size(image);

% crop to the middle
cropAmount = 140;
image = imcrop(image, [cropAmount 0 (imageWidth - (cropAmount * 2)) imageHeight]);

% convert to grey
image = rgb2gray(image);

% make guassian (blur) filter 
guassianSigma = 3;
guassianHsize = [5 5];
blurFilter = fspecial('gaussian', guassianHsize, guassianSigma);
image = imfilter(image, blurFilter, 'same'); % apply filter

% remove noise
image = wiener2(image, [12 12]);

% get binary
image = im2bw(image, graythresh(image));

% find edges
image = edge(image, 'canny');

% show image
imshow(image);
