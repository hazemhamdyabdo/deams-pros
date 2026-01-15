-- Compare voucher lines across two databases (SQL Server).
-- Assumptions:
-- 1) Voucher IDs are the same in both databases.
-- 2) Voucher date column is on the vouchers table.
-- 3) Use the same line columns in both CTEs and exclude identity/audit columns.
--
-- Replace:
-- - DB1 / DB2 with your database names
-- - VoucherDate and column list with your real column names
-- - @from / @to if needed

DECLARE @from date = '2022-01-01';
DECLARE @to date = '2025-12-18';

WITH db1_lines AS (
  SELECT
    l.VoucherId,
    l.LineNo,
    l.AccountId,
    l.Debit,
    l.Credit,
    l.Description
  FROM DB1.dbo.voucherLines l
  INNER JOIN DB1.dbo.vouchers v ON v.Id = l.VoucherId
  WHERE v.VoucherDate >= @from AND v.VoucherDate <= @to
),
db2_lines AS (
  SELECT
    l.VoucherId,
    l.LineNo,
    l.AccountId,
    l.Debit,
    l.Credit,
    l.Description
  FROM DB2.dbo.voucherLines l
  INNER JOIN DB2.dbo.vouchers v ON v.Id = l.VoucherId
  WHERE v.VoucherDate >= @from AND v.VoucherDate <= @to
),
diff AS (
  SELECT * FROM db1_lines
  EXCEPT
  SELECT * FROM db2_lines
  UNION ALL
  SELECT * FROM db2_lines
  EXCEPT
  SELECT * FROM db1_lines
)
SELECT DISTINCT VoucherId
FROM diff
ORDER BY VoucherId;

-- Optional: show line-level differences
-- SELECT * FROM diff ORDER BY VoucherId, LineNo;
