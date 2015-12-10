SELECT
	TimeYear AS 'Year',
	TimeMonthName AS 'Month',
	LocationCityName AS 'City',
	COUNT(*) 'TotalSeizureNotices'
FROM
	SeizureNotice AS SN
	JOIN Claim AS C ON SN.ClaimID = C.ClaimID
	JOIN Time AS T ON SN.TimeID = T.TimeID
	JOIN TimeDay AS TD ON T.TimeDayID = TD.TimeDayID
	JOIN TimeMonth AS TM ON TD.TimeMonthID = TM.TimeMonthID
	JOIN TimeYear AS TY ON TM.TimeYearID = TY.TimeYearID
	JOIN Location AS L ON SN.LocationID = L.LocationID
	JOIN LocationCity AS LC ON L.LocationCityID = LC.LocationCityID
WHERE
	C.ClaimConcequence = 'sold'
GROUP BY
	TY.TimeYear, TM.TimeMonthName, LC.LocationCityName
	WITH ROLLUP
