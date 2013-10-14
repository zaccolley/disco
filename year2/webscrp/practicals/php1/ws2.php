<html>
    
<head><title>String flipped</title></head>

<body bgcolor="#ffdd99">

<font face=Arial size=3 color="#880088">

<h2>A string flipped</h2>

<?php
   $GLOBALS = $GLOBALS+$_REQUEST;
   echo "<p>The string you typed was $flip.\n";
   //
   // First, we'll determine the length of
   // $flip, outputting the characters as
   // we go.
   //
   $i = 0;
   while (isset($flip{$i}))
     { $c = $flip{$i};
       echo "<br>Character $i is '$c'.\n";
       $i++; }
   echo "\n<p>There are $i characters.<p>\n\n";
   //
   // Now We'll do do the inversion - for fun,
   // we'll use $i to loop down to zero, rather
   // than another counter to loop up to $i.
   //
   $flipped = "";
   for ($i--;$i>=0;$i--)
     { $flipped .= $flip{$i};
       echo "<br>Appended from position $i ";
       echo "to get '$flipped'.\n";
     }
   echo "\n<p>The reverse of '$flip' is '$flipped'.\n";
   ?>

</body>
</html>