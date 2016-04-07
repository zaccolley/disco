
function [boundingBox, distance] = process(filename)
    image = imread(filename);

    % get the height and width for later on
    [imageHeight, imageWidth, imageDim] = size(image);

    originalImage = image;

    % convert to hsv
    image = rgb2hsv(image);
    image = image(:, :, 1); % hue lets us find the cars

    % make guassian (blur) filter 
    guassianSigma = 3;
    guassianHsize = [10 10];
    blurFilter = fspecial('gaussian', guassianHsize, guassianSigma);
    image = imfilter(image, blurFilter); % apply filter

    % convert to bw
    image = im2bw(image, 0.3);
    
    regionsInfo = bwconncomp(image, 4); % 4 connected components
    regionsAmount = regionsInfo.NumObjects;
    
    % if there is only one region we dont need to remove smaller regions
    
    if (regionsAmount > 1)
        % get rid of small regions
        image = imerode(image, strel('square', 10));  % erode
        image = imdilate(image, strel('square', 50)); % dilate
    end

    [L, ~] = bwlabel(image, 4); % detect circles

    % calculate parameters from L
    stats = regionprops(L, 'ConvexArea', 'BoundingBox', 'Centroid');
    boundingBox = stats.BoundingBox;
    centroid = stats.Centroid;

%{
    % display the areas

    [L, num] = bwlabel(image, 4); % detect circles
    rgb = label2rgb(L);           % convert the label matrix L to RGB image 
    figure, imshow(rgb), hold on  % "hold on" tells Matlab to keep the object active as
    
    stats.ConvexArea              % show the shape
%}

    carX = boundingBox(1);
    carY = boundingBox(2);
    
    width = boundingBox(3);
    height = boundingBox(4);
    
    carMiddleX = centroid(:, 1);
    carMiddleY = centroid(:, 2);

    distance = imageHeight - carMiddleY;
end
