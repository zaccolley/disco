
function process(filename)
image = imread(filename);

% get the height and width for later on
[imageHeight, imageWidth, imageDim] = size(image);

% crop to the middle
cropAmount = 140;
image = imcrop(image, [cropAmount 0 (imageWidth - (cropAmount * 2)) imageHeight]);

originalImage = image;

% convert to hsv
image = rgb2hsv(image);

saturationChannel = image(:, :, 2); % saturation lets us find shadows

image = bwareaopen(saturationChannel, 100); % remove smaller pixels
image = image .* saturationChannel;

% make guassian (blur) filter 
guassianSigma = 4;
guassianHsize = [6 6];
blurFilter = fspecial('gaussian', guassianHsize, guassianSigma);
image = imfilter(image, blurFilter, 'same'); % apply filter

% remove noise
image = wiener2(image, [4 4]);

% find edges
image = edge(image, 'canny', graythresh(image));

% grow edges
structuringElement = strel('square', 3);
image = imdilate(image, structuringElement);
image = imerode(image, structuringElement);

% find the lines

[houghTransformMatrix, theta, rho] = hough(image);

houghPeaks = houghpeaks(houghTransformMatrix, 20, 'threshold', ceil(0.3 * max(houghTransformMatrix(:))) );

lines = houghlines(image, theta, rho, houghPeaks, 'FillGap', 20, 'MinLength', 20);

figure, imshow(originalImage), hold on

top = [[0, imageHeight], [0, 0]];
bottom = [[0, 0], [0, 0]];
right = [[0, 0], [0, 0]];
left = [[imageWidth, 0], [0, 0]];

for k = 1:length(lines)
   xy = [lines(k).point1; lines(k).point2];

   angle = abs(radtodeg( atan2(xy(1,1) - xy(2,1), xy(1,2) - xy(2,2)) ));
   
   angleThreshold = 10;
   
   if angle > 90 - angleThreshold && angle < 90 + angleThreshold % horizontal
       if xy(1,2) < top(1,2) % if point if higher on y axis
          top = xy;
       end
       
       if xy(1,2) > bottom(1,2) % if point if lower on y axis
          bottom = xy;
       end
   elseif angle > 180 - angleThreshold && angle < 180 + angleThreshold % vertical       
       if xy(1,1) < left(1,1) % if point if lower on x axis
          left = xy;
       end
       
       if xy(1,1) > right(1,1) % if point if higher on x axis
          right = xy;
       end
   end
   
end

plot(top(:,1), top(:,2), 'LineWidth', 1, 'Color', 'red');
plot(bottom(:,1), bottom(:,2), 'LineWidth', 1, 'Color', 'green');
plot(left(:,1), left(:,2), 'LineWidth', 1, 'Color', 'yellow');
plot(right(:,1), right(:,2), 'LineWidth', 1, 'Color', 'blue');

carHeight = bottom(1,2) - top(1,2);
carWidth = abs(right(1,1) - left(1,1));
end
