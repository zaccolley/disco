<?php

function createAbbr($abbr, $full){ return "<abbr title='" . $full . "\'>" . $abbr . "</abbr>"; }

function createLink($url, $text, $title){ return "<a href='" . $url . "' title='" . $title . "'>" . $text . "</a>"; }

function createImage($url, $alt, $align){	return "<div class='image' id='" . $align . "'><a href='" . $url . "'><img src='" . $url . "' alt='" . $alt . "'></a></div>"; }

function createCode($text){	return "<code>" . $text . "</code>"; }

function createBlockQuote($url, $source, $quote){ return "<blockquote cite='" . $url . "' title='" . $source . "'><dfn>" . $quote . "</dfn> - " . $source . "</blockquote>"; }

?>
