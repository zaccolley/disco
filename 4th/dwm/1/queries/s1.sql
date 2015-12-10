USE dwm1;
SELECT
	TimeYear AS 'Year',
	TimeMonthName AS 'Month',
	TimeDay AS 'Day',
	LocationCityName AS 'City',
	COUNT(*) AS 'TotalSeizureNotices'
FROM
	  SeizureNotice AS SN
	  JOIN Claim AS C ON SN.ClaimID = C.ClaimID
	  JOIN Time AS T ON SN.TimeID = T.TimeID
	  JOIN TimeDay AS TD ON T.TimeDayID = TD.TimeDayID
	  JOIN TimeMonth AS TM ON TD.TimeMonthID = TM.TimeMonthID
	  JOIN TimeYear AS TY ON TM.TimeYearID = TY.TimeYearID
	  JOIN Location AS L ON SN.LocationID = L.LocationID
	  JOIN LocationCity AS LC ON L.LocationCityID = LC.LocationCityID
GROUP BY
  	TY.TimeYear, TM.TimeMonthName, TD.TimeDay, LC.LocationCityName
	WITH ROLLUP
