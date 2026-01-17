CREATE OR ALTER PROCEDURE [dbo].[ActualSalary] 
(
    @companyId INT = 7,
    @employeeId INT = NULL,
    @locationId INT = NULL,
    @departmentId INT = NULL,
    @positionId INT = NULL,
    @userId INT = NULL
) 
AS 
BEGIN 
    SELECT epi.EmployeeId,
        CONCAT(e.Code, ' - ', e.LocalName) AS EmployeeFullName,
        e.Code EmployeeCode,
        e.LocalName,
        e.ForeignName,
        epi.PayItemId,
        p.Code PayItemCode,
        p.LocalName PayItemLocalName,
        p.ForeignName PayItemForeignName,
        epi.Value
    FROM EmployeePayItems epi
    JOIN PayItems p ON epi.PayItemId = p.Id
    JOIN Employees e ON epi.EmployeeId = e.Id
    LEFT JOIN Users u ON u.Id = @userId
    LEFT OUTER JOIN Departments d ON e.DepartmentId = d.Id 
    LEFT OUTER JOIN Locations l ON e.LocationId = l.Id 
    LEFT OUTER JOIN Positions post ON e.PositionId = post.Id 
    WHERE 
        e.CompanyId = @companyId AND 
        (@employeeId IS NULL OR e.Id = @employeeId) AND
        (@departmentId IS NULL OR d.Id = @departmentId) AND 
        (@locationId IS NULL OR l.Id = @locationId) AND
        (@positionId IS NULL OR post.Id = @positionId) AND
        epi.PayItemId NOT IN (
            1,5,6,8,10,13,14,15,17,18,19,20,21,22,23,24,
            25,26,27,28,29,30,32,33,34,35,36,37,38,39,40,
            41,42,43,44,45,46,47,48
        ) AND
        (
            ISNULL(e.IsSalaryConfidential, 0) = 0
            OR ISNULL(u.CanViewConfidentialEmployeesSalaryDetails, 0) = 1
        );
END;
