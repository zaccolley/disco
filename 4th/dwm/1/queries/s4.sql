SELECT
	TimeYear AS 'Year',
	TimeMonthName AS 'Month',
	LocationCityName AS 'City',
	COUNT(*) AS 'TotalSeizureNotices'
FROM
	SeizureNotice AS SN
    JOIN Owner AS O ON SN.OwnerID = O.OwnerID
	JOIN Time AS T ON SN.TimeID = T.TimeID
	JOIN TimeDay AS TD ON T.TimeDayID = TD.TimeDayID
	JOIN TimeMonth AS TM ON TD.TimeMonthID = TM.TimeMonthID
	JOIN TimeYear AS TY ON TM.TimeYearID = TY.TimeYearID
	JOIN Location AS L ON SN.LocationID = L.LocationID
	JOIN LocationCity AS LC ON L.LocationCityID = LC.LocationCityID
WHERE
	O.OwnerWasteCarrier = true
GROUP BY
  	TY.TimeYear, TM.TimeMonthName, TD.TimeDay, LC.LocationCityName
	WITH ROLLUP
